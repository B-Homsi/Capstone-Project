import { uid } from "uid";

export const useSubjectUpdater = (subjects, setSubjects) => {
  const addCard = (card, subjectId) => {
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
  };

  const deleteCard = (cardId) => {
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
  };

  return { addCard, deleteCard };
};
