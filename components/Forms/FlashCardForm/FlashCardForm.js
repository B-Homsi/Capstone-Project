import { useState, useRef, useEffect } from "react";
import PopupWindow from "@/components/PopupWindow";
import ErrorMessage from "../ErrorMessage";
import styled from "styled-components";
import Add from "../add.svg";
import Back from "../back.svg";
import Submit from "../submit.svg";
import Delete from "../delete.svg";

export default function FlashCardForm({
  onAddCard,
  onCancel,
  onPopupContentClick,
  color,
}) {
  const [inputFields, setInputFields] = useState([
    { question: "", answer: "" },
  ]);
  const [cardError, setCardError] = useState(false);
  const lastInputRef = useRef(null); // Add a ref to keep track of the last input field

  const handleAddFields = () => {
    setInputFields([...inputFields, { question: "", answer: "" }]);
  };

  const handleRemoveFields = (index) => {
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const hasEmptyInput = inputFields.some(
      (inputField) =>
        inputField.question.trim() === "" || inputField.answer.trim() === ""
    );
    if (hasEmptyInput) {
      setCardError(true);
      return;
    }
    const newCards = inputFields.map((inputField) => ({
      ...inputField,
    }));
    onAddCard(newCards);
  };

  useEffect(() => {
    if (lastInputRef.current) {
      lastInputRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the last input field when inputFields state changes
    }
  }, [inputFields]);

  return (
    <PopupWindow
      color={color}
      onCancel={onCancel}
      onContentClick={onPopupContentClick}
    >
      <StyledForm onSubmit={handleSubmit}>
        <StyledFormHeader color={color}>
          <StyledBackButton type="button" onClick={onCancel}>
            <Back />
          </StyledBackButton>
          <h2>{"Add new Card"}</h2>
          <StyledSubmitButton type="submit">
            <Submit />
          </StyledSubmitButton>
        </StyledFormHeader>
        {cardError && <ErrorMessage>Please use valid inputs!</ErrorMessage>}
        {inputFields.map((inputField, index) => (
          <li
            key={index}
            ref={index === inputFields.length - 1 ? lastInputRef : null}
          >
            <TitleContainer>
              <StyledText>Card {index + 1}:</StyledText>
              <StyledDeleteButton
                type="button"
                onClick={() => handleRemoveFields(index)}
              >
                <Delete />
              </StyledDeleteButton>
            </TitleContainer>
            <label htmlFor="question">Question</label>
            <StyledTextArea
              name="question"
              rows="5"
              cols="32"
              maxLength="100"
              placeholder="Write down a question"
              value={inputField.question}
              onChange={(event) => handleInputChange(index, event)}
              required
            ></StyledTextArea>
            <label htmlFor="answer">Answer</label>
            <StyledTextArea
              name="answer"
              rows="5"
              cols="32"
              maxLength="140"
              placeholder="Write down the answer"
              value={inputField.answer}
              onChange={(event) => handleInputChange(index, event)}
              required
            ></StyledTextArea>
          </li>
        ))}
        <StyledAddButton type="button" onClick={handleAddFields}>
          <Add />
        </StyledAddButton>
      </StyledForm>
    </PopupWindow>
  );
}

const StyledFormHeader = styled.header`
  display: flex;
  position: sticky;
  background-color: ${(props) => props.color};
  top: 0;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledSubmitButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  margin: -5px;
`;

const StyledBackButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
`;

const StyledForm = styled.form`
  display: flex;
  padding: 0 10px;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const StyledAddButton = styled.button`
  border: none;
  background-color: transparent;
  align-self: center;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledDeleteButton = styled.button`
  border: none;
  background-color: transparent;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  padding: 5px;

  &::placeholder {
    color: #333;
    font-style: italic;
  }
`;

const StyledText = styled.p`
  margin: 0 0 10px 0;
`;
