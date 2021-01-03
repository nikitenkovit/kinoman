import {createProfileRatingTemplate} from "./view/profileRating";
import {createMainNavigationTemplate} from "./view/mainNavigation";
import {createFiltersTemplate} from "./view/filters";
import {createSortTemplate} from "./view/sort";
import {createFilmsContainerTemplate} from "./view/filmsContainer";
import {createShowMoreButtonTemplate} from "./view/showMoreButton";
import {createFilmCardTemplate} from "./view/filmCard";
import {createFooterStatisticsTemplate} from "./view/footerStatistics";
import {createFilmDetailsPopapTemplate} from "./view/filmDetailsPopap";
import {generateFilm} from "./mock/film";
import {generateFilter} from "./mock/filter.js";
import {generateRating} from "./mock/profileRating";

const render = (container, template, place = `beforeEnd`) => {
  container.insertAdjacentHTML(place, template);
};

const main = document.querySelector(`.main`);

render(main, createMainNavigationTemplate());
render(main, createSortTemplate());
render(main, createFilmsContainerTemplate());

const mainNavigation = main.querySelector(`.main-navigation`);
const films = main.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);
const topRatedContainer = document.getElementById(`topRated`);
const mostCommentedContainer = document.getElementById(`mostCommented`);

const FILMS_COUNTER = 20;
const FILMS_COUNT_PER_STEP = 5;
const FILMS_EXTRA_COUNTER = 2;

const filmsArray = new Array(FILMS_COUNTER).fill().map(generateFilm);
const filters = generateFilter(filmsArray);

const header = document.querySelector(`.header`);

render(header, createProfileRatingTemplate(generateRating(filters)));
render(mainNavigation, createFiltersTemplate(filters), `afterBegin`);

for (let i = 0; i < Math.min(FILMS_COUNT_PER_STEP, filmsArray.length); i++) {
  render(filmsListContainer, createFilmCardTemplate(filmsArray[i]));
}

if (filmsArray.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;

  render(filmsList, createShowMoreButtonTemplate());

  const showMoreButton = filmsList.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filmsArray
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => render(filmsListContainer, createFilmCardTemplate(film)));

    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmsCount >= filmsArray.length) {
      showMoreButton.remove();
    }
  });
}

for (let i = 0; i < FILMS_EXTRA_COUNTER; i++) {
  render(topRatedContainer, createFilmCardTemplate(filmsArray[i]));
  render(mostCommentedContainer, createFilmCardTemplate(filmsArray[i]));
}

const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

render(footerStatistics, createFooterStatisticsTemplate(filmsArray));

const allFilmCardPosters = document.querySelectorAll(`.film-card__poster`);
const allFilmCardTitles = document.querySelectorAll(`.film-card__title`);
const allFilmCardComments = document.querySelectorAll(`.film-card__comments`);

const closeButtonClickHandler = () => {
  const filmDetails = document.querySelector(`.film-details`);
  const filmDetailsCloseBtn = filmDetails.querySelector(`.film-details__close-btn`);
  filmDetailsCloseBtn.addEventListener(`click`, () => {
    filmDetails.remove();
  });
};

const showPopup = (index) => {
  render(footer, createFilmDetailsPopapTemplate(filmsArray[index]), `afterEnd`);
  closeButtonClickHandler();
};

allFilmCardPosters.forEach((it, index) => {
  it.addEventListener(`click`, () => {
    showPopup(index);
  });
});

allFilmCardTitles.forEach((it, index) => {
  it.addEventListener(`click`, () => {
    showPopup(index);
  });
});

allFilmCardComments.forEach((it, index) => {
  it.addEventListener(`click`, () => {
    showPopup(index);
  });
});
