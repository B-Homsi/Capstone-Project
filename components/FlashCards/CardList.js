import Card from "./Card";

export function CardList({ cards, color, onDeleteCard }) {
  return (
    <>
      {cards?.map((card) => (
        <Card
          key={card.id}
          card={card}
          color={color}
          onDeleteCard={onDeleteCard}
        />
      ))}
    </>
  );
}
