import styled from "styled-components";

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  return (
    <StyledDeleteConfirmation>
      <p>Are you sure?</p>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </StyledDeleteConfirmation>
  );
}

const StyledDeleteConfirmation = styled.div`
  position: fixed;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
`;
