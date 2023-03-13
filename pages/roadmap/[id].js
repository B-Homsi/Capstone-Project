import { useRouter } from "next/router";
import { useState } from "react";
import { uid } from "uid";
import styled from "styled-components";
import CardForm from "../../components/Form/CardForm";

export default function Topics({ roadmaps, setRoadmaps }) {
  const router = useRouter();
  const { id } = router.query;
  const [showForm, setShowForm] = useState(false);

  const roadmap = roadmaps.find((r) => r.id === id);

  const handleAddCard = (card) => {
    const newCard = { ...card, id: uid() };

    const updatedTopics = roadmap.topics.map((topic) => {
      if (topic.title === card.selectedTopic) {
        return {
          ...topic,
          cards: [...(topic.cards || []), newCard],
        };
      }
      return topic;
    });

    const updatedRoadmaps = roadmaps.map((r) => {
      if (r.id === roadmap.id) {
        return {
          ...r,
          topics: updatedTopics,
        };
      }
      return r;
    });

    setRoadmaps(updatedRoadmaps);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditRoadmap(null);
  };

  // Prevents the popup from closing when clicking inside the form
  const handlePopupContentClick = (event) => {
    event.stopPropagation();
  };

  const handleAddCardClick = () => {
    setShowForm(true);
  };

  return (
    <>
      <Header>{roadmap.title}</Header>
      <TopicsContainer>
        {roadmap.topics.map((topic) => (
          <Topic color={roadmap.color} key={topic.id}>
            {topic.title}
            <br />
            Cards: {topic.cards?.length || 0}
          </Topic>
        ))}
        <StyledAddButton onClick={handleAddCardClick}>Add Card</StyledAddButton>

        {showForm && (
          <PopupOverlay onClick={handleCancel}>
            <CardForm
              onAddCard={handleAddCard}
              onCancel={handleCancel}
              onPopupContentClick={handlePopupContentClick}
              topics={roadmap.topics}
              color={roadmap.color}
            />
          </PopupOverlay>
        )}
      </TopicsContainer>
    </>
  );
}

const Header = styled.h1`
  text-align: center;
`;

const Topic = styled.li` 
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

const TopicsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 0;
`;

const StyledAddButton = styled.button`
  background-color: transparent;
  font-size: 1.5rem;
`;

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
