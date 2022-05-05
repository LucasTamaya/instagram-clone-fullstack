import { render, screen } from "@testing-library/react";

import Stories from "../Stories";

describe("Unit tests on the Stories component", () => {
  it("should render the component correctly to the user", () => {
    render(<Stories />);
    const component = screen.getByTestId("stories");
    expect(component).toBeTruthy();
  });

  it("should render five storie", () => {
    render(<Stories />);
    const stories = screen.getAllByRole("article");
    expect(stories).toHaveLength(5);
  });
});
