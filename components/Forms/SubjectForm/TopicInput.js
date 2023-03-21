export default function TopicInput({
  index,
  topic,
  onTopicChange,
  onTopicToDeleteClick,
  onDeleteTopic,
  editSubject,
}) {
  return (
    <li key={topic.id}>
      <label>
        {index + 1}.{" "}
        <input
          placeholder={`Topic ${index + 1}`}
          type="text"
          value={topic.title}
          onChange={(event) => onTopicChange(topic.id, event)}
          maxLength={28}
          required
        />
      </label>
      <button
        type="button"
        onClick={() =>
          editSubject
            ? onTopicToDeleteClick(topic.id)
            : onDeleteTopic(topic.id)
        }
      >
        X
      </button>
      <span>{`${topic.title.length || 0}/28`}</span>
    </li>
  );
}