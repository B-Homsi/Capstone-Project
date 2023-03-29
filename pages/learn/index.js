import SubjectList from "@/components/Subjects/SubjectList";
import styled from "styled-components";
import Header from "@/components/Header/Header";

export default function Learn({ subjects }) {
  return (
    <>
      <Header>Time to Learn</Header>
      <main>
        <StyledText>Choose a subject:</StyledText>
        <SubjectsContainer>
          <SubjectList subjects={subjects} options={false} inLearnPage />
        </SubjectsContainer>
      </main>
    </>
  );
}

const SubjectsContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.p`
  color: #fff;
  margin: 35px 0 5px 40px;
  text-shadow: 0 0 5px #000;
`;
