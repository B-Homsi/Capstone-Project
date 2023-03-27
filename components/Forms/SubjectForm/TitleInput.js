export default function TitleInput({ value, onChange, maxLength}) {
  return (
    <>
      <label htmlFor="title">Title: </label>
      <input
        placeholder="CSS Basics"
        type="text"
        id="title"
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        required
      />
    </>
  );
}