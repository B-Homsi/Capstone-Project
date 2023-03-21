import { useState } from "react";
import { useTopic } from "@/hooks/useTopic";
import { useSubjectUpdater } from "@/hooks/useSubjectUpdater";
import styled from "styled-components";
import FlashCardForm from "@/components/Forms/FlashCardForm/FlashCardForm";
import FlashCardList from "@/components/FlashCards/FlashCardList";

export default function Topic({ subjects, setSubjects }) {
  const [showForm, setShowForm] = useState(false);
  const { id, subject, topic } = useTopic(subjects);
  const { addCard, deleteCard } = useSubjectUpdater(subjects, setSubjects);

  if (!id || !subject || !subject.topics) {
    return <div>Loading...</div>;
  }

  const handleAddCardClick = () => {
    setShowForm(true);
  };

  const handleAddCard = (card) => {
    addCard(card, subject.id);
    setShowForm(false);
  };

  const handleDeleteCard = (id) => {
    deleteCard(id);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  // Prevents the popup from closing when clicking inside the form
  const handlePopupContentClick = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <Header>{topic.title}</Header>
      <CardsContainer>
        <FlashCardList
          cards={topic.cards}
          color={subject.color}
          onDeleteCard={handleDeleteCard}
        />
        <StyledAddButton onClick={handleAddCardClick}>Add Card</StyledAddButton>

        {showForm && (
          <FlashCardForm
            onAddCard={handleAddCard}
            onCancel={handleCancel}
            onPopupContentClick={handlePopupContentClick}
            topics={subject.topics}
            color={subject.color}
            insideTopic={topic.title}
          />
        )}
      </CardsContainer>
    </>
  );
}

const Header = styled.h1`
  text-align: center;
`;

const CardsContainer = styled.ul`
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
