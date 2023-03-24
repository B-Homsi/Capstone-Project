import SubjectCard from "./SubjectCard";
import Link from "next/link";
import { getCardsForReviewTodayForSubject } from "@/utils/getAllCardsForReview";
import styled from "styled-components";

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
          const cardsForReviewToday =
            getCardsForReviewTodayForSubject(subject);

          return (
            <StyledLink key={subject.id} href={`/learn/${subject.id}`}>
              <SubjectCard
                key={subject.id}
                subject={subject}
                cardsForReviewToday={cardsForReviewToday}
              />
            </StyledLink>
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

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  width: 80%;
`;
