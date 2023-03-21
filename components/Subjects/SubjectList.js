import SubjectCard from "./SubjectCard";

export default function SubjectList({
  subjects,
  onDeleteSubject,
  onDeleteSubjectClick,
  onEditSubjectClick,
  openedPopup,
  setOpenedPopup,
  setSubjectToDelete,
}) {
  return (
    <>
      {subjects.map((subject) => (
        <SubjectCard
          key={subject.id}
          subject={subject}
          onDeleteSubject={onDeleteSubject}
          onDeleteSubjectClick={onDeleteSubjectClick}
          setSubjectToDelete={setSubjectToDelete}
          onEditSubjectClick={onEditSubjectClick}
          openedPopup={openedPopup}
          setOpenedPopup={setOpenedPopup}
        />
      ))}
    </>
  );
}