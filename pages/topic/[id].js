import { useTopic } from "@/hooks/useTopic";
import { useSubjectUpdater } from "@/hooks/useSubjectUpdater";
import styled from "styled-components";
import FlashCardForm from "@/components/Forms/FlashCardForm/FlashCardForm";
import FlashCardList from "@/components/FlashCards/FlashCardList";
import Header from "@/components/Header/Header";

export default function Topic({
  subjects,
  setSubjects,
  showForm,
  setShowForm,
}) {
  const { id, subject, topic } = useTopic(subjects);
  const { addCard, deleteCard } = useSubjectUpdater(subjects, setSubjects);

  if (!id || !subject || !subject.topics) {
    return <div>Loading...</div>;
  }

  const handleAddCard = (cards) => {
    addCard(cards, subject.id, topic.title);
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

        {showForm && (
          <FlashCardForm
            onAddCard={handleAddCard}
            onCancel={handleCancel}
            onPopupContentClick={handlePopupContentClick}
            topics={subject.topics}
            color={subject.color}
            selectedTopic={topic.title}
          />
        )}
      </CardsContainer>
    </>
  );
}

const CardsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 0;
`;
