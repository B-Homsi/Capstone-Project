import SubjectCard from "./SubjectCard";
import Link from "next/link";
import { getCardsForReviewTodayForSubject } from "@/utils/getAllCardsForReview";

export default function SubjectList({
  subjects,
  onDeleteSubject,
  onDeleteSubjectClick,
  onEditSubjectClick,
  openedPopup,
  setOpenedPopup,
  setSubjectToDelete,
  options,
  inLearnPage,
}) {
  return (
    <>
      {inLearnPage &&
        subjects.map((subject) => {
          const cardsForReviewToday = getCardsForReviewTodayForSubject(subject).length;

          return (
            <Link key={subject.id} href={`/learn/${subject.id}`}>
              <SubjectCard
                key={subject.id}
                subject={subject}
                cardsForReviewToday={cardsForReviewToday}

              />
            </Link>
          );
        })}

      {!inLearnPage &&
        subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onDeleteSubject={onDeleteSubject}
            onDeleteSubjectClick={onDeleteSubjectClick}
            setSubjectToDelete={setSubjectToDelete}
            onEditSubjectClick={onEditSubjectClick}
            openedPopup={openedPopup}
            setOpenedPopup={setOpenedPopup}
            options={options}
            inLearnPage={inLearnPage}
          />
        ))}
    </>
  );
}
