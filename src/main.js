import {createProfileRatingTemplate} from "./view/profileRating";
import {createMainNavigationTemplate} from "./view/mainNavigation";
import {createSortTemplate} from "./view/sort";
import {createFilmsContainerTemplate} from "./view/filmsContainer";
import {createShowMoreButtonTemplate} from "./view/showMoreButton";
import {createFilmCardTemplate} from "./view/filmCard";
import {createFooterStatisticsTemplate} from "./view/footerStatistics";
import {createFilmDetailsPopapTemplate} from "./view/filmDetailsPopap";

const render = (container, template, place = `beforeEnd`) => {
  container.insertAdjacentHTML(place, template);
};

const header = document.querySelector(`.header`);

render(header, createProfileRatingTemplate());

const main = document.querySelector(`.main`);

render(main, createMainNavigationTemplate());
render(main, createSortTemplate());
render(main, createFilmsContainerTemplate());

const films = main.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);
const topRatedContainer = document.getElementById(`topRated`);
const mostCommentedContainer = document.getElementById(`mostCommented`);
const FILMS_COUNTER = 5;
const FILMS_EXTRA_COUNTER = 2;

render(filmsList, createShowMoreButtonTemplate());

for (let i = 0; i < FILMS_COUNTER; i++) {
  render(filmsListContainer, createFilmCardTemplate());
}

for (let i = 0; i < FILMS_EXTRA_COUNTER; i++) {
  render(topRatedContainer, createFilmCardTemplate());
  render(mostCommentedContainer, createFilmCardTemplate());
}

const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

render(footerStatistics, createFooterStatisticsTemplate());

render(footer, createFilmDetailsPopapTemplate(), `afterEnd`);

const filmDetails = document.querySelector(`.film-details`);
filmDetails.style.display = `none`;
// const filmDetailsCloseBtn = filmDetails.querySelector(`.film-details__close-btn`);
// filmDetailsCloseBtn.onclick = () => {
//   filmDetails.style.display = `none`;
// };

import {generateFilm} from "./mock/film";

console.log(generateFilm());
