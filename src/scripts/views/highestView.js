import "./components/_cardItem";

class HighestAnime {
  _data;
  _parentElement = document.querySelector("#highestList");

  render(data, handler) {
    this._data = data;
    this._data.forEach((item) => {
      const cardItemElement = document.createElement("card-item");
      cardItemElement.data = item;
      cardItemElement.clickHandler = handler;
      this._parentElement.appendChild(cardItemElement);
    });
  }
}

export default new HighestAnime();
