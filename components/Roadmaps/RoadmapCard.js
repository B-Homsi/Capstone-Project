import { useState } from "react";
import styled from "styled-components";

export default function RoadmapCard({
  roadmap,
  onDeleteRoadmapClick,
  onEditRoadmapClick,
}) {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetailsClick = () => {
    setShowDetails(!showDetails);
  };

  const handleEditRoadmapClick = () => {
    onEditRoadmapClick(roadmap);
  };

  return (
    <CardContainer color={roadmap.color}>
      <StyledDeleteButton onClick={() => onDeleteRoadmapClick(roadmap.id)}>
        X
      </StyledDeleteButton>
      <button onClick={handleToggleDetailsClick}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      <button onClick={handleEditRoadmapClick}>Edit</button>
      <h2>{roadmap.title}</h2>
      {showDetails && (
        <StyledList>
          {roadmap.topics.map((topic) => (
            <StyledTopic key={topic.id}>{topic.title}</StyledTopic>
          ))}
        </StyledList>
      )}
    </CardContainer>
  );
}

const StyledDeleteButton = styled.button`
  align-self: flex-end;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
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
  text-align: left;
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
