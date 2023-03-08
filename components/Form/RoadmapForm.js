import { useState } from "react";
import { uid } from "uid";
import styled from "styled-components";

export default function RoadmapForm({ onAddRoadmap, onCancel }) {
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState([
    { id: uid(), title: "" },
    { id: uid(), title: "" },
    { id: uid(), title: "" },
  ]);
  const [color, setColor] = useState("#ffffff");

  const handleTitleChange = (event) => {
    const value = event.target.value.slice(0, 16);
    setTitle(value);
  };

  const handleTopicChange = (id, event) => {
    const newTopics = [...topics];
    const index = newTopics.findIndex((topic) => topic.id === id);
    newTopics[index].title = event.target.value.slice(0, 16);
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
          <li key={topic.id}>
            <label>
              {index + 1}:{" "}
              <input
                type="text"
                value={topic.title}
                onChange={(event) => handleTopicChange(topic.id, event)}
                maxLength={16}
                required
              />
            </label>
            <button type="button" onClick={() => handleDeleteTopic(topic.id)}>
              X
            </button>
            <span>{`${topic.title.length || 0}/16`}</span>
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
