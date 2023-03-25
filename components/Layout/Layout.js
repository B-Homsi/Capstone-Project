import styled from "styled-components";
import NavigationBar from "../NavigationBar/NavigationBar";

export default function Layout({ children, setShowForm, showForm }) {
  return (
    <>
      <PageContainer>{children}</PageContainer>
      <NavigationBar setShowForm={setShowForm} showForm={showForm} />
    </>
  );
}

const PageContainer = styled.div`
  min-height: 100vh;
  padding-bottom: 80px;
  position: relative;
`;
