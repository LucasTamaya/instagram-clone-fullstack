import { render, screen, fireEvent } from "@testing-library/react";

import Footer from "../Footer";

describe("Unit tests on the Header component", () => {
  it("should render the component correctly to the user", () => {
    render(<Footer />);
    const component = screen.getByTestId("footer");
    expect(component).toBeTruthy();
  });
});
