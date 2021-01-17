import FilmsView from "../view/films";
import FilmsListView from "../view/filmsList";
import FilmListContainerView from "../view/filmListContainer";
import TopRated from "../view/topRated";
import MostCommented from "../view/mostCommented";
import ShowMoreButton from "../view/showMoreButton";
import NoFilms from "../view/no-films";
import FilmPresenter from "./film";
import {render, RenderPosition, remove, generateTopRated, generateTopCommented} from "../utils/render.js";
import {updateItem} from "../utils/common";
import {SortType} from "../const";
import dayjs from "dayjs";

const FILMS_COUNT_PER_STEP = 5;
const EXTRAS_COUNT = 2;

export default class Board {
  constructor(mainContainer, sortComponent) {
    this._mainContainer = mainContainer;
    this._sortComponent = sortComponent;
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    this._moviePresenter = {};
    this._filmTopRatedPresenter = {};
    this._filmTopCommentedPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._filmsComponent = new FilmsView();
    this._filmListComponent = new FilmsListView();
    this._filmListContainerComponent = new FilmListContainerView();
    this._noFilmsComponent = new NoFilms();
    this._showMoreButtonComponent = new ShowMoreButton();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleMovieChange = this._handleMovieChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(filmsArr) {
    this._filmsArray = filmsArr.slice();
    this._sourcedFilms = filmsArr.slice();

    render(this._mainContainer, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmListComponent, RenderPosition.BEFOREEND);

    this._renderBoard();

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._filmsArray.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));
        break;
      case SortType.RATING:
        this._filmsArray.sort((a, b) => b.rating - a.rating);
        break;
      default:
        this._filmsArray = this._sourcedFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearMovieList();
    this._renderBoard();
  }

  _handleModeChange() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleMovieChange(updatedMovie) {
    this._filmsArray = updateItem(this._filmsArray, updatedMovie);
    this._moviePresenter[updatedMovie.id].init(updatedMovie);
  }

  // отрисовка отдельного фильма
  _renderFilm(container, film, presenterList) {
    const moviePresenter = new FilmPresenter(container, this._handleMovieChange, this._handleModeChange);
    moviePresenter.init(film);
    presenterList[film.id] = moviePresenter;
  }

  // отрисовка списка фильмов
  _renderFilms(from, to) {
    this._filmsArray
      .slice(from, to)
      .forEach((film) => this._renderFilm(this._filmListContainerComponent, film, this._moviePresenter));
  }

  // отрисовка заглушки
  _renderNoFilms() {
    render(this._filmsComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmsCount, this._renderedFilmsCount + FILMS_COUNT_PER_STEP);
    this._renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this._renderedFilmsCount >= this._filmsArray.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _clearMovieList() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());
    Object
      .values(this._filmTopRatedPresenter)
      .forEach((presenter) => presenter.destroy());
    Object
      .values(this._filmTopCommentedPresenter)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};
    this._filmTopRatedPresenter = {};
    this._filmTopCommentedPresenter = {};
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    remove(this._noFilmsComponent);
    remove(this._showMoreButtonComponent);
    remove(this._topRatedComponent);
    remove(this._mostCommentedComponent);
  }

  _renderFilmsList() {
    render(this._filmListComponent, this._filmListContainerComponent, RenderPosition.BEFOREEND);

    this._renderFilms(0, Math.min(FILMS_COUNT_PER_STEP, this._filmsArray.length));

    if (this._filmsArray.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  // отрисовка блоков экстра
  _renderExtra(component, generateTopList, presenter) {
    const topFilms = generateTopList(this._filmsArray.slice());

    if (topFilms.length === 0) {
      return; // если у всех фильмов рейтинг = 0 или нет комментариев не отображть
    }

    render(this._filmsComponent, component, RenderPosition.BEFOREEND);

    for (let i = 0; i < Math.min(topFilms.length, EXTRAS_COUNT); i++) {
      this._renderFilm(component.getContainer(), topFilms[i], presenter);
    }
  }

  _renderExtras() {
    this._topRatedComponent = new TopRated();
    this._mostCommentedComponent = new MostCommented();

    this._renderExtra(this._topRatedComponent, generateTopRated, this._filmTopRatedPresenter);
    this._renderExtra(this._mostCommentedComponent, generateTopCommented, this._filmTopCommentedPresenter);
  }

  _renderBoard() {
    if (this._filmsArray.length === 0) {
      this._renderNoFilms();

      return;
    }

    this._renderFilmsList();

    this._renderExtras();
  }
}
