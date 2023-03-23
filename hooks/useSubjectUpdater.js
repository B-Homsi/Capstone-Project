import { uid } from "uid";

export const useSubjectUpdater = (subjects, setSubjects) => {
  const addCard = (cards, subjectId, selectedTopic) => {
    const updatedSubjects = subjects.map((s) => {
      if (s.id === subjectId) {
        const updatedTopics = s.topics.map((topic) => {
          if (topic.title === selectedTopic) {
            const newCards = cards.map((card) => ({
              ...card,
              id: uid(),
              lastReviewed: null,
              stage: 0,
            }));
            return {
              ...topic,
              cards: [...(topic.cards || []), ...newCards],
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
