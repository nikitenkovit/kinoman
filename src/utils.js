export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const removeDuplicate = (arr, min, max) => {
  const arrayLength = getRandomInteger(min, max);
  const array = new Array(arrayLength)
    .fill()
    .map(arr);
  return array.filter((item, pos) => {
    return array.indexOf(item) === pos;
  });
};

export const addLetterAtTheEnd = (is) => {
  return is.length === 1
    ? ``
    : `s`;
};
