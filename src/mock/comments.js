import {getRandomInteger} from "../utils";
import dayjs from "dayjs";

const getComment = () => {
  const comments = [
    `Interesting setting and a good cast`,
    `Booooooooooring`,
    `Very very old. Meh`,
    `Almost two hours? Seriously?`,
    `As soon as you start watching, you won't even understand what the film is about ... don't waste your time.`,
    `Oh, and the main character is scary ...`,
    `thanks rewind ...`,
    `This is the first time I've seen such a rating`,
    `this is a movie! this is a comedy! laughed to tears! Really haven't watched the movie yet`,
    `Just looked in the bathroom. Good movie! and the Actors are good!`,
    `actor could have picked another`,
    `beautiful views, kindness, positive, plot`
  ];

  const randomIndex = getRandomInteger(0, comments.length - 1);

  return comments[randomIndex];
};

const getEmotion = () => {
  const emotions = [
    `smile`,
    `sleeping`,
    `puke`,
    `angry`
  ];

  const randomIndex = getRandomInteger(0, emotions.length - 1);

  return emotions[randomIndex];
};

const getAuthor = () => {
  const authors = [
    `Tim Macoveev`,
    `John Doe`,
    `Julius Caesar`,
    `Snickers`,
    `Plump Pancake`,
    `Dead Moroz`,
    `Mr_Crazy`,
    `Isaak NewTon`,
    `Green Pikachu`,
    `Dark Steam`,
    `Ivanich`,
    `Richard Weil`
  ];

  const randomIndex = getRandomInteger(0, authors.length - 1);

  return authors[randomIndex];
};

export const generateDate = (gap, unit, template) => {
  const randomGap = getRandomInteger(1, -gap);

  return dayjs().add(randomGap, unit).format(template);
};

export const generateComment = () => {
  return {
    commentText: getComment(),
    emotion: getEmotion(),
    author: getAuthor(),
    commentDate: generateDate(1000000, `minute`, `YYYY/MM/DD HH:MM`)
  };
};
