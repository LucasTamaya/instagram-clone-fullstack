import { render, screen, fireEvent } from "@testing-library/react";
import MediaQuery from "react-responsive";

import Header from "../Header";

const MockHeaderSmScreen = () => {
  return (
    <MediaQuery maxWidth={799}>
      <Header />
    </MediaQuery>
  );
};

const MockHeaderLgScreen = () => {
  return (
    <MediaQuery minWidth={800}>
      <Header />
    </MediaQuery>
  );
};

describe("Unit tests on the Header component", () => {
  it("should render the component correctly to the user", () => {
    render(<Header />);
    const component = screen.getByTestId("header");
    expect(component).toBeTruthy();
  });

  it("should render the small version on small screen", () => {
    render(<MockHeaderSmScreen />);
    const component = screen.getByTestId("smScreen");
    expect(component).toBeTruthy();
  });

  it("should render the large version on large screen", () => {
    render(<MockHeaderLgScreen />);
    const component = screen.getByTestId("lgScreen");
    expect(component).toBeTruthy();
  });
});
