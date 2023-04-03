import { getCardsForReviewToday } from "./getCardsForReviewToday";

test("filters cards that are due for review today", () => {
  const mockToday = "2023-04-02T00:00:00.000Z";
  const mockYesterday = "2023-04-01T00:00:00.000Z";
  const mockCards = [
    { id: 1, lastReviewed: null, stage: 0 },
    { id: 2, lastReviewed: mockToday, stage: 0 },
    { id: 3, lastReviewed: mockYesterday, stage: 1 },
    { id: 4, lastReviewed: mockToday, stage: 1 },
    { id: 5, lastReviewed: mockToday, stage: 2 },
  ];

  const cardsForReviewToday = getCardsForReviewToday(mockCards);

  expect(cardsForReviewToday.length).toBe(5);
  expect(cardsForReviewToday.map((card) => card.id)).toEqual([1, 2, 3, 4, 5]);
});
