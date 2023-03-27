import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import OptionsPopup from "./OptionsPopup";

export default function SubjectCard({
  subject,
  onDeleteSubjectClick,
  onEditSubjectClick,
  openedPopup,
  setOpenedPopup,
  options,
  cardsForReviewToday,
  inLearnPage,
}) {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetailsClick = () => {
    if (openedPopup) return;
    setShowDetails(!showDetails);
  };

  const handleTogglePopup = (event) => {
    event.stopPropagation();
    setOpenedPopup((prevOpenedPopup) =>
      prevOpenedPopup === subject.id ? null : subject.id
    );
  };

  const handleEditSubjectClick = (event) => {
    event.stopPropagation();
    onEditSubjectClick(subject);
  };

  const handleDeleteSubjectClick = (event) => {
    event.stopPropagation();
    onDeleteSubjectClick(subject.id);
  };

  const handleTopicLinkClick = (event) => {
    event.stopPropagation();
  };

  return (
    <CardContainer
      color={subject.color}
      onClick={inLearnPage ? null : handleToggleDetailsClick}
    >
      {options && (
        <OptionsWrapper>
          <StyledOptionButton onClick={handleTogglePopup}>
            ℹ️
          </StyledOptionButton>

          {openedPopup === subject.id && (
            <OptionsPopup
              onEdit={handleEditSubjectClick}
              onDelete={handleDeleteSubjectClick}
            />
          )}
        </OptionsWrapper>
      )}

      <h2>{subject.title}</h2>
      {cardsForReviewToday && (
        <p>Cards for review today: {cardsForReviewToday.length}</p>
      )}

      {showDetails && (
        <StyledList>
          {subject.topics.map((topic) => (
            <StyledLink
              key={topic.id}
              href={`/topic/${topic.id}`}
              onClick={handleTopicLinkClick}
            >
              <StyledTopic>
                {topic?.title} <p>Cards: {topic.cards?.length || 0}</p>
              </StyledTopic>
            </StyledLink>
          ))}
        </StyledList>
      )}
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 10px;
  border: 2px solid black;
  width: 80%;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 0.9);
  background-color: ${(props) => props.color};
`;

const OptionsWrapper = styled.div`
  position: relative;
  align-self: flex-end;
`;

const StyledOptionButton = styled.button``;

const StyledList = styled.ol`
  width: 90%;
  display: flex;
  align-items: left;
  flex-direction: column;
  list-style-position: inside;
  padding-left: 0;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const StyledTopic = styled.li`
  padding: 15px 10px;
  margin: 5px;
  text-align: center;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #f5f5f5;
  padding: 5px;
`;
