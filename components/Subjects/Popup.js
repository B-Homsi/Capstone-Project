import styled from "styled-components";

export default function Popup({ onEdit, onDelete }) {
  return (
    <PopupContainer>
      <PopupButton onClick={onEdit}>Edit</PopupButton>
      <PopupButton onClick={onDelete}>Delete</PopupButton>
    </PopupContainer>
  );
}

const PopupContainer = styled.div`
  position: absolute;
  top: 28px;
  left: 0;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  z-index: 1;
`;

const PopupButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-right: 5px;
`;
