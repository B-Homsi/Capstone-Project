import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorMessage from "./ErrorMessage";

test("renders ErrorMessage component in the document", () => {
  const mockMessage = "This is an error message.";

  render(<ErrorMessage>{mockMessage}</ErrorMessage>);

  expect(screen.getByText(mockMessage)).toBeInTheDocument();
});
