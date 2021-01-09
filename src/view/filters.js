import {createElement} from "../utils";

const createFiltersTemplate = (filters) => {
  const createFilterMarkup = () => {
    const filtersArr = filters.map(({name, count}) =>
      `<a href="#${name.toLowerCase()}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`
    );

    return filtersArr.join(`\n`);
  };

  return (
    `<div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${createFilterMarkup()}
      </div>`
  );
};

export default class Filters {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}