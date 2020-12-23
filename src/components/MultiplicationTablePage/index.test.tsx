import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MultiplicationTablePage from ".";

describe("<MultiplicationTablePage />", () => {
  it("Should display Stop button when click on Start button", () => {
    render(<MultiplicationTablePage />);
    userEvent.click(screen.getByText("Commencer"));
  });
});
