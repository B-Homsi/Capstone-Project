import { useState } from "react";
import { uid } from "uid";
import styled from "styled-components";

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

  const handleTopicToDeleteClick = (id) => {
    setTopicToDelete((prevTopicToDelete) =>
      prevTopicToDelete === id ? null : id
    );
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value.slice(0, 22));
  };

  const handleTopicChange = (id, event) => {
    const newTopics = [...topics];
    const index = newTopics.findIndex((topic) => topic.id === id);
    newTopics[index].title = event.target.value.slice(0, 28);
    setTopics(newTopics);
  };

  const handleAddTopic = () => {
    const newTopics = [...topics, { id: uid(), title: "" }];
    setTopics(newTopics);
  };

  const handleDeleteTopic = (id) => {
    const newTopics = topics.filter((topic) => topic.id !== id);
    setTopics(newTopics);
    setTopicToDelete(null);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
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
    <PopupContent onClick={onPopupContentClick} color={color}>
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={onCancel}>
          X
        </button>

        <button type="submit">{editSubject ? "Update" : "Create"}</button>

        <h2>{editSubject ? "Edit Subject" : "Add Subject"}</h2>

        <label htmlFor="title">Title: </label>
        <input
          placeholder="CSS Basics"
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          maxLength={22}
          required
        />
        <span>{`${title.length}/22`}</span>

        {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}

        <Styledul>
          {topics.map((topic, index) => (
            <li key={topic.id}>
              <label>
                {index + 1}.{" "}
                <input
                  placeholder={`Topic ${index + 1}`}
                  type="text"
                  value={topic.title}
                  onChange={(event) => handleTopicChange(topic.id, event)}
                  maxLength={28}
                  required
                />
              </label>
              <button
                type="button"
                onClick={() =>
                  editSubject
                    ? handleTopicToDeleteClick(topic.id)
                    : handleDeleteTopic(topic.id)
                }
              >
                X
              </button>
              <span>{`${topic.title.length || 0}/28`}</span>
            </li>
          ))}
          {errors.topics && <ErrorMessage>{errors.topics}</ErrorMessage>}
        </Styledul>

        <button type="button" onClick={handleAddTopic}>
          +
        </button>

        <label htmlFor="color">Color</label>
        <input
          type="color"
          id="color"
          value={color}
          onChange={handleColorChange}
        />
      </form>

      {topicToDelete && (
        <DeleteConfirmation>
          <p>Are you sure?</p>
          <button onClick={() => handleDeleteTopic(topicToDelete)}>
            Confirm
          </button>
          <button onClick={() => setTopicToDelete(null)}>Cancel</button>
        </DeleteConfirmation>
      )}
    </PopupContent>
  );
}

const PopupContent = styled.div`
  position: relative;
  background: ${(props) => props.color};
  padding: 20px;
  overflow: scroll;
  max-height: 80%;
  max-width: 80%;
  border-radius: 20px;
`;

const Styledul = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8em;
  margin-left: 5px;
`;

const DeleteConfirmation = styled.div`
  position: fixed;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
`;
