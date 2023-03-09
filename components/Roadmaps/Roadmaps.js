import { useState } from "react";
import RoadmapForm from "../Form/RoadmapForm";
import styled from "styled-components";
import { uid } from "uid";
import RoadmapCard from "./RoadmapCard";

export default function Roadmaps() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddRoadmap = (roadmap) => {
    const newRoadmap = { ...roadmap, id: uid() };
    setRoadmaps([...roadmaps, newRoadmap]);
    setShowForm(false);
  };

  const handleAddRoadmapClick = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleDeleteRoadmapClick = (id) => {
    const newRoadmaps = roadmaps.filter((roadmap) => roadmap.id !== id);
    setRoadmaps(newRoadmaps);
  };

  // Prevents the popup from closing when clicking inside the form
  const handlePopupContentClick = (event) => {
    event.stopPropagation();
  };

  return (
    <RoadmapsContainer>
      {roadmaps.map((roadmap) => (
        <RoadmapCard
          key={roadmap.id}
          roadmap={roadmap}
          onDeleteRoadmapClick={handleDeleteRoadmapClick}
        />
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

const RoadmapsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
