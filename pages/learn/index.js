import SubjectList from "@/components/Subjects/SubjectList";

export default function Learn({ subjects }) {
  return (
    <>
      <h1>Lets Learn</h1>
      <h2>Choose a Subject:</h2>
      <SubjectList subjects={subjects} options={false} inLearnPage />
    </>
  );
}
