import {addLetterAtTheEnd} from "../utils/common";
import AbstractView from "./abstract";

const createFilmCardTemplate = (film) => {
  const {
    comments,
    description,
    duration,
    genres,
    isFavorite,
    isWatched,
    isWatchlist,
    poster,
    rating,
    title,
    date
  } = film;

  const filmYear = () => {
    return date.split(` `).pop();
  };

  const filmGenres = () => {
    return genres[0];
  };

  const filmDescription = () => {
    if (description.length <= 140) {
      return description;
    }
    return description.slice(0, 139) + `...`;
  };

  const addClassNameToButton = (is) => {
    return is
      ? `film-card__controls-item--active`
      : ``;
  };

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${filmYear()}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${filmGenres()}</span>
      </p>
      <img src="./images/posters/${poster}" alt="poster ${title}" class="film-card__poster">
        <p class="film-card__description">${filmDescription()}
        </p>
        <a class="film-card__comments">${comments.length} comment${addLetterAtTheEnd(comments)}</a>
        <form class="film-card__controls">
          <button
            class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${addClassNameToButton(isWatchlist)}">
            Add to watchlist
          </button>
          <button
            class="film-card__controls-item button film-card__controls-item--mark-as-watched ${addClassNameToButton(isWatched)}">
            Mark as watched
          </button>
          <button
            class="film-card__controls-item button film-card__controls-item--favorite ${addClassNameToButton(isFavorite)}">
            Mark as favorite
          </button>
        </form>
    </article>`
  );
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._clickHandler = this._clickHandler.bind(this);
    this._addToWatchlistClickHandler = this._addToWatchlistClickHandler.bind(this);
    this._markAsWatchedClickHandler = this._markAsWatchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _clickHandler() {
    this._callback.click();
  }

  _addToWatchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchlistClick();
  }

  _markAsWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.markAsWatchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._clickHandler);
  }

  setAddToWatchlistClickHandler(callback) {
    this._callback.addToWatchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._addToWatchlistClickHandler);
  }

  setMarkAsWatchedClickHandler(callback) {
    this._callback.markAsWatchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._markAsWatchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }
}
