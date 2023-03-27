import { useState } from "react";
import { uid } from "uid";
import { colors } from "@/assets/colors";
import styled from "styled-components";
import TitleInput from "./TitleInput";
import TopicInput from "./TopicInput";
import ErrorMessage from "../ErrorMessage";
import PopupWindow from "@/components/PopupWindow";
import DeleteConfirmation from "@/components/DeleteConfirmation";

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
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={onCancel}>
          X
        </button>

        <button type="submit">{editSubject ? "Update" : "Create"}</button>

        <h2>{editSubject ? "Edit Subject" : "Add Subject"}</h2>

        <TitleInput value={title} onChange={handleTitleChange} maxLength={22} />
        {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}

        <Styledul>
          {topics.map((topic, index) => (
            <TopicInput
              key={topic.id}
              index={index}
              topic={topic}
              onTopicChange={handleTopicChange}
              onTopicToDeleteClick={handleTopicToDeleteClick}
              onDeleteTopic={handleDeleteTopic}
              editSubject={editSubject}
            />
          ))}
          {errors.topics && <ErrorMessage>{errors.topics}</ErrorMessage>}
        </Styledul>

        <button type="button" onClick={handleAddTopic}>
          +
        </button>

        <label htmlFor="color">Color</label>
        <ColorSelector id="color" value={color} onChange={handleColorChange}>
          {colors.map((color) => (
            <ColorOption key={color} value={color} color={color} />
          ))}
        </ColorSelector>
      </form>

      {topicToDelete && (
        <DeleteConfirmation
          onConfirm={() => handleDeleteTopic(topicToDelete)}
          onCancel={() => setTopicToDelete(null)}
        />
      )}
    </PopupWindow>
  );
}

const Styledul = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const ColorSelector = styled.select`
  width: 18%;
  padding: 4px;
  margin: 4px 0;
  border: 1px solid #ccc;
  appearance: none;
  outline: none;
  cursor: pointer;
`;

const ColorOption = styled.option`
  background-color: ${(props) => props.color};
  padding: 8px;
  font-weight: bold;
  text-align: center;
`;
