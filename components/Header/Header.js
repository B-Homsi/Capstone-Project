import styled from "styled-components";

export default function Header({ children }) {
  return <StyledHeader>{children}</StyledHeader>;
}

const StyledHeader = styled.h1`
  text-align: center;
  color: #fff;
`;
