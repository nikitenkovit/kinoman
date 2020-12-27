import {getRandomInteger} from "../utils";
import {generateComment} from "./comments";

const generateTitle = () => {
  const titles = [
    `The Dance of Life`,
    `Sagebrush Trail`,
    `The Man with the Golden Arm`,
    `Santa Claus Conquers the Martians`,
    `Popeye the Sailor Meets Sindbad the Sailor`,
    `The Great Flamarion`,
    `Made for Each Other`
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generatePoster = () => {
  const posters = [
    `the-dance-of-life.jpg`,
    `sagebrush-trail.jpg`,
    `the-man-with-the-golden-arm.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `popeye-meets-sinbad.png`,
    `the-great-flamarion.jpg`,
    `made-for-each-other.png`
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateDescription = () => {
  const descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`,
  ];

  const description = [];
  const randomInteger = getRandomInteger(1, 5);

  for (let i = 0; i < randomInteger; i++) {
    const randomIndex = getRandomInteger(0, descriptions.length - 1);
    description.push(descriptions[randomIndex]);
  }

  return description.join(` `);
};

const generateRating = () => {
  const randomRating = 6 + Math.random() * (9.5 - 6);
  return randomRating.toFixed(1);
};

const generateYear = () => {
  return getRandomInteger(1933, 1964);
};

const generateDuration = () => {
  const maxDuration = 119;

  const duration = getRandomInteger(16, maxDuration);

  if (duration < 60) {
    return duration + `m`;
  } else {
    return `1h ${duration - 60}m`;
  }
};

const generateGenres = () => {
  const genres = [
    `Drama`,
    `Film-Noir`,
    `Mystery`,
    `Musical`,
    `Western`,
    `Comedy`,
    `Cartoon`
  ];

  const randomIndex = getRandomInteger(0, genres.length - 1);

  return genres[randomIndex];
};

export const generateFilm = () => {
  const title = generateTitle();
  const commentsArrayLength = getRandomInteger(0, 5);
  const comments = new Array(commentsArrayLength).fill().map(generateComment);
  const genresArrayLength = getRandomInteger(1, 3);
  const genres = new Array(genresArrayLength)
    .fill()
    .map(generateGenres);
  const filteredGenresArr = genres.filter((item, pos) => {
    return genres.indexOf(item) === pos;
  });

  return {
    title,
    titleOriginal: title,
    poster: generatePoster(),
    description: generateDescription(),
    comments,
    commentsNumberOf: comments.length,
    rating: generateRating(),
    year: generateYear(),
    duration: generateDuration(),
    genres: filteredGenresArr,
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
