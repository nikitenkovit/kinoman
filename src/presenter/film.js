import FilmCardView from "../view/filmCard";
import FilmDetailsPopap from "../view/filmDetailsPopap";
import {render, RenderPosition, remove, replace} from "../utils/render";

const body = document.querySelector(`body`);

const Mode = {
  DEFAULT: `DEFAULT`,
  OPEN: `OPEN`
};

export default class Film {
  constructor(container, changeData, changeMode) {
    this._mainContainer = container;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmComponent = null;
    this._filmPopapComponent = null;
    this._mode = Mode.DEFAULT;

    this._showPopapClickHandler = this._showPopapClickHandler.bind(this);
    this._closePopapClickHandler = this._closePopapClickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._addToWatchlistClick = this._addToWatchlistClick.bind(this);
    this._markAsWatchedClick = this._markAsWatchedClick.bind(this);
    this._favoriteClick = this._favoriteClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevFilmPopapComponent = this._filmPopapComponent;

    this._filmComponent = new FilmCardView(film);
    this._filmPopapComponent = new FilmDetailsPopap(film);

    this._filmComponent.setClickHandler(this._showPopapClickHandler);
    this._filmComponent.setAddToWatchlistClickHandler(this._addToWatchlistClick);
    this._filmComponent.setMarkAsWatchedClickHandler(this._markAsWatchedClick);
    this._filmComponent.setFavoriteClickHandler(this._favoriteClick);

    this._filmPopapComponent.setAddToWatchlistClickHandler(this._addToWatchlistClick);
    this._filmPopapComponent.setMarkAsWatchedClickHandler(this._markAsWatchedClick);
    this._filmPopapComponent.setFavoriteClickHandler(this._favoriteClick);

    if (prevFilmComponent === null || prevFilmPopapComponent === null) {
      render(this._mainContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._mode === Mode.OPEN) {
      replace(this._filmPopapComponent, prevFilmPopapComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmPopapComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmPopapComponent);
  }

  _showPopap() {
    render(body, this._filmPopapComponent, RenderPosition.BEFOREEND);
    this._filmPopapComponent.setClickHandler(this._closePopapClickHandler);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.OPEN;
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopap();
    }
  }

  _closePopap() {
    remove(this._filmPopapComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopap();
    }
  }

  _showPopapClickHandler() {
    this._showPopap();
  }

  _closePopapClickHandler() {
    this._closePopap();
  }

  _addToWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatchlist: !this._film.isWatchlist
            }
        )
    );
  }

  _markAsWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _favoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }
}
