import { render, screen } from "@testing-library/react";

import DeleteModal from "../DeleteModal";

describe("Unit tests on the DeleteModal component", () => {
  it("should render the component correctly to the user", () => {
    render(<DeleteModal />);
    const component = screen.getByTestId("deleteModal");
    expect(component).toBeTruthy();
  });
});
