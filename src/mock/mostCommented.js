export const generateMostCommented = (films) => {
  const mostCommentedArr = films.slice();

  mostCommentedArr.sort(((a, b) => b.comments.length - a.comments.length));

  return mostCommentedArr.slice(0, 2);
};
