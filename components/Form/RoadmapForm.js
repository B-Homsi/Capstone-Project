import { useState } from "react";
import { uid } from "uid";
import styled from "styled-components";

export default function RoadmapForm({
  onAddRoadmap,
  onEditRoadmap,
  onCancel,
  editRoadmap,
  onPopupContentClick,
}) {
  const [title, setTitle] = useState(editRoadmap ? editRoadmap.title : "");

  const [topics, setTopics] = useState(
    editRoadmap
      ? editRoadmap.topics
      : [
          { id: uid(), title: "" },
          { id: uid(), title: "" },
          { id: uid(), title: "" },
        ]
  );

  const [color, setColor] = useState(
    editRoadmap ? editRoadmap.color : "#ffffff"
  );

  const [errors, setErrors] = useState({});

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

    if (editRoadmap) {
      const editedRoadmap = { ...editRoadmap, title, topics, color };
      onEditRoadmap(editedRoadmap);
    } else {
      onAddRoadmap({ title, topics, color });
    }
  };

  return (
    <PopupContent onClick={onPopupContentClick} color={color}>
      <form onSubmit={handleSubmit}>
        <h2>{editRoadmap ? "Edit roadmap" : "Create new roadmap"}</h2>

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
              <button type="button" onClick={() => handleDeleteTopic(topic.id)}>
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

        <button type="submit">{editRoadmap ? "Update" : "Create"}</button>
        <button type="button" onClick={onCancel}>
          X
        </button>
      </form>
    </PopupContent>
  );
}

const PopupContent = styled.div`
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
