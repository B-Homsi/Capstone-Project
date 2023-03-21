import styled from "styled-components";

export default function ErrorMessage({ children }) {
  return <StyledError>{children}</StyledError>;
};

const StyledError = styled.span`
  color: red;
  font-size: 0.8em;
  margin-left: 5px;
  background-color: white;
`;
