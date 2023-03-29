import styled from "styled-components";

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  return (
    <StyledDeleteConfirmation>
      <h3>Are you sure?</h3>
      <StyledButtonContainer>
        <StyledConfirmButton onClick={onConfirm}>Confirm</StyledConfirmButton>
        <StyledCancelButton onClick={onCancel}>Cancel</StyledCancelButton>
      </StyledButtonContainer>
    </StyledDeleteConfirmation>
  );
}

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledConfirmButton = styled.button`
  width: 90px;
  margin: 20px 0;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 12px;
  font-weight: 600;
  &:active {
    opacity: 0.6;
  }
`;

const StyledCancelButton = styled.button`
  width: 90px;
  margin: 20px 0;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 12px;
  font-weight: 600;
  shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.9);

  &:active {
    opacity: 0.6;
  }
`;

const StyledDeleteConfirmation = styled.div`
  position: fixed;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
`;
