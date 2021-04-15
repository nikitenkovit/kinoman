import BoardView from "../view/board.js";
import NoFilmsView from "../view/no-films.js";
import ButtonView from "../view/button.js";
import SortView from "../view/sort.js";
import ExtraRatedContainerView from "../view/container-rated.js";
import ExtraCommentedContainerView from "../view/container-commented.js";
import FilmsContainerView from "../view/films-container.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";
import {sortDate, sortRating, generateTopRated, generateTopCommented} from "../utils/transform.js";
import {SortType, UpdateType, UserAction} from "../const.js";
import FilmPresenter from "./film.js";
import {makeFilters} from "../utils/filter.js";
import LoadingView from "../view/loading.js";
import {getRankName} from "../utils/statistics.js";

const FILMS_COUNT_PER_STEP = 5;
const EXTRAS_COUNT = 2;

export default class Board {
  constructor(boardContainer, filmsModel, filterModel, api, userProfileComponent) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._boardContainer = boardContainer;
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    this._api = api;

    this._loadMoreButtonComponent = null;
    this._sortComponent = null;
    this._isLoading = true;
    this._filmsWatched = 0;

    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};
    this._filmRatedPresenter = {};
    this._filmCommentedPresenter = {};

    this._boardComponent = new BoardView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._loadingComponent = new LoadingView();
    this._userProfileComponent = userProfileComponent;

    this._noFilmsComponent = new NoFilmsView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleLoadButton = this._handleLoadButton.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredFilms = makeFilters(films)[filterType];

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort(sortDate);
      case SortType.RATING:
        return filteredFilms.sort(sortRating);
    }

    return filteredFilms;
  }

  init() {
    this._renderBoard();
  }

  destroy() {
    this._clearBoard();
    remove(this._boardComponent);

    remove(this._sortComponent);
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = null;
  }

  _clearBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());

    Object
      .values(this._filmRatedPresenter)
      .forEach((presenter) => presenter.destroy());

    Object
      .values(this._filmCommentedPresenter)
      .forEach((presenter) => presenter.destroy());

    this._filmPresenter = {};
    this._filmRatedPresenter = {};
    this._filmCommentedPresenter = {};

    remove(this._noFilmsComponent);
    remove(this._loadMoreButtonComponent);
    remove(this._extraCommented);
    remove(this._extraRated);
    remove(this._loadingComponent);

    this._renderedFilmsCount = (resetRenderedFilmCount) ? FILMS_COUNT_PER_STEP : Math.min(filmCount, this._renderedFilmsCount);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderLoading() {
    render(this._boardContainer, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _renderBoard() {
    this._renderSort();

    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const films = this._getFilms();
    const filmCount = films.length;

    this._userProfileComponent.updateRank(getRankName(this._filmsModel.getFilms()));

    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);

    this._renderExtras(films);

    if (filmCount === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderFilms(films.slice(0, Math.min(filmCount, this._renderedFilmsCount)));

    if (filmCount > this._renderedFilmsCount) {
      this._renderLoadMoreButton();
    }
  }

  _renderSort() {
    const prevSortComponent = this._sortComponent;
    this._sortComponent = new SortView(this._currentSortType);

    if (!this._isLoading) {
      this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    }

    if (prevSortComponent === null) {
      render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._sortComponent, prevSortComponent);
    remove(prevSortComponent);
  }

  _renderFilms(films) {
    render(this._boardComponent, this._filmsContainerComponent, RenderPosition.AFTERBEGIN);

    films.forEach((film) => this._renderFilm(this._filmsContainerComponent.getContainer(), film, this._filmPresenter));
  }

  _renderFilm(container, film, presenterList) {
    const filmPresenter = new FilmPresenter(container, this._handleViewAction, this._handleModeChange);
    filmPresenter.init(film);
    presenterList[film.id] = filmPresenter;
  }

  _renderNoFilms() {
    remove(this._filmsContainerComponent);
    render(this._boardComponent, this._noFilmsComponent, RenderPosition.AFTERBEGIN);
  }

  _renderLoadMoreButton() {
    if (this._loadMoreButtonComponent !== null) {
      this._loadMoreButtonComponent = null;
    }

    this._loadMoreButtonComponent = new ButtonView();

    render(this._filmsContainerComponent, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(this._handleLoadButton);
  }

  _renderExtras() {
    this._extraRated = new ExtraRatedContainerView();
    this._extraCommented = new ExtraCommentedContainerView();

    this._renderExtra(this._extraRated, generateTopRated, this._filmRatedPresenter);
    this._renderExtra(this._extraCommented, generateTopCommented, this._filmCommentedPresenter);
  }

  _renderExtra(component, generateTopList, presenter) {
    const topFilms = generateTopList(this._filmsModel.getFilms().slice());

    if (topFilms.length === 0) {
      return;
    }

    render(this._boardComponent, component, RenderPosition.BEFOREEND);

    for (let i = 0; i < Math.min(topFilms.length, EXTRAS_COUNT); i++) {
      this._renderFilm(component.getContainer(), topFilms[i], presenter);
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clearBoard({resetRenderedFilmCount: true});
    this._renderBoard();
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
    Object
      .values(this._filmRatedPresenter)
      .forEach((presenter) => presenter.resetView());
    Object
      .values(this._filmCommentedPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._api.updateFilm(update).then((response) => {
          this._api.getComments(update.id)
            .then((updatedComments) => {
              return Object.assign(
                  {},
                  response,
                  {
                    comments: updatedComments
                  }
              );
            })
            .then((film) => {
              this._filmsModel.updateFilm(updateType, film);
            });
        });
        break;
      case UserAction.ADD_COMMENT:
        this._api.addComment(update.commentBody)
          .then((film) => {
            this._filmsModel.updateFilm(updateType, film);
          })
          .catch(() => {
            update.filmDetailsComponent.handleAddCommentError();
          });
        break;
      case UserAction.DELETE_COMMENT:
        this._api.deleteComment(update.filmId, update.idToDelete)
          .then(() => {
            this._filmsModel.updateFilm(updateType, update.filmWithoutComment);
          })
          .catch(() => {
            update.filmDetailsComponent.handleDeleteCommentError(update.idToDelete);
          });
        break;
    }
  }

  _handlePopupRerendered(id) {
    if (this._filmPresenter[id]) {
      this._filmPresenter[id].removeEventListener();
    }
    if (this._filmRatedPresenter[id]) {
      this._filmRatedPresenter[id].removeEventListener();
    }
    if (this._filmCommentedPresenter[id]) {
      this._filmCommentedPresenter[id].removeEventListener();
    }
  }

  _handleOpenRerendedPopup(id) {
    if (this._filmPresenter[id]) {
      this._filmPresenter[id].openFilmPopup();
    }
    if (this._filmRatedPresenter[id]) {
      this._filmRatedPresenter[id].openFilmPopup();
    }
    if (this._filmCommentedPresenter[id]) {
      this._filmCommentedPresenter[id].openFilmPopup();
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.MINOR:
        this._clearBoard({resetRenderedFilmCount: false, resetSortType: false});
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this._renderBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderBoard();
        break;
      case UpdateType.POPUP:
        this._handlePopupRerendered(data.id);

        this._clearBoard({resetRenderedFilmCount: false, resetSortType: false});
        this._renderBoard();

        this._handleOpenRerendedPopup(data.id);

        break;
    }
  }

  _handleLoadButton() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmsCount + FILMS_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmsCount, newRenderedFilmCount);

    this._renderFilms(films);
    this._renderedFilmsCount = newRenderedFilmCount;

    if (this._renderedFilmsCount >= filmCount) {
      remove(this._loadMoreButtonComponent);
    }
  }
}
