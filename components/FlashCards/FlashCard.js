import { useState, useEffect } from "react";
import styled, { css } from "styled-components";

export default function FlashCard({
  card,
  color,
  onDeleteCard,
  showDeleteButton,
}) {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setShowAnswer(false);
  }, [card]);

  const handleToggleAnswerClick = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <CardWrapper>
      {showDeleteButton && (
        <StyledDeleteButton
          onClick={(e) => {
            e.stopPropagation();
            onDeleteCard(card.id);
          }}
        >
          X
        </StyledDeleteButton>
      )}
      <Card onClick={handleToggleAnswerClick}>
        <StyledCard color={color} showAnswer={showAnswer}>
          <CardContent>
            <p>{card.question}</p>
          </CardContent>
          <CardContent backFace>
            <p>{card.answer}</p>
          </CardContent>
        </StyledCard>
      </Card>
    </CardWrapper>
  );
}

const CardWrapper = styled.li`
  list-style: none;
  perspective: 1000px;
  width: 80%;
  margin: 10px;
  position: relative;
  height: 200px;
`;

const Card = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const StyledCard = styled.div`
  position: relative;
  height: 100%;
  background-color: ${(props) => props.color};
  border: 1px solid black;
  border-radius: 5px;
  transition: transform 0.4s;
  transform-style: preserve-3d;
  ${(props) =>
    props.showAnswer &&
    css`
      transform: rotateX(180deg);
    `}
`;

const CardContent = styled.div`
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  border-radius: 5px;
  ${(props) =>
    props.backFace &&
    css`
      transform: rotateX(180deg);
    `}
`;

const StyledDeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  z-index: 1;
  opacity: 1;
  ${(props) =>
    props.hide &&
    css`
      opacity: 0;
    `}
`;
