import { useState } from "react";
import { uid } from "uid";
import styled from "styled-components";
import SubjectForm from "../Forms/SubjectForm/SubjectForm";
import SubjectList from "./SubjectList";
import PopupWindow from "@/components/PopupWindow";
import DeleteConfirmation from "@/components/DeleteConfirmation";

export default function Subjects({ subjects, setSubjects }) {
  const [showForm, setShowForm] = useState(false);
  const [editSubject, setEditSubject] = useState(null);
  const [openedPopup, setOpenedPopup] = useState(null);
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  const handleAddSubjectClick = () => {
    setShowForm(true);
  };

  const handleAddSubject = (subject) => {
    const newSubject = { ...subject, id: uid() };
    setSubjects([...subjects, newSubject]);
    setShowForm(false);
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

  const handleCancel = () => {
    setShowForm(false);
    setEditSubject(null);
    setSubjectToDelete(null);
  };

  // Prevents the popup from closing when clicking inside the form
  const handlePopupContentClick = (event) => {
    event.stopPropagation();
  };

  const handleOutsideClick = () => {
    setOpenedPopup(null);
  };

  return (
    <SubjectsContainer onClick={handleOutsideClick}>
      <SubjectList
        subjects={subjects}
        onDeleteSubject={handleDeleteSubject}
        onDeleteSubjectClick={handleDeleteSubjectClick}
        onEditSubjectClick={handleEditSubjectClick}
        setSubjectToDelete={setSubjectToDelete}
        openedPopup={openedPopup}
        setOpenedPopup={setOpenedPopup}
      />
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
        <PopupWindow
          onCancel={handleCancel}
          onContentClick={handlePopupContentClick}
        >
          <DeleteConfirmation
            onConfirm={() => handleDeleteSubject(subjectToDelete)}
            onCancel={() => setSubjectToDelete(null)}
          />
        </PopupWindow>
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
