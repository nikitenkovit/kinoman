import RatingView from "./view/profileRating";
import MainNavigationView from "./view/mainNavigation";
import FiltersView from "./view/filters";
import SortView from "./view/sort";
import FilmsView from "./view/films";
import FilmsListView from "./view/filmsList";
import FilmListContainerView from "./view/filmListContainer";
import TopRated from "./view/topRated";
import MostCommented from "./view/mostCommented";
import FilmCardView from "./view/filmCard";
import FilmDetailsPopap from "./view/filmDetailsPopap";
import ShowMoreButton from "./view/showMoreButton";
import FooterStatistics from "./view/footerStatistics";
import NoFilms from "./view/no-films";
import {generateFilm} from "./mock/film";
import {generateTopRated} from "./mock/topRated";
import {generateMostCommented} from "./mock/mostCommented";
import {generateFilter} from "./mock/filter.js";
import {generateRating} from "./mock/profileRating";
import {render, RenderPosition} from "./utils.js";

const FILMS_COUNTER = 20;
const FILMS_COUNT_PER_STEP = 5;
const filmsArray = new Array(FILMS_COUNTER).fill().map(generateFilm);
const topRatedArray = generateTopRated(filmsArray);
const mostCommentedArray = generateMostCommented(filmsArray);
const filters = generateFilter(filmsArray);
const rating = generateRating(filters);

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const renderFilm = (filmListContainerElement, film) => {
  const filmComponent = new FilmCardView(film);
  const filmPopapComponent = new FilmDetailsPopap(film);
  const body = document.querySelector(`body`);

  const showPopap = () => {
    render(body, filmPopapComponent.getElement(), RenderPosition.BEFOREEND);
  };

  const closePopap = () => {
    filmPopapComponent.getElement().remove();
    filmPopapComponent.removeElement();
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      closePopap();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    showPopap();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  filmComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => {
    showPopap();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  filmComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => {
    showPopap();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  filmPopapComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    closePopap();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  render(filmListContainerElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

render(header, new RatingView(rating).getElement(), RenderPosition.BEFOREEND);

const mainNavigationComponent = new MainNavigationView();
render(main, mainNavigationComponent.getElement(), RenderPosition.AFTERBEGIN);

render(mainNavigationComponent.getElement(), new FiltersView(filters).getElement(), RenderPosition.AFTERBEGIN);

render(main, new SortView().getElement(), RenderPosition.BEFOREEND);

const FilmsComponent = new FilmsView();
const FilmListComponent = new FilmsListView();
const FilmListContainerComponent = new FilmListContainerView();

render(main, FilmsComponent.getElement(), RenderPosition.BEFOREEND);

const renderAllFilms = () => {
  render(FilmsComponent.getElement(), FilmListComponent.getElement(), RenderPosition.BEFOREEND);
  render(FilmListComponent.getElement(), FilmListContainerComponent.getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < Math.min(FILMS_COUNT_PER_STEP, filmsArray.length); i++) {
    renderFilm(FilmListContainerComponent.getElement(), filmsArray[i]);
  }

  if (filmsArray.length > FILMS_COUNT_PER_STEP) {
    let renderedFilmsCount = FILMS_COUNT_PER_STEP;

    const showMoreButtonComponent = new ShowMoreButton();

    render(FilmListComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      filmsArray
        .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
        .forEach((film) => renderFilm(FilmListContainerComponent.getElement(), film));

      renderedFilmsCount += FILMS_COUNT_PER_STEP;

      if (renderedFilmsCount >= filmsArray.length) {
        showMoreButtonComponent.getElement().remove();
        showMoreButtonComponent.removeElement();
      }
    });
  }

  const TopRatedComponent = new TopRated();
  const TopRatedContainerComponent = new FilmListContainerView();
  render(FilmsComponent.getElement(), TopRatedComponent.getElement(), RenderPosition.BEFOREEND);
  render(TopRatedComponent.getElement(), TopRatedContainerComponent.getElement(), RenderPosition.BEFOREEND);

  topRatedArray.forEach((film) => {
    renderFilm(TopRatedContainerComponent.getElement(), film);
  });

  const MostCommentedComponent = new MostCommented();
  const MostCommentedContainerComponent = new FilmListContainerView();
  render(FilmsComponent.getElement(), MostCommentedComponent.getElement(), RenderPosition.BEFOREEND);
  render(MostCommentedComponent.getElement(), MostCommentedContainerComponent.getElement(), RenderPosition.BEFOREEND);

  mostCommentedArray.forEach((film) => {
    renderFilm(MostCommentedContainerComponent.getElement(), film);
  });
};

if (filmsArray.length === 0) {
  render(FilmsComponent.getElement(), new NoFilms().getElement(), RenderPosition.BEFOREEND);
} else {
  renderAllFilms();
}

const footerStatistics = document.querySelector(`.footer__statistics`);
render(footerStatistics, new FooterStatistics(filmsArray).getElement(), RenderPosition.BEFOREEND);
