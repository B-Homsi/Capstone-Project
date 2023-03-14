import { useState } from "react";
import { uid } from "uid";
import styled from "styled-components";
import RoadmapForm from "../Form/RoadmapForm";
import RoadmapCard from "./RoadmapCard";

export default function Roadmaps({ roadmaps, setRoadmaps }) {
  const [showForm, setShowForm] = useState(false);
  const [editRoadmap, setEditRoadmap] = useState(null);

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
    setEditRoadmap(null);
  };

  const handleDeleteRoadmapClick = (id) => {
    const newRoadmaps = roadmaps.filter((roadmap) => roadmap.id !== id);
    setRoadmaps(newRoadmaps);
  };

  // Prevents the popup from closing when clicking inside the form
  const handlePopupContentClick = (event) => {
    event.stopPropagation();
  };

  const handleEditRoadmapClick = (roadmap) => {
    setShowForm(true);
    setEditRoadmap(roadmap);
  };

  const handleEditRoadmap = (editedRoadmap) => {
    const newRoadmaps = roadmaps.map((roadmap) =>
      roadmap.id === editedRoadmap.id ? editedRoadmap : roadmap
    );
    setRoadmaps(newRoadmaps);
    setShowForm(false);
    setEditRoadmap(null);
  };

  return (
    <RoadmapsContainer>
      {roadmaps.map((roadmap) => (
        <RoadmapCard
          key={roadmap.id}
          roadmap={roadmap}
          onDeleteRoadmapClick={handleDeleteRoadmapClick}
          onEditRoadmapClick={handleEditRoadmapClick}
        />
      ))}

      <StyledAddButton onClick={handleAddRoadmapClick}>
        Add Roadmap
      </StyledAddButton>

      {showForm && (
        <PopupOverlay onClick={handleCancel}>
          <RoadmapForm
            onPopupContentClick={handlePopupContentClick}
            onAddRoadmap={handleAddRoadmap}
            onEditRoadmap={handleEditRoadmap}
            onCancel={handleCancel}
            editRoadmap={editRoadmap}
          />
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
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
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
