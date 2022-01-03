import "./components/_cardItem";

class SearchView {
  _data;
  _adjacentElement = document.querySelector(".anime-content");
  _parentElement = document.querySelector(".search-result-list");

  render(data, handler) {
    this._data = data;
    this._parentElement.classList.remove("hidden");
    this._adjacentElement.classList.add("hidden");
    this._clearContent();
    if (data.length < 1) {
      this._renderError();
    } else {
      this._data.forEach((item) => {
        const cardItemElement = document.createElement("card-item");
        cardItemElement.data = item;
        cardItemElement.clickHandler = handler;
        this._parentElement.insertAdjacentElement("beforeend", cardItemElement);
      });
    }
  }

  _clearContent() {
    this._parentElement.innerHTML = "";
    this._adjacentElement.innerHTML = "";
  }

  renderSpinner() {
    this._parentElement.innerHTML = `
        <div class="spinner d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;
  }

  _renderError() {
    const message = "Result not found!";
    const markup = `
      <p>${message}</p>
      `;
    this._parentElement.innerHTML = markup;
  }
}

export default new SearchView();
