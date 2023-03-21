import { useState } from "react";
import { uid } from "uid";
import styled from "styled-components";
import SubjectForm from "../Form/SubjectForm";
import SubjectCard from "./SubjectCard";
import Popup from "@/components/Popup";
import DeleteConfirmation from "@/components/DeleteConfirmation";

export default function Subjects({ subjects, setSubjects }) {
  const [showForm, setShowForm] = useState(false);
  const [editSubject, setEditSubject] = useState(null);
  const [openedPopup, setOpenedPopup] = useState(null);
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  const handleAddSubject = (subject) => {
    const newSubject = { ...subject, id: uid() };
    setSubjects([...subjects, newSubject]);
    setShowForm(false);
  };

  const handleAddSubjectClick = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditSubject(null);
    setSubjectToDelete(null);
  };

  const handleDeleteSubjectClick = (id) => {
    setOpenedPopup(null);
    setSubjectToDelete((prevSubjectoDelete) =>
      prevSubjectoDelete === id ? null : id
    );
  };

  const handleDeleteSubject = (id) => {
    const newSubjects = subjects.filter((subject) => subject.id !== id);
    setSubjects(newSubjects);
    setSubjectToDelete(null);
  };

  // Prevents the popup from closing when clicking inside the form
  const handlePopupContentClick = (event) => {
    event.stopPropagation();
  };

  const handleEditSubjectClick = (subject) => {
    setOpenedPopup(null);
    setShowForm(true);
    setEditSubject(subject);
  };

  const handleEditSubject = (editedSubject) => {
    const newSubjects = subjects.map((subject) =>
      subject.id === editedSubject.id ? editedSubject : subject
    );
    setSubjects(newSubjects);
    setShowForm(false);
    setEditSubject(null);
  };

  const handleOutsideClick = () => {
    setOpenedPopup(null);
  };

  return (
    <SubjectsContainer onClick={handleOutsideClick}>
      {subjects.map((subject) => (
        <SubjectCard
          key={subject.id}
          subject={subject}
          onDeleteSubject={handleDeleteSubject}
          onDeleteSubjectClick={handleDeleteSubjectClick}
          onEditSubjectClick={handleEditSubjectClick}
          openedPopup={openedPopup}
          setOpenedPopup={setOpenedPopup}
          setSubjectToDelete={setSubjectToDelete}
        />
      ))}

      <StyledAddButton onClick={handleAddSubjectClick}>
        Add Subject
      </StyledAddButton>

      {showForm && (
        <SubjectForm
          onPopupContentClick={handlePopupContentClick}
          onAddSubject={handleAddSubject}
          onEditSubject={handleEditSubject}
          onCancel={handleCancel}
          editSubject={editSubject}
        />
      )}

      {subjectToDelete && (
        <Popup onCancel={handleCancel} onContentClick={handlePopupContentClick}>
          <DeleteConfirmation
            onConfirm={() => handleDeleteSubject(subjectToDelete)}
            onCancel={() => setSubjectToDelete(null)}
          />
        </Popup>
      )}
    </SubjectsContainer>
  );
}

const SubjectsContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledAddButton = styled.button`
  background-color: transparent;
  font-size: 1.5rem;
`;
