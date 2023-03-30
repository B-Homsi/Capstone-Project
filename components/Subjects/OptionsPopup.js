import styled from "styled-components";
import Edit from "./edit.svg";
import Delete from "./delete.svg";

export default function OptionsPopup({ onEdit, onDelete }) {
  return (
    <PopupContainer>
      <PopupButton onClick={onEdit}>
        Edit
        <Edit />
      </PopupButton>
      <PopupButton onClick={onDelete}>
        Delete
        <Delete />
      </PopupButton>
    </PopupContainer>
  );
}

const PopupContainer = styled.div`
  position: absolute;
  top: 18px;
  left: 0px;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  z-index: 1;
`;

const PopupButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 5px 5px;
`;
