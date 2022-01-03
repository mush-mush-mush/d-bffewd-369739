class CardItem extends HTMLElement {
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
    this._data = data;
    this.render();
  }

  connectedCallback() {
    this.shadowDOM.addEventListener("click", this._clickHandler);
  }

  render() {
    this.shadowDOM.innerHTML = `
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <style>

      .open-modal {
        cursor: pointer;
        transition: 0.3s cubic-bezier(0.19, 1, 0.22, 1);
      }
      
      .open-modal:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
      }
        
      .list-item {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
      }

      .list-item h2 {
        font-weight: 700;
        color: #818181;
        margin-right: 1.5rem;
      }

      .card img {
        width: 100%;
        height: 100%;
        max-width: 5rem;
        object-position: center;
        object-fit: cover;
      }

      .card-body {
        height: 100%;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
      }

      .card-body h5 {
        font-weight: 700;
      }

      .card h2 {
        font-size: 1.3rem;
      }

      @media only screen and (max-width: 991px) {
        .list-item h2 {
          font-weight: 700;
          color: #818181;
          font-size: 1.5rem;
          margin-right: 1rem;
        }
      }

    </style>

    <div class="list-item open-modal" data-id="${this._data.id}">
        <div class="card w-100">
            <div class="row g-0">
                <div class="col-2">
                    <img src="${
                      this._data.attributes.posterImage.small
                    }" class="rounded-start" alt="...">
                </div>
                <div class="col-8">
                    <div class="card-body">
                        <h5 class="card-title">
                          ${this._data.attributes.canonicalTitle.slice(0, 28)}
                          ${
                            this._data.attributes.canonicalTitle.length > 28
                              ? "..."
                              : ""
                          }
                        </h5>
                        <p class="card-text">${
                          this._data.attributes.showType
                        } <span>•</span> ${this._data.attributes.status}
                        </p>
                    </div>
                </div>
                <div class="col-2 d-flex align-items-center">
                    <h2>${Math.round(this._data.attributes.averageRating)}%</h2>
                </div>
            </div>
        </div>
    </div>
    `;
  }
}

customElements.define("card-item", CardItem);
