import { useRouter } from "next/router";
import { useState } from "react";
import { getCardsForReviewSubject } from "@/utils/getCardsForReviewSubject";
import { updateLastReview } from "@/utils/updateLastReview";
import FlashCard from "@/components/FlashCards/FlashCard";
import styled from "styled-components";
import Header from "@/components/Header/Header";

export default function LearnSubject({ subjects, setSubjects }) {
  const router = useRouter();
  const { id } = router.query;
  const subject = subjects?.find((s) => s.id === id);

  const [showResultScreen, setShowResultScreen] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [correctCardIds, setCorrectCardIds] = useState([]);
  const cardsForReviewToday = getCardsForReviewSubject(subject);
  const totalCards = cardsForReviewToday.length;
  const isLastCard = currentCardIndex === cardsForReviewToday.length - 1;
  const correctCardCount = correctCardIds.length;
  const incorrectCardCount = cardsForReviewToday.length - correctCardIds.length;
  const correctPercentage = Math.round((correctCardCount / totalCards) * 100);
  const progressPercentage = Math.round(
    ((currentCardIndex + 1) / totalCards) * 100
  );

  if (!id || !subject || !subject.topics) {
    return <div>Loading...</div>;
  }
  if (cardsForReviewToday.length === 0) {
    return <div>No cards for review today</div>;
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

  const handleIncorrectClick = () => {
    handleSkipClick();
  };

  const handleCorrectClick = () => {
    const cardId = cardsForReviewToday[currentCardIndex].id;
    setCorrectCardIds([...correctCardIds, cardId]);
    if (currentCardIndex < cardsForReviewToday.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handleDoneClick = () => {
    setShowResultScreen(true);
    setTimeout(() => {
      const updatedSubjects = updateLastReview(correctCardIds, subjects);
      setSubjects(updatedSubjects);
      router.push("/learn");
    }, 4000);
  };

  const getMotivationalMessage = (percentage) => {
    if (percentage >= 80) {
      return "Great job! Keep up the good work!";
    } else if (percentage >= 50) {
      return "Not bad! Keep practicing to improve!";
    } else {
      return "Don't worry! Keep studying and you'll get better!";
    }
  };

  return (
    <>
      <Header>{subject.title}</Header>
      <AnimatedProgressBarContainer showResultScreen={showResultScreen}>
        <ProgressBarFill percentage={progressPercentage} />
        <IncorrectProgressBarFill
          percentage={showResultScreen ? 100 - correctPercentage : 0}
          marginLeftPercentage={correctPercentage}
        />
        <ProgressText>
          {showResultScreen
            ? `${correctCardCount} / ${totalCards}`
            : `${currentCardIndex + 1} / ${totalCards}`}
        </ProgressText>
      </AnimatedProgressBarContainer>
      {!showResultScreen && cardsForReviewToday.length > 0 && (
        <Main>
          <StyledButtonContainer>
            <StyledPreviousButton
              onClick={handlePreviousClick}
              disabled={currentCardIndex === 0 ? true : false}
            >
              PREVIOUS
            </StyledPreviousButton>
            {isLastCard ? (
              <StyledDoneButton onClick={handleDoneClick}>
                DONE
              </StyledDoneButton>
            ) : (
              <StyledSkipButton onClick={handleSkipClick}>
                SKIP
              </StyledSkipButton>
            )}
          </StyledButtonContainer>
          {cardsForReviewToday[currentCardIndex] && (
            <FlashCard
              card={cardsForReviewToday[currentCardIndex]}
              color={subject.color}
            />
          )}
          <StyledCorrectButton onClick={handleCorrectClick}>
            <StyledText>CORRECT</StyledText>
          </StyledCorrectButton>
          <StyledIncorrectButton onClick={handleIncorrectClick}>
            <StyledText>INCORRECT</StyledText>
          </StyledIncorrectButton>
        </Main>
      )}
      <ResultScreen showResultScreen={showResultScreen}>
        <StyledH3>{getMotivationalMessage(correctPercentage)}</StyledH3>
        <ResultsConainer>
          <StyledH2>Results</StyledH2>
          <StyledResultText>
            Correct: {correctCardCount} ({correctPercentage}%)
          </StyledResultText>
          <StyledResultText>
            Incorrect: {incorrectCardCount} ({100 - correctPercentage}%)
          </StyledResultText>
        </ResultsConainer>
      </ResultScreen>
    </>
  );
}

const StyledH2 = styled.h2`
  text-shadow: 1px 1px 8px #000;
`;

const StyledH3 = styled.h3`
  text-shadow: 1px 1px 8px #000;
  margin: 0 20px 120px 20px;
  text-align: center;
`;

const StyledResultText = styled.p`
  margin: 0;
  text-shadow: 1px 1px 8px #000;
`;

const ResultsConainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ResultScreen = styled.div`
  position: fixed;
  color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.showResultScreen ? "1" : "0")};
  visibility: ${(props) => (props.showResultScreen ? "visible" : "hidden")};
  transition: opacity 2s ease, visibility 2s ease;
`;

const StyledText = styled.p`
  text-shadow: 1px 1px 8px #000;
  margin: 0;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledPreviousButton = styled.button`
  width: 100px;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 12px;
  font-weight: 600;
  shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);

  &:active {
    opacity: 0.6;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const StyledSkipButton = styled.button`
  width: 80px;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 12px;
  font-weight: 600;
  shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);

  &:active {
    opacity: 0.6;
  }
`;

const StyledDoneButton = styled.button`
  width: 80px;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 12px;
  font-weight: 600;
  shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);

  &:active {
    opacity: 0.6;
  }
`;

const StyledCorrectButton = styled.button`
  margin: 20px 0;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 12px;
  font-weight: 600;
  shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);

  &:active {
    opacity: 0.6;
  }
`;

const StyledIncorrectButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 12px;
  font-weight: 600;
  shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.9);

  &:active {
    opacity: 0.6;
  }
`;

const Main = styled.main`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProgressBarContainer = styled.div`
  background-color: #f3f3f3;
  border-radius: 5px;
  position: relative;
  height: 30px;
  width: 100%;
`;

const AnimatedProgressBarContainer = styled(ProgressBarContainer)`
  position: ${(props) => (props.showResultScreen ? "fixed" : "relative")};
  top: ${(props) => (props.showResultScreen ? "20%" : "auto")};
  left: ${(props) => (props.showResultScreen ? "0" : "auto")};
  transform: ${(props) =>
    props.showResultScreen ? "translateY(550%)" : "none"};
  transition: top 2s ease, left 2s ease, transform 2s ease;
`;

const ProgressText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
`;

const ProgressBarFill = styled.div`
  background-color: #4caf50;
  border-radius: 5px;
  position: absolute;
  height: 100%;
  width: ${(props) => props.percentage}%;
`;

const IncorrectProgressBarFill = styled.div`
  background-color: #f44336; // red color
  border-radius: 5px;
  position: absolute;
  height: 100%;
  width: ${(props) => props.percentage}%;
  margin-left: ${(props) => props.marginLeftPercentage}%;
`;
