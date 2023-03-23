export const reviewCard = (cardId) => {
  const updatedSubjects = subjects.map((s) => {
    const updatedTopics = s.topics.map((topic) => {
      const updatedCards = topic.cards.map((card) => {
        if (card.id === cardId) {
          return {
            ...card,
            stage: card.stage + 1,
            lastReviewed: new Date().toISOString(),
          };
        }
        return card;
      });
      return { ...topic, cards: updatedCards };
    });
    return { ...s, topics: updatedTopics };
  });

  setSubjects(updatedSubjects);
};
