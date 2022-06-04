import { render, screen } from "@testing-library/react";

import ChangePassword from "../ChangePassword";

describe("Unit tests on the ChangePassword component", () => {
  it("should render the component correctly to the user", () => {
    render(<ChangePassword />);
    const component = screen.getByTestId("changePassword");
    expect(component).toBeTruthy();
  });
});
