import AbstractView from "./abstract";

const createMostCommentedTemplate = () => {
  return (
    `<section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>
        <div class="films-list__container"></div>
     </section>`
  );
};

export default class MostCommented extends AbstractView {
  getTemplate() {
    return createMostCommentedTemplate();
  }

  getContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
