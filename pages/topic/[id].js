import { useRouter } from "next/router";
import { useState } from "react";
import { uid } from "uid";
import styled from "styled-components";
import Card from "@/components/FlashCards/Card";
import CardForm from "@/components/Form/CardForm";

export default function Topic({ subjects, setSubjects }) {
  const router = useRouter();
  const { id } = router.query;
  const [showForm, setShowForm] = useState(false);

  const subject = subjects?.find((s) => s.topics.some((t) => t.id === id));
  const topic = subject?.topics.find((t) => t.id === id);

  if (!id || !subject || !subject.topics) {
    return <div>Loading...</div>;
  }

  const handleAddCard = (card) => {
    const newCard = { ...card, id: uid() };

    const updatedTopics = subject.topics.map((topic) => {
      if (topic.title === card.selectedTopic) {
        return {
          ...topic,
          cards: [...(topic.cards || []), newCard],
        };
      }
      return topic;
    });

    const updatedSubjects = subjects.map((s) => {
      if (s.id === subject.id) {
        return {
          ...s,
          topics: updatedTopics,
        };
      }
      return s;
    });

    setSubjects(updatedSubjects);
    setShowForm(false);
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

  const handleDeleteCard = (id) => {
    const updatedSubjects = subjects.map((s) => {
      const updatedTopics = s.topics.map((topic) => {
        const shouldRemoveCard = topic.cards?.some((card) => card.id === id);

        if (shouldRemoveCard) {
          return {
            ...topic,
            cards: topic.cards.filter((card) => card.id !== id),
          };
        }
        return topic;
      });

      return { ...s, topics: updatedTopics };
    });

    setSubjects(updatedSubjects);
  };

  return (
    <>
      <Header>{topic.title}</Header>
      <CardsContainer>
        {topic.cards?.map((card) => (
          <Card
            key={card.id}
            card={card}
            color={subject.color}
            onDeleteCard={handleDeleteCard}
          />
        ))}

        <StyledAddButton onClick={handleAddCardClick}>Add Card</StyledAddButton>

        {showForm && (
          <PopupOverlay onClick={handleCancel}>
            <CardForm
              onAddCard={handleAddCard}
              onCancel={handleCancel}
              onPopupContentClick={handlePopupContentClick}
              topics={subject.topics}
              color={subject.color}
              insideTopic={topic.title}
            />
          </PopupOverlay>
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
