import FlashCard from "./FlashCard";

export default function FlashCardList({ cards, color, onDeleteCard }) {
  return (
    <>
      {cards?.map((card) => (
        <FlashCard
          key={card.id}
          card={card}
          color={color}
          onDeleteCard={onDeleteCard}
          showDeleteButton
        />
      ))}
    </>
  );
}
