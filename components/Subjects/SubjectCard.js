import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import OptionsPopup from "./OptionsPopup";
import Options from "./options.svg";

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
            <Options />
          </StyledOptionButton>

          {openedPopup === subject.id && (
            <OptionsPopup
              onEdit={handleEditSubjectClick}
              onDelete={handleDeleteSubjectClick}
            />
          )}
        </OptionsWrapper>
      )}

      <StyledTitle>{subject.title}</StyledTitle>
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
                {topic?.title}{" "}
                <StyledText>Cards: {topic.cards?.length || 0}</StyledText>
              </StyledTopic>
            </StyledLink>
          ))}
        </StyledList>
      )}
    </CardContainer>
  );
}

const StyledText = styled.p`
  margin: 5px 0;
`;

const StyledTitle = styled.h2``;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 10px;
  border: 2px solid black;
  width: 80%;
  border-radius: 5px;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.9), 1px 1px 3px rgba(0, 0, 0, 0.9);
  background-color: ${(props) => props.color};
`;

const OptionsWrapper = styled.div`
  position: relative;
  align-self: flex-end;
`;

const StyledOptionButton = styled.button`
  border: none;
  background-color: transparent;
  top: 0px;
  right: 0px;
`;

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
  margin: 5px;
  text-align: center;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #f5f5f5;
  padding: 5px;
`;
