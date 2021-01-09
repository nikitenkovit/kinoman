import {createElement} from "../utils";

const createProfileRatingTemplate = (rating) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
  );
};

export default class Rating {
  constructor(rating) {
    this._rating = rating;
    this._element = null;
  }

  getTemplate() {
    return createProfileRatingTemplate(this._rating);
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
