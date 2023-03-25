export const updateLastReview = (cards, subjects) => {
  const updatedSubjects = subjects.map((s) => {
    const updatedTopics = s.topics.map((topic) => {
      const updatedCards = topic.cards?.map((card) => {
        if (cards.includes(card.id)) {
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

  return updatedSubjects;
};
