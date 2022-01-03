class DetailsView {
  _data;
  _parentElement = document.querySelector(".anime-content");
  _adjacentElement = document.querySelector(".search-result-list");

  render(data) {
    this._data = data;
    this._clearContent();
    this._parentElement.classList.remove("hidden");
    this._adjacentElement.classList.add("hidden");
    this._parentElement.innerHTML = this._generateMarkup();
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

  _generateMarkup() {
    return `
      <div class="banner">
      ${
        !this._data.coverImage
          ? `
          <div class="d-block w-100 banner-img"></div>
          `
          : `<img src="${this._data.coverImage}"
          class="d-block w-100 banner-img" alt="...">`
      }
          
      </div>

      <div class="row p-4 text-center text-md-start">
          <div class="col-lg-2">
              <img src="${this._data.posterImage}" class="poster"
                  alt="...">
          </div>
          <div class="col-lg-7 ps-md-4 mt-4 mt-md-0">
              <h4>${this._data.showType} <span>•</span> ${
      this._data.status
    }</h4>
              <h1>${this._data.title}</h1>
              <p>${this._data.genres[0]} <span>•</span> ${
      this._data.genres[1]
    } <span>•</span> ${this._data.genres[2]}</p>
              ${
                this._data.videoID
                  ? `
              <a class="btn" href="https://www.youtube.com/watch?v=${this._data.videoID}"><svg viewBox="0 0 448 512"><path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" fill="black"/></svg> Watch Trailer</a>`
                  : ""
              }
              
          </div>
          <div class="col-lg-3 mt-5 mt-md-0 text-md-end">
              <div class="row">
                  <div class="col-6 col-md-12 mb-md-3 ">
                      <h4>Rating</h4>
                      <div class="score ms-md-auto mx-auto d-flex justify-content-center justify-content-md-end align-items-center">
                      <svg viewBox="0 0 576 512"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" fill="black"/></svg>
                          <span class="score-value">${Math.round(
                            this._data.rating
                          )}%</span>
                      </div>
                  </div>
                  <div class="col-6 col-md-12">
                      <h4>Popularity</h4>
                      <div class="popularity ms-md-auto mx-auto d-flex justify-content-center justify-content-md-end align-items-center">
                      <svg viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM160 368c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16V240c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v128zm96 0c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16V144c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v224zm96 0c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-64c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v64z"  fill="black"/></svg>
                          <span class="score-value">${
                            this._data.popularity
                          }</span>
                      </div>
                  </div>
              </div>

          </div>
      </div>

      <div class="p-4">
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="pill-synopsis-tab" data-bs-toggle="pill"
                      data-bs-target="#pill-synopsis" type="button" role="tab"
                      aria-controls="pill-synopsis" aria-selected="true">Synopsis</button>
              </li>
              <li class="nav-item" role="presentation">
                  <button class="nav-link" id="pills-details-tab" data-bs-toggle="pill"
                      data-bs-target="#pills-details" type="button" role="tab"
                      aria-controls="pills-details" aria-selected="false">Details</button>
              </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
              <div class="tab-pane fade show active" id="pill-synopsis" role="tabpanel"
                  aria-labelledby="pill-synopsis-tab">${
                    this._data.synopsis
                  }</div>
              <div class="tab-pane fade" id="pills-details" role="tabpanel"
                  aria-labelledby="pills-details-tab">
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item"><strong class="me-2">Start Date</strong> ${
                        this._data.startDate
                      }
                      </li>
                      <li class="list-group-item"><strong class="me-2">End Date</strong> ${
                        this._data.endDate
                      }</li>
                      <li class="list-group-item"><strong class="me-2">Next Release</strong> ${
                        this._data.nextRelease
                      }
                      </li>
                      <li class="list-group-item"><strong class="me-2">Eps Length</strong> ${
                        this._data.episodeLength
                      }</li>
                      <li class="list-group-item"><strong class="me-2">Total Eps</strong> ${Math.round(
                        this._data.totalEps
                      )}</li>
                      <li class="list-group-item"><strong class="me-2">Age Rating</strong> ${
                        this._data.ageRating
                      } • ${this._data.ageRatingGuide}</li>
                  </ul>
              </div>

          </div>
      </div>
      `;
  }
}

export default new DetailsView();
