import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TitleInput from "./TitleInput";

describe("TitleInput", () => {
  it("renders the TitleInput component with given value and maxLength", () => {
    const value = "Sample Title";
    const maxLength = 20;
    const onChange = jest.fn();

    render(
      <TitleInput
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        color="#ffffff"
      />
    );

    const inputElement = screen.getByPlaceholderText("CSS Basics");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(value);
    expect(inputElement.maxLength).toBe(maxLength);
  });

  it("handles the onChange event correctly", () => {
    const value = "Sample Title";
    const maxLength = 20;
    const onChange = jest.fn();

    render(
      <TitleInput
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        color="#ffffff"
      />
    );

    const inputElement = screen.getByPlaceholderText("CSS Basics");
    fireEvent.change(inputElement, { target: { value: "New Title" } });
    expect(onChange).toHaveBeenCalled();
  });
});
