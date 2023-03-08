import { useState } from "react";
import styled from "styled-components";

export default function RoadmapForm({ onAddRoadmap, onCancel }) {
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState(["", "", ""]);
  const [color, setColor] = useState("#ffffff");

  const handleTitleChange = (event) => {
    const value = event.target.value.slice(0, 16);
    setTitle(value);
  };

  const handleTopicChange = (index, event) => {
    const newTopics = [...topics];
    newTopics[index] = event.target.value.slice(0, 16);
    setTopics(newTopics);
  };

  const handleAddTopic = () => {
    setTopics([...topics, ""]);
  };

  const handleDeleteTopic = (index) => {
    const newTopics = [...topics];
    newTopics.splice(index, 1);
    setTopics(newTopics);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddRoadmap({ title, topics, color });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new roadmap</h2>

      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={handleTitleChange}
        maxLength={16}
        required
      />
      <span>{`${title.length}/16`}</span>
      <br />

      <Styledul>
        {topics.map((topic, index) => (
          <li key={index}>
            <label>
              {index + 1}:{" "}
              <input
                type="text"
                value={topic}
                onChange={(event) => handleTopicChange(index, event)}
                maxLength={16}
                required
              />
            </label>
            <button type="button" onClick={() => handleDeleteTopic(index)}>
              X
            </button>
            <span>{`${topic.length}/16`}</span>
          </li>
        ))}
      </Styledul>
      <button type="button" onClick={handleAddTopic}>
        +
      </button>
      <br />

      <label htmlFor="color">Color</label>
      <input
        type="color"
        id="color"
        value={color}
        onChange={handleColorChange}
      />

      <button type="submit">Create</button>
      <button type="button" onClick={onCancel}>
        X
      </button>
    </form>
  );
}

const Styledul = styled.ul`
  list-style: none;
  padding-left: 0;
`;
