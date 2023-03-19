import { useRouter } from "next/router";
import { useState } from "react";
import { uid } from "uid";
import styled from "styled-components";
import CardForm from "@/components/Form/CardForm";
import Link from "next/link";

export default function Topics({ subjects, setSubjects }) {
  const router = useRouter();
  const { id } = router.query;
  const [showForm, setShowForm] = useState(false);

  const subject = subjects.find((r) => r.id === id);

  if (!id || !subject) {
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

  return (
    <>
      <Header>{subject.title}</Header>
      <TopicsContainer>
        {subject.topics.map((topic) => (
          <Topic color={subject.color} key={topic.id}>
            <Link href={`/topic/${topic.id}`}>{topic?.title}</Link>
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
              topics={subject.topics}
              color={subject.color}
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
