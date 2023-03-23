import { getCardsForReviewTodayForSubject } from "@/utils/getAllCardsForReview";
import { useRouter } from "next/router";

export default function LearnSubject({ subjects, setSubjects }) {
  const router = useRouter();
  const { id } = router.query;

  const subject = subjects?.find((s) => s.id === id);

  if (!id || !subject || !subject.topics) {
    return <div>Loading...</div>;
  }

  const cardsForReviewToday = getCardsForReviewTodayForSubject(subject);
  console.log(cardsForReviewToday);
  console.log(cardsForReviewToday);
  return (
    <>
      <h1>{subject.id}</h1>
    </>
  );
}
