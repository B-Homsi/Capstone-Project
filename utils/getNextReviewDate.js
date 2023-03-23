export const getNextReviewDate = (lastReviewed, stage) => {
  const baseInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const multiplier = stage === 0 ? 1 : stage * 2;
  const interval = baseInterval * multiplier;

  const nextReviewDate = new Date(new Date(lastReviewed).getTime() + interval);
  return nextReviewDate;
};
