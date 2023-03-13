import { useState } from "react";
import styled from "styled-components";

export default function CardForm({
  onAddCard,
  onCancel,
  onPopupContentClick,
  topics,
  color,
}) {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleTopicChange = (event) => {
    const value = event.target.value;
    setSelectedTopic(value);
  };

  const handleQuestionChange = (event) => {
    const value = event.target.value;
    setQuestion(value);
  };

  const handleAnswerChange = (event) => {
    const value = event.target.value;
    setAnswer(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddCard({ selectedTopic, question, answer });
  };

  return (
    <PopupContent onClick={onPopupContentClick} color={color}>
      <form onSubmit={handleSubmit}>
        
        <h2>{"Add new Card"}</h2>

        <label htmlFor="topic">Topic</label>
        <select name="topic" id="topic" onChange={handleTopicChange}>
          <option value="default" disabled selected hidden>
            Please select a Topic
          </option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.title}>
              {topic.title}
            </option>
          ))}
        </select>
        <br />
        <br />

        <label htmlFor="question">Question</label>
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
        <br />
        <br />

        <button type="submit">Add</button>
        <button type="button" onClick={onCancel}>
          X
        </button>
      </form>
    </PopupContent>
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
