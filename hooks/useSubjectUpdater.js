import { useCallback } from "react";
import { uid } from "uid";

export const useSubjectUpdater = (subjects, setSubjects) => {
  const addCard = useCallback(
    (card, subjectId) => {
      const newCard = { ...card, id: uid() };

      const updatedSubjects = subjects.map((s) => {
        if (s.id === subjectId) {
          const updatedTopics = s.topics.map((topic) => {
            if (topic.title === card.selectedTopic) {
              return {
                ...topic,
                cards: [...(topic.cards || []), newCard],
              };
            }
            return topic;
          });

          return {
            ...s,
            topics: updatedTopics,
          };
        }
        return s;
      });

      setSubjects(updatedSubjects);
    },
    [subjects, setSubjects]
  );

  const deleteCard = useCallback(
    (cardId) => {
      const updatedSubjects = subjects.map((s) => {
        const updatedTopics = s.topics.map((topic) => {
          const shouldRemoveCard = topic.cards?.some(
            (card) => card.id === cardId
          );

          if (shouldRemoveCard) {
            return {
              ...topic,
              cards: topic.cards.filter((card) => card.id !== cardId),
            };
          }
          return topic;
        });

        return { ...s, topics: updatedTopics };
      });

      setSubjects(updatedSubjects);
    },
    [subjects, setSubjects]
  );

  return { addCard, deleteCard };
};
