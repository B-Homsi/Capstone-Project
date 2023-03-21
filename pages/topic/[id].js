import { useRouter } from "next/router";
import { useState } from "react";
import { uid } from "uid";
import styled from "styled-components";
import Card from "@/components/FlashCards/Card";
import CardForm from "@/components/Form/CardForm";
import { useTopic } from "@/hooks/useTopic";
import { useSubjectUpdater } from "@/hooks/useSubjectUpdater";
import { CardList } from "@/components/FlashCards/CardList";

export default function Topic({ subjects, setSubjects }) {
  const [showForm, setShowForm] = useState(false);
  const { id, subject, topic } = useTopic(subjects);
  const { addCard, deleteCard } = useSubjectUpdater(subjects, setSubjects);

  if (!id || !subject || !subject.topics) {
    return <div>Loading...</div>;
  }

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

  const handleAddCardClick = () => {
    setShowForm(true);
  };

  return (
    <>
      <Header>{topic.title}</Header>
      <CardsContainer>
        <CardList
          cards={topic.cards}
          color={subject.color}
          onDeleteCard={handleDeleteCard}
        />

        <StyledAddButton onClick={handleAddCardClick}>Add Card</StyledAddButton>

        {showForm && (
          <CardForm
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