import * as model from "./model";
import carouselView from "./views/carouselView";
import popularView from "./views/popularView";
import highestView from "./views/highestView";
import detailsView from "./views/detailsView";
import searchView from "./views/searchView";

const modal = document.querySelector(".modal-box");
const bg = document.querySelector(".bg");
const overlay = document.querySelector(".overlay");
const navbar = document.querySelector(".navbar");

let searchQuery;
let searching;

const displayCarousel = async () => {
  try {
    await model.getTrendingAnime();
    carouselView.render(model.state.trendingAnime, displayDetails);
  } catch (err) {
    console.log(err);
  }
};

const displayPopularList = async () => {
  try {
    await model.getPopularAnime();
    popularView.render(model.state.popularAnime, displayDetails);
  } catch (err) {
    console.log(err);
  }
};

const displayHighestList = async () => {
  try {
    await model.getHighestAnime();
    highestView.render(model.state.highestAnime, displayDetails);
  } catch (err) {
    console.log(err);
  }
};

const controlSearch = async () => {
  try {
    const searchInput = document.querySelector("#searchInput");
    const search = document.querySelector("#search");

    ["input", "focus"].forEach((ev) =>
      searchInput.addEventListener(ev, (e) => {
        searchQuery = e.target.value;
        clearTimeout(searching);

        searching = setTimeout(async () => {
          if (!searchQuery) {
            closeModal();
            return;
          }
          openModal();
          searchView.renderSpinner();
          await model.searchAnime(searchQuery);
          searchView.render(model.state.searchResults, displayDetails);
        }, 500);
      })
    );

    search.addEventListener("submit", (e) => e.preventDefault());
  } catch (err) {
    console.log(err);
  }
};

const displayDetails = async (e) => {
  try {
    const clicked = e.target.closest(".open-modal");

    if (clicked) {
      openModal();
      detailsView.renderSpinner();
      await model.getAnimeDetails(clicked.dataset.id);
      detailsView.render(model.state.detailAnime);
    }
  } catch (err) {
    console.log(err);
  }
};

const openModal = () => {
  const modalContent = document.querySelector(".anime-content");
  const modalSearch = document.querySelector(".search-result-list");

  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => {
    document.querySelector("body").style.overflow = "hidden";
  }, 500);

  [modalContent, modalSearch].forEach((el) => {
    el.innerHTML = ""; // eslint-disable-line no-param-reassign
  });

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = () => {
  document.querySelector("body").style.overflow = "scroll";
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const main = () => {
  [overlay, navbar, bg].forEach((item) =>
    item.addEventListener("click", closeModal)
  );

  controlSearch();
  displayCarousel();
  displayPopularList();
  displayHighestList();
};

export default main;
