import { render, screen } from "@testing-library/react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

import ChangeUsername from "../ChangeUsername";
import apolloClient from "../../../helpers/apolloClient";

const MockedChangeUsername = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <ChangeUsername />
      </ApolloProvider>
    </BrowserRouter>
  );
};

describe("Unit tests on the ChangeUsername component", () => {
  it("should render the component correctly to the user", () => {
    render(<MockedChangeUsername />);
    const component = screen.getByTestId("changeUsername");
    expect(component).toBeTruthy();
  });
});
