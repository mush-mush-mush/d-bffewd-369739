import "regenerator-runtime";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "./styles/main.css";
import "./favicon.png";
import main from "./scripts/controller";

window.addEventListener("load", () => {
  const loading = document.querySelector(".loading");

  setTimeout(() => {
    loading.style.opacity = 0;
    setTimeout(() => {
      loading.remove();
    }, 500);
  }, 1000);
});

document.addEventListener("DOMContentLoaded", main);
