import { getNextReviewDate } from './getNextReviewDate';

export const getCardsForReviewToday = (cards) => {
  const today = new Date().setHours(0, 0, 0, 0);
  return cards.filter((card) => {
    if (card.lastReviewed === null) {
      return true;
    }
    const nextReviewDate = getNextReviewDate(card.lastReviewed, card.stage);
    return nextReviewDate.setHours(0, 0, 0, 0) <= today;
  });
};
