import { render, screen } from "@testing-library/react";

import PersonalPost from "../PersonalPost";

describe("Unit tests ont the PersonalPost component", () => {
  it("should render the component correctly to the user", () => {
    render(<PersonalPost />);
    const component = screen.getByRole("article");
    expect(component).toBeTruthy();
  });
});
