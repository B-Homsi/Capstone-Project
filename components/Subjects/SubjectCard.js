import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Popup from "./Popup";

export default function SubjectCard({
  subject,
  onDeleteSubjectClick,
  onEditSubjectClick,
  openedPopup,
  setOpenedPopup,
}) {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetailsClick = () => {
    if (openedPopup) return;
    setShowDetails(!showDetails);
  };

  const handleEditSubjectClick = (event) => {
    event.stopPropagation();
    onEditSubjectClick(subject);
  };

  const handleDeleteSubjectClick = (event) => {
    event.stopPropagation();
    onDeleteSubjectClick(subject.id);
  };

  const handleTogglePopup = (event) => {
    event.stopPropagation();
    setOpenedPopup((prevOpenedPopup) =>
      prevOpenedPopup === subject.id ? null : subject.id
    );
  };

  return (
    <CardContainer color={subject.color} onClick={handleToggleDetailsClick}>
      <OptionsWrapper>
        <StyledOptionButton onClick={handleTogglePopup}>
          Options
        </StyledOptionButton>
        {openedPopup === subject.id && (
          <Popup
            onEdit={handleEditSubjectClick}
            onDelete={handleDeleteSubjectClick}
          />
        )}
      </OptionsWrapper>

      <h2>{subject.title}</h2>

      {showDetails && (
        <StyledList>
          {subject.topics.map((topic) => (
            <StyledLink key={topic.id} href={`/topic/${topic.id}`}>
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

const OptionsWrapper = styled.div`
  position: relative;
  align-self: flex-end;
`;

const CardContainer = styled.div` 
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 10px;
  border: 2px solid black;
  width: 80%;
  border-radius: 20px;
  background-color: ${(props) => props.color};'
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

const StyledList = styled.ol`
  width: 90%;
  display: flex;
  align-items: left;
  flex-direction: column;
  list-style-position: inside;
  padding-left: 0;
`;

const StyledOptionButton = styled.button`

`;

const StyledLink = styled(Link)`
  text-decoration: none;`;