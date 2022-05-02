import { ApolloProvider } from "@apollo/client";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Login from "../Login";
import apolloClient from "../../../helpers/apolloClient";

const MockLogin = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <Login />
      </ApolloProvider>
    </BrowserRouter>
  );
};

describe("Unit tests on the Register component", () => {
  it("should render the component correctly to the user", () => {
    render(<MockLogin />);

    const component = screen.getByRole("form");

    expect(component).toBeTruthy();
  });

  it("should be able to type in input fields", () => {
    render(<MockLogin />);

    const emailInputField = screen.getByPlaceholderText(/Email/i);
    const passwordInputField = screen.getByPlaceholderText(/Password/i);

    fireEvent.change(emailInputField, { target: { value: "john" } });
    fireEvent.change(passwordInputField, { target: { value: "123" } });

    expect(emailInputField.value).toBe("john");
    expect(passwordInputField.value).toBe("123");
  });

  it("should render 2 error messages if we click on the register button while all inputs are empty", async () => {
    render(<MockLogin />);

    const registerBtn = screen.getByRole("button");
    fireEvent.click(registerBtn);
    const errorMessages = await screen.findAllByText(/Please enter your/i);
    expect(errorMessages).toHaveLength(2);
  });

  it("should render 1 error messages if we click on the register button while there is only 1 input fullfiled", async () => {
    render(<MockLogin />);

    const emailInputField = screen.getByPlaceholderText(/Email/i);
    const registerBtn = screen.getByRole("button");

    fireEvent.change(emailInputField, { target: { value: "john" } });
    fireEvent.click(registerBtn);

    const errorMessages = await screen.findAllByText(/Please enter your/i);
    expect(errorMessages).toHaveLength(1);
  });

  it("should render an error message if the email input is invalid", async () => {
    render(<MockLogin />);

    const emailInputField = screen.getByPlaceholderText(/Email/i);
    const registerBtn = screen.getByRole("button");

    fireEvent.change(emailInputField, {
      target: { value: "joHn.do(;*e.gmail.com" },
    });
    fireEvent.click(registerBtn);

    const errorMessage = await screen.findByText(
      /Please enter a valid email address/i
    );
    expect(errorMessage).toBeTruthy();
  });

  it("should render an error message if the password is less than 6 characters long", async () => {
    render(<MockLogin />);

    const passwordInputField = screen.getByPlaceholderText(/Password/i);
    const registerBtn = screen.getByRole("button");

    fireEvent.change(passwordInputField, { target: { value: "12345" } });
    fireEvent.click(registerBtn);

    const errorMessage = await screen.findByText(/This password is too short/i);
    expect(errorMessage).toBeTruthy();
  });
});

// describe("Integration tests with the Register component and the AuthStatus component", () => {
//   it("should render an authentification error message if the user already exists", async () => {
//     render(<MockRegister />);

//     const emailInputField = screen.getByPlaceholderText(/Email/i);
//     const usernameInputField = screen.getByPlaceholderText(/Username/i);
//     const passwordInputField = screen.getByPlaceholderText(/Password/i);
//     const registerBtn = screen.getByRole("button");

//     fireEvent.change(emailInputField, {
//       target: { value: "user.test@test.com" },
//     });
//     fireEvent.change(usernameInputField, { target: { value: "Test" } });
//     fireEvent.change(passwordInputField, { target: { value: "password" } });
//     await fireEvent.click(registerBtn);

//     const authErrorMessage = await screen.findByText(
//       /This user already exists/i
//     );
//     expect(authErrorMessage).toBeTruthy();
//   });
// });
