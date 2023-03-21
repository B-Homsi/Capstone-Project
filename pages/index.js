import Subjects from "../components/Subjects/Subjects";

export default function Home({ subjects, setSubjects }) {
  return (
    <main>
      <Subjects subjects={subjects} setSubjects={setSubjects} />
    </main>
  );
}
