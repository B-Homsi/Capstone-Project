import { useState } from "react";
import styled from "styled-components";
import PopupWindow from "@/components/PopupWindow";
import ErrorMessage from "../ErrorMessage";

export default function FlashCardForm({
  onAddCard,
  onCancel,
  onPopupContentClick,
  topics,
  color,
  insideTopic,
}) {
  const [selectedTopic, setSelectedTopic] = useState(
    insideTopic ? insideTopic : ""
  );
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionError, setQuestionError] = useState(false);
  const [answerError, setAnswerError] = useState(false);

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (question.trim() === "") {
      setQuestionError(true);
      return;
    }
    if (answer.trim() === "") {
      setAnswerError(true);
      return;
    }

    onAddCard({ selectedTopic, question, answer });
  };

  return (
    <PopupWindow
      color={color}
      onCancel={onCancel}
      onContentClick={onPopupContentClick}
    >
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={onCancel}>
          X
        </button>
        <button type="submit">Add</button>

        <h2>{"Add new Card"}</h2>

        <label htmlFor="topic">Topic</label>
        <select
          name="topic"
          id="topic"
          onChange={handleTopicChange}
          value={selectedTopic}
          required
        >
          {!insideTopic && (
            <option value="" disabled hidden>
              Please select a Topic
            </option>
          )}
          {topics.map((topic) => (
            <option key={topic.id} value={topic.title}>
              {topic.title}
            </option>
          ))}
        </select>

        <label htmlFor="question">Question</label>
        {questionError && (
          <ErrorMessage>Please enter a valid question!</ErrorMessage>
        )}
        <textarea
          name="question"
          rows="6"
          cols="32"
          maxLength="100"
          placeholder="Write down a question"
          value={question}
          onChange={(event) => handleQuestionChange(event)}
          required
        ></textarea>

        <label htmlFor="answer">Answer</label>
        {answerError && (
          <ErrorMessage>Please enter a valid answer!</ErrorMessage>
        )}
        <textarea
          name="answer"
          rows="6"
          cols="32"
          maxLength="100"
          placeholder="Write down the answer"
          value={answer}
          onChange={(event) => handleAnswerChange(event)}
          required
        ></textarea>
      </form>
    </PopupWindow>
  );
}

const PopupContent = styled.div`
  background: ${(props) => props.color};
  padding: 20px;
  overflow: scroll;
  max-height: 80%;
  max-width: 80%;
  border-radius: 20px;
`;
