import AbstractView from "./abstract";

const createTopRatedTemplate = () => {
  return (
    `<section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>
        <div class="films-list__container"></div>
     </section>`
  );
};

export default class TopRated extends AbstractView {
  getTemplate() {
    return createTopRatedTemplate();
  }

  getContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
