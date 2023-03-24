import { useState } from "react";
import styled, { css } from "styled-components";

export default function FlashCard({
  card,
  color,
  onDeleteCard,
  showDeleteButton,
}) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleToggleAnswerClick = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <CardWrapper onClick={handleToggleAnswerClick}>
      <StyledCard color={color} showAnswer={showAnswer}>
        {showDeleteButton && (
          <StyledDeleteButton onClick={() => onDeleteCard(card.id)}>
            X
          </StyledDeleteButton>
        )}
        {!showAnswer && <p>{card.question}</p>}
        {showAnswer && <CardContent isAnswer={true}>{card.answer}</CardContent>}
      </StyledCard>
    </CardWrapper>
  );
}

const CardContent = styled.p`
  ${(props) =>
    props.isAnswer &&
    css`
      transform: rotateY(180deg);
    `}
`;

const StyledDeleteButton = styled.button`
  align-self: flex-end;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
`;

const CardWrapper = styled.li`
  list-style: none;
  perspective: 1000px;
  width: 100%;
  margin: 10px;
`;

const StyledCard = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 20px;
  margin: 10px;
  border: 1px solid black;
  width: 80%;
  border-radius: 5px;
  transition: transform 0.6s;
;
  ${(props) =>
    props.showAnswer &&
    css`
      transform: rotateY(180deg);
    `}
  background-color: ${(props) => props.color};'
`;
