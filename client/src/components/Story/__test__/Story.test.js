import { render, screen } from "@testing-library/react";

import Story from "../Story";

describe("Unit tests on the Story component", () => {
  it("should render the component correctly to the user", () => {
    render(<Story />);
    const component = screen.getByRole("article");
    expect(component).toBeTruthy();
  });
});
