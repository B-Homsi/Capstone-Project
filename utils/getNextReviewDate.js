export const getNextReviewDate = (lastReviewed, stage) => {
  const baseInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  let multiplier;

  if (stage === 0 || stage === 1) {
    multiplier = 1;
  } else {
    multiplier = Math.pow(2, stage - 1) - 1;
  }

  const interval = baseInterval * multiplier;

  const nextReviewDate = new Date(new Date(lastReviewed).getTime() + interval);
  return nextReviewDate;
};
