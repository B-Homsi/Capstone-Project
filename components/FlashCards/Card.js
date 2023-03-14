import { useState } from "react";
import styled from "styled-components";

export default function Card({ card, color }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleToggleAnswerClick = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <StyledCard color={color}>
      <p>{card.question}</p>
      <StyledToggleButton onClick={handleToggleAnswerClick}>
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </StyledToggleButton>
      {showAnswer && <p>{card.answer}</p>}
    </StyledCard>
  );
}

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
