import Subjects from "../components/Subjects/Subjects";

import Header from "@/components/Header/Header";

export default function Home({ subjects, setSubjects, showForm, setShowForm }) {
  return (
    <>
    <Header>Welcome to IntelliFlash</Header>
    <main>
      <Subjects
        subjects={subjects}
        setSubjects={setSubjects}
        setShowForm={setShowForm}
        showForm={showForm}
      />
    </main>
    </>
  );
}
