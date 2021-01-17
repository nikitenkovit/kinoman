import {getRandomInteger, removeDuplicate} from "../utils/common";
import {generateComment, generateDate} from "./comments";

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateTitle = () => {
  const titles = [
    `Peter Pencil`,
    `Lascivious Cinderella`,
    `Kolobok in 3D`,
    `Brjansk 2112`,
    `Strong Olezhek`,
    `Do not try to quit Chelyabinsk`,
    `Pirates of Silicon Valley`,
    `Escape from Omsk`,
    `why did I wet the mantu?`,
    `Broken doll`,
    `The price of a different reality`,
    `The market for feelings`,
    `Save yourself`,
    `Dirty water`,
    `Purple fog`,
    `A hero who has forgotten that he is a hero`,
    `Misty Valley Hero`,
    `Assimilation`,
    `The shadow on the other side`,
    `Save the world in nine lives`,
    `Wet letter`,
    `The canons of mechanics`,
    `Summer travel`,
    `Sun at the top of the hill`,
    `Der Minister`,
    `Master Dark`,
    `Ocean of my pain`,
    `Find the meaning`,
    `Thought generator`,
    `Born to dream`,
    `Loser's piggy bank`,
    `Famous warriors of our time`,
    `Banner Lost in the Dark`,
    `Forest San Fiero`,
    `Deep breath`,
    `Eye of Terror`,
    `A story about the shape of fire`,
    `Dead soil`
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
  return generateDate(32120, `day`, `D MMMM YYYY`);
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

const generateDirector = () => {
  const directors = [
    `Djuzeppe Buratino`,
    `Father Karlo`,
    `Arnold Stalonovich`,
    `Silvestr s Talonom`,
    `Donald Goose`,
    `Barri Alebastrov`,
    `Mihael Shuhernaher`,
    `Jacques Doshirak`,
    `Dmitrii Beeline`,
    `John Borjomi`,
    `Jennifer Hlopec`,
    `Yatasuka Nakomode`,
    `Leave Trailer`,
    `Demmy Meow`,
    `Jim Fairy`,
    `Mila Yoyoyobich`
  ];

  const randomIndex = getRandomInteger(0, directors.length - 1);

  return directors[randomIndex];
};

const generateWriters = () => {
  const writers = [
    `Djuzeppe Buratino`,
    `Father Karlo`,
    `Arnold Stalonovich`,
    `Silvestr s Talonom`,
    `Donald Goose`,
    `Barri Alebastrov`,
    `Hope Babkina`,
    `Mihael Shuhernaher`,
    `Jacques Doshirak`,
    `Dmitrii Beeline`,
    `John Borjomi`,
    `Jennifer Hlopec`,
    `Yatasuka Nakomode`,
    `Leave Trailer`,
    `Demmy Meow`,
    `Jim Fairy`,
    `Mila Yoyoyobich`
  ];

  const randomIndex = getRandomInteger(0, writers.length - 1);

  return writers[randomIndex];
};

const generateActors = () => {
  const actors = [
    `Djuzeppe Buratino`,
    `Father Karlo`,
    `Arnold Stalonovich`,
    `Silvestr s Talonom`,
    `Donald Goose`,
    `Barri Alebastrov`,
    `Hope Babkina`,
    `Mihael Shuhernaher`,
    `Jacques Doshirak`,
    `Dmitrii Beeline`,
    `John Borjomi`,
    `Jennifer Hlopec`,
    `Yatasuka Nakomode`,
    `Leave Trailer`,
    `Demmy Meow`,
    `Jim Fairy`,
    `Mila Yoyoyobich`
  ];

  const randomIndex = getRandomInteger(0, actors.length - 1);

  return actors[randomIndex];
};

const generateCountry = () => {
  const countries = [
    `Russia`,
    `USA`,
    `India`,
    `Great Britain`,
    `Germany`,
    `Poland`,
    `Australia`,
    `Italy`,
    `France`
  ];

  const randomIndex = getRandomInteger(0, countries.length - 1);

  return countries[randomIndex];
};

export const generateFilm = () => {
  const title = generateTitle();
  const commentsArrayLength = getRandomInteger(0, 6);
  const comments = new Array(commentsArrayLength).fill().map(generateComment);
  const genres = removeDuplicate(generateGenres, 1, 4);
  const writers = removeDuplicate(generateWriters, 2, 4).join(`, `);
  const actors = removeDuplicate(generateActors, 3, 5).join(`, `);
  const ageRating = getRandomInteger(0, 18) + `+`;

  return {
    id: generateId(),
    title,
    titleOriginal: title,
    poster: generatePoster(),
    description: generateDescription(),
    comments,
    rating: generateRating(),
    date: generateYear(),
    duration: generateDuration(),
    genres,
    director: generateDirector(),
    writers,
    actors,
    ageRating,
    country: generateCountry(),
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
