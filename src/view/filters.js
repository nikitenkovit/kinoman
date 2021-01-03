export const createFiltersTemplate = (filters) => {
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
