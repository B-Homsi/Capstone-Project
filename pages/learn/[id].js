import { getCardsForReviewTodayForSubject } from "@/utils/getAllCardsForReview";
import { useRouter } from "next/router";
import { useState } from "react";
import FlashCard from "@/components/FlashCards/FlashCard";
import styled from "styled-components";

export default function LearnSubject({ subjects, setSubjects }) {
  const router = useRouter();
  const { id } = router.query;
  const subject = subjects?.find((s) => s.id === id);
  console.log(subject);
  const cardsForReviewToday = getCardsForReviewTodayForSubject(subject);
  console.log(cardsForReviewToday);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const [correctCardIds, setCorrectCardIds] = useState([]);

  const [showResultScreen, setShowResultScreen] = useState(false);

  if (!id || !subject || !subject.topics) {
    return <div>Loading...</div>;
  }

  

  const handlePreviousClick = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleSkipClick = () => {
    if (currentCardIndex < cardsForReviewToday.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const reviewCard = (cardId) => {
    const updatedSubjects = subjects.map((s) => {
      const updatedTopics = s.topics.map((topic) => {
        const updatedCards = topic.cards?.map((card) => {
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

  const handleCorrectClick = () => {
    const cardId = cardsForReviewToday[currentCardIndex].id;
    setCorrectCardIds([...correctCardIds, cardId]);
    if (currentCardIndex < cardsForReviewToday.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handleIncorrectClick = () => {
    handleSkipClick();
  };

  const handleDoneClick = () => {
    setShowResultScreen(true);

    setTimeout(() => {
      correctCardIds.forEach((cardId) => {
        reviewCard(cardId);
      });

      setTimeout(() => {
        router.push("/learn");
      }, 3000);
    }, 1000);
  };

  const isLastCard = currentCardIndex === cardsForReviewToday.length - 1;

  const totalCards = cardsForReviewToday.length;
  const progressPercentage = Math.round(
    ((currentCardIndex + 1) / totalCards) * 100
  );

  return (
    <>
      <h1>{subject.title}</h1>
      <ProgressBarContainer>
        <ProgressBarFill percentage={progressPercentage} />
        <ProgressText>
          {currentCardIndex + 1} / {totalCards}
        </ProgressText>
      </ProgressBarContainer>
      {cardsForReviewToday.length > 0 && (
        <>
          <button onClick={handlePreviousClick}>Previous</button>
          {isLastCard ? (
            <button onClick={handleDoneClick}>Done</button>
          ) : (
            <button onClick={handleSkipClick}>Skip</button>
          )}
          {cardsForReviewToday[currentCardIndex] && (
            <FlashCard card={cardsForReviewToday[currentCardIndex]} />
          )}
          <button onClick={handleIncorrectClick}>Incorrect</button>
          <button onClick={handleCorrectClick}>Correct</button>
        </>
      )}
    </>
  );
}

const ProgressBarContainer = styled.div`
  background-color: #f3f3f3;
  border-radius: 5px;
  position: relative;
  height: 30px;
  width: 100%;
`;

const ProgressBarFill = styled.div`
  background-color: #4caf50;
  border-radius: 5px;
  position: absolute;
  height: 100%;
  width: ${(props) => props.percentage}%;
`;

const ProgressText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
`;

const AnimatedProgressBarContainer = styled(ProgressBarContainer)`
  position: ${(props) => (props.showResultScreen ? "fixed" : "relative")};
  top: ${(props) => (props.showResultScreen ? "50%" : "auto")};
  left: ${(props) => (props.showResultScreen ? "50%" : "auto")};
  transform: ${(props) =>
    props.showResultScreen ? "translate(-50%, -50%)" : "none"};
  transition: top 1s ease, left 1s ease, transform 1s ease;
`;

const ResultScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.showResultScreen ? "1" : "0")};
  visibility: ${(props) => (props.showResultScreen ? "visible" : "hidden")};
  transition: opacity 1s ease, visibility 1s ease;
`;
