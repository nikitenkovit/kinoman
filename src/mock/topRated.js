export const generateTopRated = (films) => {
  const topRatedArr = films.slice();

  topRatedArr.sort(((a, b) => b.rating - a.rating));

  return topRatedArr.slice(0, 2);
};