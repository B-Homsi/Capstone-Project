import { useState, useRef, useEffect } from "react";
import PopupWindow from "@/components/PopupWindow";
import ErrorMessage from "../ErrorMessage";

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
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={onCancel}>
          X
        </button>
        <button type="submit">Add</button>

        <h2>{"Add new Card"}</h2>

        {cardError && <ErrorMessage>Please use valid inputs!</ErrorMessage>}

        {inputFields.map((inputField, index) => (
          <li
            key={index}
            ref={index === inputFields.length - 1 ? lastInputRef : null}
          >
            <p>Card {index + 1}:</p>
            <button type="button" onClick={() => handleRemoveFields(index)}>
              Delete
            </button>
            <br></br>
            <label htmlFor="question">Question</label>

            <textarea
              name="question"
              rows="6"
              cols="32"
              maxLength="100"
              placeholder="Write down a question"
              value={inputField.question}
              onChange={(event) => handleInputChange(index, event)}
              required
            ></textarea>

            <label htmlFor="answer">Answer</label>

            <textarea
              name="answer"
              rows="6"
              cols="32"
              maxLength="100"
              placeholder="Write down the answer"
              value={inputField.answer}
              onChange={(event) => handleInputChange(index, event)}
              required
            ></textarea>
          </li>
        ))}
        <button type="button" onClick={handleAddFields}>
          +
        </button>
      </form>
    </PopupWindow>
  );
}
