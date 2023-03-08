import { useState } from "react";
import RoadmapForm from "../Form/RoadmapForm";
import styled from "styled-components";
import { uid } from "uid";

export default function Roadmaps() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddRoadmap = (roadmap) => {
    setRoadmaps([...roadmaps, roadmap]);
    setShowForm(false);
  };

  const handleAddRoadmapClick = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleDeleteRoadmapClick = (index) => {
    const newRoadmaps = [...roadmaps];
    newRoadmaps.splice(index, 1);
    setRoadmaps(newRoadmaps);
  };

  // Prevents the popup from closing when clicking inside the form
  const handlePopupContentClick = (event) => {
    event.stopPropagation();
  };

  return (
    <RoadmapsContainer>
      {roadmaps.map((roadmap, index) => (
        <RoadmapCard key={uid()} color={roadmap.color}>
          <StyledDeleteButton onClick={() => handleDeleteRoadmapClick(index)}>
            X
          </StyledDeleteButton>
          <h2>{roadmap.title}</h2>
          <StyledList>
            {roadmap.topics.map((topic, index) => (
              <StyledTopic key={index}>{topic}</StyledTopic>
            ))}
          </StyledList>
        </RoadmapCard>
      ))}
      <StyledNav>
        <StyledAddButton onClick={handleAddRoadmapClick}>
          Add Roadmap
        </StyledAddButton>
      </StyledNav>

      {showForm && (
        <PopupOverlay onClick={handleCancel}>
          <PopupContent onClick={handlePopupContentClick}>
            <RoadmapForm
              onAddRoadmap={handleAddRoadmap}
              onCancel={handleCancel}
            />
          </PopupContent>
        </PopupOverlay>
      )}
    </RoadmapsContainer>
  );
}

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background: #f5f5f5;
  padding: 20px;
  overflow: scroll;
  max-height: 80%;
  max-width: 80%;
  border-radius: 20px;
`;

const RoadmapCard = styled.div` 
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

const RoadmapsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const StyledDeleteButton = styled.button`
  align-self: flex-end;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
`;

const StyledAddButton = styled.button`
  background-color: transparent;
  font-size: 1.5rem;
`;

const StyledNav = styled.nav`
  display: flex;
  position: fixed;
  bottom: 0px;
  height: 50px;
  justify-content: center;
  background-color: #f5f5f5;
  width: 100%;
  z-index: 1;
`;
