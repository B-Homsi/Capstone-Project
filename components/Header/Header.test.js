import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";

test("shows the Header component with given children", () => {
  const headerText = "Sample Header Text";
  render(<Header>{headerText}</Header>);
  const headerElement = screen.getByText(headerText);
  expect(headerElement).toBeInTheDocument();
  expect(headerElement.tagName).toBe("H1");
});
