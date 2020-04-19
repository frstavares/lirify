import React from "react";
import { render } from "@testing-library/react";
import Login from ".";

test("renders login with spotify link", () => {
  const { getByText } = render(<Login />);
  const linkElement = getByText(/login with spotify/i);
  expect(linkElement).toBeInTheDocument();
});
