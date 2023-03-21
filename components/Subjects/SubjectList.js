import SubjectCard from "./SubjectCard";

export default function SubjectList( { subjects, handleDeleteSubject, handleDeleteSubjectClick, handleEditSubjectClick, openedPopup, setOpenedPopup, setSubjectToDelete }) {
    return (
      <>
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onDeleteSubject={handleDeleteSubject}
            onDeleteSubjectClick={handleDeleteSubjectClick}
            setSubjectToDelete={setSubjectToDelete}
            onEditSubjectClick={handleEditSubjectClick}
            openedPopup={openedPopup}
            setOpenedPopup={setOpenedPopup}
          />
        ))}
      </>
    );
}