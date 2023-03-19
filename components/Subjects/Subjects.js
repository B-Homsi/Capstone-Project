import { useState } from "react";
import { uid } from "uid";
import styled from "styled-components";
import SubjectForm from "../Form/SubjectForm";
import SubjectCard from "./SubjectCard";

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
          openedPopup={openedPopup}
          setOpenedPopup={setOpenedPopup}
          setSubjectToDelete={setSubjectToDelete}
        />
      ))}

      <StyledAddButton onClick={handleAddSubjectClick}>
        Add Subject
      </StyledAddButton>

      {showForm && (
        <PopupOverlay onClick={handleCancel}>
          <SubjectForm
            onPopupContentClick={handlePopupContentClick}
            onAddSubject={handleAddSubject}
            onEditSubject={handleEditSubject}
            onCancel={handleCancel}
            editSubject={editSubject}
          />
        </PopupOverlay>
      )}

      {subjectToDelete && (
        <PopupOverlay onClick={handleCancel}>
          <DeleteConfirmation>
            <p>Are you sure?</p>
            <button onClick={() => handleDeleteSubject(subjectToDelete)}>
              Confirm
            </button>
            <button onClick={() => setSubjectToDelete(null)}>Cancel</button>
          </DeleteConfirmation>
        </PopupOverlay>
      )}
    </SubjectsContainer>
  );
}

const DeleteConfirmation = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  `;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
