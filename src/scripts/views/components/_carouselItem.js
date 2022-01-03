class CarouselItem extends HTMLElement {
  _index;
  _data;
  _clickHandler;

  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  set clickHandler(handler) {
    this._clickHandler = handler;
  }

  set data(data) {
    [this._data, this._index] = data;
    this.render();
  }

  connectedCallback() {
    this.shadowDOM.addEventListener("click", this._clickHandler);
  }

  render() {
    this.shadowDOM.innerHTML = `
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

      <style>

        h1 {
          font-size: 3rem !important;
          font-weight: 700 !important;
        }

        h4 {
          font-size: 1rem !important;
          font-weight: 500 !important;
        }

        .open-modal {
          cursor: pointer;
          transition: 0.3s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .open-modal:hover {
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        }

        .carousel {
          border-radius: 10px;
          overflow: hidden;
        }

        .carousel-item {
          position: relative;
        }

        .carousel-item-details {
          position: absolute;
          bottom: 0;
          width: 100%;
          padding-left: 5rem;
          padding-bottom: 3rem;
          padding-top: 5rem;
          background: linear-gradient(
            00deg,
            rgba(0, 0, 0, 1) 10%,
            rgba(0, 0, 0, 0.7) 60%,
            rgba(0, 0, 0, 0) 100%
          );
          color: #ffffff;
          text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        .carousel-item-details p {
          font-weight: 300;
        }

        .carousel-item-details span {
          margin-left: 0.2rem;
          margin-right: 0.2rem;
        }

        .carousel-item-details .metric {
          margin-top: 0.5rem;
        }

        .carousel-item-details .metric,
        .carousel-item-details .metric .score,
        .carousel-item-details .metric .popularity {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        .carousel-item-details .metric .score {
          margin-right: 2rem;
        }

        .carousel-item-details .metric svg {
          margin-right: 1rem;
          width: 1.5rem;
        }

        .carousel-item-details .metric span {
          font-size: 1.2rem;
        }

        img {
          height: 35rem;
          object-fit: cover;
          object-position: center;
        }

        @media only screen and (max-width: 991px) {
          .carousel-item-details {
            padding-left: 2rem;
          }
        }

      </style>

      <div class="open-modal" data-id="${this._data.id}">
            <div class="carousel-item-details">
            <h4>${this._data.attributes.showType} <span>•</span> ${
      this._data.attributes.status
    }</h4>
            <h1>${this._data.attributes.canonicalTitle}</h1>
            <div class="metric">
                <div class="score">
                <svg viewBox="0 0 576 512"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" fill="white"/></svg>
                    <span class="score-value">${Math.round(
                      this._data.attributes.averageRating
                    )}%</span>
                </div>
                <div class="popularity">
                <svg viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM160 368c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16V240c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v128zm96 0c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16V144c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v224zm96 0c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-64c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v64z"  fill="white"/></svg>
                    <span class="score-value">${
                      this._data.attributes.popularityRank
                    }</span>
                </div>
            </div>

        </div>
        <img src="${
          this._data.attributes.coverImage.original
        }"class="d-block w-100" alt="...">
      </div>
      `;
  }
}

customElements.define("carousel-item", CarouselItem);
