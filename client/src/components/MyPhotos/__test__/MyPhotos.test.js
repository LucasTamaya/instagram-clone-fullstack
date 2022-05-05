import { render, screen } from "@testing-library/react";

import MyPhotos from "../MyPhotos";

describe("Unit tests on the MyPhotos component", () => {
  it("should render the component correctly to the user", () => {
    render(<MyPhotos />);
    const component = screen.getByTestId("myPhotos");
    expect(component).toBeTruthy();
  });
});
