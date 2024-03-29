import styled from "styled-components";

export default function PopupWindow({
  children,
  color,
  onCancel,
  onContentClick,
}) {
  return (
    <PopupOverlay onClick={onCancel}>
      <PopupContent onClick={onContentClick} color={color}>
        {children}
      </PopupContent>
    </PopupOverlay>
  );
}

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background: ${(props) => props.color};
  padding: 0px;
  overflow: scroll;
  height: 55%;
  width: 72%;
  border-radius: 5px;
`;
