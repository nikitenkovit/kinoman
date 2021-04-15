import UserProfileView from "./view/user-profile.js";
import FooterStatsView from "./view/footer-stats.js";

import FilmsModel from "./model/films.js";
import FilterModel from "./model/filter.js";

import FilterPresenter from "./presenter/filter.js";
import StatisticsPresenter from "./presenter/statistics.js";
import BoardPresenter from "./presenter/board.js";

import Api from "./api/api.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";

import {render, RenderPosition} from "./utils/render.js";
import {ServerParameters, UpdateType} from "./const.js";

const StoreKeys = {
  STORE_PREFIX: `cinemaaddict-localstorage`,
  STORE_FILMS_VER: `v1`,
  STORE_COMMENTS_VER: `comments-v1`
};

const STORE_FILMS_NAME = `${StoreKeys.STORE_PREFIX}-${StoreKeys.STORE_FILMS_VER}`;
const STORE_COMMENTS_NAME = `${StoreKeys.STORE_PREFIX}-${StoreKeys.STORE_COMMENTS_VER}`;

const siteMain = document.querySelector(`.main`);
const siteHeader = document.querySelector(`.header`);
const siteFooterStats = document.querySelector(`.footer__statistics`);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();

const userProfileComponent = new UserProfileView();

const api = new Api(ServerParameters.END_POINT, ServerParameters.AUTHORIZATION);
const storeFilms = new Store(STORE_FILMS_NAME, window.localStorage);
const storeComments = new Store(STORE_COMMENTS_NAME, window.localStorage);
const apiWithProvider = new Provider(api, storeFilms, storeComments);

const statsPresenter = new StatisticsPresenter(siteMain, filmsModel);
const boardPresenter = new BoardPresenter(siteMain, filmsModel, filterModel, apiWithProvider, userProfileComponent);
const filterPresenter = new FilterPresenter(siteMain, filterModel, filmsModel, statsPresenter, boardPresenter);

render(siteHeader, userProfileComponent, RenderPosition.BEFOREEND);
filterPresenter.init();
boardPresenter.init();

apiWithProvider.getFilms().then((films) => {
  const commentPromises = films.map((film) => {
    return apiWithProvider.getComments(film.id);
  });
  Promise.all(commentPromises)
    .then((commentsAll) => {
      return films.map((film, index) => {
        return Object.assign(
            {},
            film,
            {
              comments: commentsAll[index]
            }
        );
      });
    })
    .then((receivedFilms) => {
      filmsModel.setFilms(UpdateType.INIT, receivedFilms);
      render(siteFooterStats, new FooterStatsView(receivedFilms.length).getElement(), RenderPosition.BEFOREEND);
    });
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`./sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, `тест`);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
