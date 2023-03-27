import SubjectList from "@/components/Subjects/SubjectList";
import styled from "styled-components";
import Header from "@/components/Header/Header";

export default function Learn({ subjects }) {
  return (
    <>
      <Header>Lets Learn</Header>
      <main>
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
