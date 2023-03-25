import { getCardsForReviewToday } from "./getCardsForReviewToday";

export const getCardsForReviewSubject = (subject) => {
  const cardsForReview = [];

  subject?.topics.forEach((topic) => {
    const cards = getCardsForReviewToday(topic.cards || []);
    cardsForReview.push(...cards);
  });

  return cardsForReview;
};
