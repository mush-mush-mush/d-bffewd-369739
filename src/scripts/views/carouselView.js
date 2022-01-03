import "./components/_carouselItem";

class CarouselView {
  _data;
  _parenElement = document.querySelector("#carouselInner");

  render(data, handler) {
    this._data = data;
    this._data.map((item, id) => this._generateItem(item, id, handler));
  }

  _generateItem(item, id, handler) {
    const classlist = ["carousel-item", "w-100"];
    const carouselItem = document.createElement("carousel-item");

    carouselItem.data = [item, id];
    carouselItem.clickHandler = handler;

    carouselItem.classList.add(...classlist);
    if (id === 0) carouselItem.classList.add("active");

    carouselItem.setAttribute("data-bs-interval", "3000");

    this._parenElement.insertAdjacentElement("beforeend", carouselItem);
  }
}

export default new CarouselView();
