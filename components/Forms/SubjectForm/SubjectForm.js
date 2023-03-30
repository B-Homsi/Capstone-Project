import { useState } from "react";
import { uid } from "uid";
import { colors } from "@/assets/colors";
import styled from "styled-components";
import TitleInput from "./TitleInput";
import TopicInput from "./TopicInput";
import ErrorMessage from "../ErrorMessage";
import PopupWindow from "@/components/PopupWindow";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import Add from "../add.svg";
import Back from "../back.svg";
import Submit from "../submit.svg";

export default function SubjectForm({
  onAddSubject,
  onEditSubject,
  onCancel,
  editSubject,
  onPopupContentClick,
}) {
  const [title, setTitle] = useState(editSubject ? editSubject.title : "");
  const [topics, setTopics] = useState(
    editSubject
      ? editSubject.topics
      : [
          { id: uid(), title: "" },
          { id: uid(), title: "" },
          { id: uid(), title: "" },
          { id: uid(), title: "" },
        ]
  );
  const [color, setColor] = useState(
    editSubject ? editSubject.color : "#ffffff"
  );
  const [errors, setErrors] = useState({});
  const [topicToDelete, setTopicToDelete] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value.slice(0, 22));
  };

  const handleTopicChange = (id, event) => {
    const newTopics = [...topics];
    const index = newTopics.findIndex((topic) => topic.id === id);
    newTopics[index].title = event.target.value.slice(0, 28);
    setTopics(newTopics);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleAddTopic = () => {
    const newTopics = [...topics, { id: uid(), title: "" }];
    setTopics(newTopics);
  };

  const handleTopicToDeleteClick = (id) => {
    setTopicToDelete((prevTopicToDelete) =>
      prevTopicToDelete === id ? null : id
    );
  };

  const handleDeleteTopic = (id) => {
    const newTopics = topics.filter((topic) => topic.id !== id);
    setTopics(newTopics);
    setTopicToDelete(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (trimmedTitle === "") {
      setErrors({ title: "Title is required" });
      return;
    }

    const hasEmptyTopic = topics.some(
      (topic) => topic.title.trim().length === 0
    );
    if (hasEmptyTopic) {
      setErrors({ topics: "Topic titles are required" });
      return;
    }

    setErrors({});

    if (editSubject) {
      const editedSubject = { ...editSubject, title, topics, color };
      onEditSubject(editedSubject);
    } else {
      onAddSubject({ title, topics, color });
    }
  };

  return (
    <PopupWindow
      color={color}
      onCancel={onCancel}
      onContentClick={onPopupContentClick}
    >
      <StyledForm onSubmit={handleSubmit}>
        <StyledFormHeader color={color}>
          <StyledBackButton type="button" onClick={onCancel}>
            <Back />
          </StyledBackButton>

          <h2>{editSubject ? "Edit Subject" : "Add Subject"}</h2>

          <StyledSubmitButton type="submit">
            <Submit />
          </StyledSubmitButton>
        </StyledFormHeader>
        <ColorInput>
          <label htmlFor="color">Color:</label>
          <ColorSelector id="color" value={color} onChange={handleColorChange}>
            {colors.map((color) => (
              <ColorOption key={color} value={color} color={color} />
            ))}
          </ColorSelector>
        </ColorInput>
        <TitleInput
          value={title}
          onChange={handleTitleChange}
          maxLength={22}
          color={color}
        />
        {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}

        <Styledul>
          {topics.map((topic, index) => (
            <TopicInput
              key={topic.id}
              index={index}
              topic={topic}
              color={color}
              onTopicChange={handleTopicChange}
              onTopicToDeleteClick={handleTopicToDeleteClick}
              onDeleteTopic={handleDeleteTopic}
              editSubject={editSubject}
            />
          ))}
          {errors.topics && <ErrorMessage>{errors.topics}</ErrorMessage>}
        </Styledul>

        <StyledAddButton type="button" onClick={handleAddTopic}>
          <Add />
        </StyledAddButton>
      </StyledForm>

      {topicToDelete && (
        <DeleteConfirmation
          onConfirm={() => handleDeleteTopic(topicToDelete)}
          onCancel={() => setTopicToDelete(null)}
        />
      )}
    </PopupWindow>
  );
}

const ColorInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  margin: 10px 0;
`;

const StyledSubmitButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  margin: -5px;
`;

const StyledBackButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
`;

const StyledFormHeader = styled.header`
  display: flex;
  position: sticky;
  background-color: ${(props) => props.color};
  top: 0;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Styledul = styled.ul`
  list-style: none;
  padding-left: 0;
  width: 100%;
`;

const StyledForm = styled.form`
  display: flex;
  padding: 0 10px;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const ColorSelector = styled.select`
  width: 15%;
  padding: 4px;
  margin: 4px 0;
  border: 1px solid #ccc;
  appearance: none;
  outline: none;
  cursor: pointer;
`;

const ColorOption = styled.option`
  background-color: ${(props) => props.color};
`;

const StyledAddButton = styled.button`
  border: none;
  background-color: transparent;
  align-self: center;
`;
