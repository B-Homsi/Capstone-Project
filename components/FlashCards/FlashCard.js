import { useState } from "react";
import styled from "styled-components";

export default function FlashCard({ card, color, onDeleteCard }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleToggleAnswerClick = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <StyledCard color={color}>
      <StyledDeleteButton onClick={() => onDeleteCard(card.id)}>
        X
      </StyledDeleteButton>
      <p>{card.question}</p>
      <StyledToggleButton onClick={handleToggleAnswerClick}>
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </StyledToggleButton>
      {showAnswer && <p>{card.answer}</p>}
    </StyledCard>
  );
}

const StyledDeleteButton = styled.button`
  align-self: flex-end;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
`;

const StyledToggleButton = styled.button`
  background-color: #f5f5f5;
  font-size: 1.5rem;
`;

const StyledCard = styled.li` 
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
