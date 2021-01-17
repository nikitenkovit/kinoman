import RatingView from "./view/profileRating";
import MainNavigationView from "./view/mainNavigation";
import FiltersView from "./view/filters";
import SortView from "./view/sort";
import FooterStatistics from "./view/footerStatistics";
import {generateFilm} from "./mock/film";
import {generateFilter} from "./mock/filter.js";
import {generateRating} from "./mock/profileRating";
import BoardPresenter from "./presenter/board";
import {render, RenderPosition} from "./utils/render.js";

const FILMS_COUNTER = 20;
const filmsArray = new Array(FILMS_COUNTER).fill().map(generateFilm);
const filters = generateFilter(filmsArray);
const rating = generateRating(filters);

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

render(header, new RatingView(rating), RenderPosition.BEFOREEND);

const mainNavigationComponent = new MainNavigationView();
render(main, mainNavigationComponent, RenderPosition.AFTERBEGIN);

render(mainNavigationComponent, new FiltersView(filters), RenderPosition.AFTERBEGIN);

const sortComponent = new SortView();
render(main, sortComponent, RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(main, sortComponent);
boardPresenter.init(filmsArray);

const footerStatistics = document.querySelector(`.footer__statistics`);
render(footerStatistics, new FooterStatistics(filmsArray), RenderPosition.BEFOREEND);
