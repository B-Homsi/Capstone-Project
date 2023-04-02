import { getNextReviewDate } from "./getNextReviewDate";

test("calculates the next review date based on the lastReviewed date and stage", () => {
  const lastReviewed = "2023-04-02T00:00:00.000Z";

  expect(getNextReviewDate(lastReviewed, 0).toISOString()).toBe(
    "2023-04-03T00:00:00.000Z"
  );
  expect(getNextReviewDate(lastReviewed, 1).toISOString()).toBe(
    "2023-04-03T00:00:00.000Z"
  );
  expect(getNextReviewDate(lastReviewed, 2).toISOString()).toBe(
    "2023-04-03T00:00:00.000Z"
  );
  expect(getNextReviewDate(lastReviewed, 3).toISOString()).toBe(
    "2023-04-05T00:00:00.000Z"
  );
  expect(getNextReviewDate(lastReviewed, 4).toISOString()).toBe(
    "2023-04-09T00:00:00.000Z"
  );
});
