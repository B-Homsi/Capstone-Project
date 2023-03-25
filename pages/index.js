import Subjects from "../components/Subjects/Subjects";

export default function Home({ subjects, setSubjects, showForm, setShowForm }) {
  return (
    <main>
      <Subjects
        subjects={subjects}
        setSubjects={setSubjects}
        setShowForm={setShowForm}
        showForm={showForm}
      />
    </main>
  );
}
