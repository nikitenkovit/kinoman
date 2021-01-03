import {addLetterAtTheEnd} from "../utils";

export const createFilmCardTemplate = (film) => {
  const {comments,
    description,
    duration,
    genres,
    isFavorite,
    isWatched,
    isWatchlist,
    poster,
    rating,
    title,
    year} = film;

  const filmYear = () => {
    return year.split(` `).pop();
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
