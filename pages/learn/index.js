import SubjectList from "@/components/Subjects/SubjectList";
import styled from "styled-components";

export default function Learn({ subjects }) {
  return (
    <>
      <h1>Lets Learn</h1>
      <h2>Choose a Subject:</h2>
      <SubjectsContainer>
        <SubjectList subjects={subjects} options={false} inLearnPage />
      </SubjectsContainer>
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

