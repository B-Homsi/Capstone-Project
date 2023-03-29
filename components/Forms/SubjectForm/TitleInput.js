import styled from "styled-components";

export default function TitleInput({ value, onChange, maxLength, color }) {
  return (
    <Title>
      <label htmlFor="title">Title: </label>
      <StyledInput
        placeholder="CSS Basics"
        type="text"
        id="title"
        value={value}
        color={color}
        onChange={onChange}
        maxLength={maxLength}
        required
      />
    </Title>
  );
}

const Title = styled.div``;

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid #000;
  background-color: ${(props) => props.color};
  margin: 4px;
  padding: 3px;
  font-size: 14px;
`;
