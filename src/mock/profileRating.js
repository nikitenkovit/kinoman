export const generateRating = (filters) => {
  const currentHistoryValue = filters.find((it) => it.name === `History`).count;

  if (currentHistoryValue >= 21) {
    return `Movie buff`;
  } else if (currentHistoryValue >= 11 && currentHistoryValue <= 20) {
    return `Fun`;
  } else if (currentHistoryValue >= 1 && currentHistoryValue <= 10) {
    return `Novice`;
  }

  return ``;
};
