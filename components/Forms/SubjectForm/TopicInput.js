import Remove from "../remove.svg";
import styled from "styled-components";

export default function TopicInput({
  index,
  topic,
  color,
  onTopicChange,
  onTopicToDeleteClick,
  onDeleteTopic,
  editSubject,
}) {
  return (
    <li key={topic.id}>
      <InputContainer>
        <label>
          {index + 1}.{" "}
          <StyledInput
            placeholder={`Topic ${index + 1}`}
            type="text"
            value={topic.title}
            color={color}
            onChange={(event) => onTopicChange(topic.id, event)}
            maxLength={20}
            required
          />
        </label>
        <StyledRemoveButton
          type="button"
          onClick={() =>
            editSubject
              ? onTopicToDeleteClick(topic.id)
              : onDeleteTopic(topic.id)
          }
        >
          <Remove />
        </StyledRemoveButton>
      </InputContainer>
    </li>
  );
}

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StyledRemoveButton = styled.button`
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  height: 18px;
`;

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid #000;
  background-color: ${(props) => props.color};
  margin: 4px;
  padding: 3px;
  font-size: 14px;

  &::placeholder {
    color: #333;
    font-style: italic;
  }
`;
