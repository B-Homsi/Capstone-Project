import SubjectCard from "./SubjectCard";
import Link from "next/link";
import { getCardsForReviewSubject } from "@/utils/getCardsForReviewSubject";
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
          const cardsForReviewToday = getCardsForReviewSubject(subject);
          return (
            <StyledLink key={subject.id} href={`/learn/${subject.id}`}>
              <SubjectCard
                key={subject.id}
                subject={subject}
                cardsForReviewToday={cardsForReviewToday}
                inLearnPage={inLearnPage}
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
          />
        ))}
    </>
  );
}

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
