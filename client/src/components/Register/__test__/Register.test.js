import { ApolloProvider } from "@apollo/client";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Register from "../Register";
import apolloClient from "../../../helpers/apolloClient";

const MockRegister = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <Register />
      </ApolloProvider>
    </BrowserRouter>
  );
};

describe("Unit tests on the Register component", () => {
  it("should render the component correctly to the user", () => {
    render(<MockRegister />);

    const component = screen.getByRole("form");

    expect(component).toBeTruthy();
  });

  it("should be able to type in input fields", () => {
    render(<MockRegister />);

    const emailInputField = screen.getByPlaceholderText(/Email/i);
    const usernameInputField = screen.getByPlaceholderText(/Username/i);
    const passwordInputField = screen.getByPlaceholderText(/Password/i);

    fireEvent.change(emailInputField, { target: { value: "john" } });
    fireEvent.change(usernameInputField, { target: { value: "bob" } });
    fireEvent.change(passwordInputField, { target: { value: "123" } });

    expect(emailInputField.value).toBe("john");
    expect(usernameInputField.value).toBe("bob");
    expect(passwordInputField.value).toBe("123");
  });

  it("should render 3 error messages if we click on the register button while all inputs are empty", async () => {
    render(<MockRegister />);

    const registerBtn = screen.getByRole("button");
    fireEvent.click(registerBtn);
    const errorMessages = await screen.findAllByText(/Please enter your/i);
    expect(errorMessages).toHaveLength(3);
  });

  it("should render 2 error messages if we click on the register button while there is only 1 input fullfiled", async () => {
    render(<MockRegister />);

    const usernameInputField = screen.getByPlaceholderText(/Username/i);
    const registerBtn = screen.getByRole("button");

    fireEvent.change(usernameInputField, { target: { value: "bob" } });
    fireEvent.click(registerBtn);

    const errorMessages = await screen.findAllByText(/Please enter your/i);
    expect(errorMessages).toHaveLength(2);
  });

  it("should render an error message if we click on the register button while there is only 2 inputs fullfiled", async () => {
    render(<MockRegister />);

    const emailInputField = screen.getByPlaceholderText(/Email/i);
    const usernameInputField = screen.getByPlaceholderText(/Username/i);
    const registerBtn = screen.getByRole("button");

    fireEvent.change(emailInputField, { target: { value: "john" } });
    fireEvent.change(usernameInputField, { target: { value: "bob" } });
    fireEvent.click(registerBtn);

    const errorMessages = await screen.findAllByText(/Please enter your/i);
    expect(errorMessages).toHaveLength(1);
  });

  it("should render an error message if the email input is invalid", async () => {
    render(<MockRegister />);

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

  it("should render an error message if the username is less than 2 characters long", async () => {
    render(<MockRegister />);

    const usernameInputField = screen.getByPlaceholderText(/Username/i);
    const registerBtn = screen.getByRole("button");

    fireEvent.change(usernameInputField, { target: { value: "a" } });
    fireEvent.click(registerBtn);

    const errorMessage = await screen.findByText(/This username is too short/i);
    expect(errorMessage).toBeTruthy();
  });

  it("should render an error message if the password is less than 6 characters long", async () => {
    render(<MockRegister />);

    const passwordInputField = screen.getByPlaceholderText(/Password/i);
    const registerBtn = screen.getByRole("button");

    fireEvent.change(passwordInputField, { target: { value: "12345" } });
    fireEvent.click(registerBtn);

    const errorMessage = await screen.findByText(/This password is too short/i);
    expect(errorMessage).toBeTruthy();
  });
});

describe("Integration tests with the Register component and the AuthStatus component", () => {
  it("should render an authentification error message if the user already exists", async () => {
    render(<MockRegister />);

    const emailInputField = screen.getByPlaceholderText(/Email/i);
    const usernameInputField = screen.getByPlaceholderText(/Username/i);
    const passwordInputField = screen.getByPlaceholderText(/Password/i);
    const registerBtn = screen.getByRole("button");

    fireEvent.change(emailInputField, {
      target: { value: "user.test@test.com" },
    });
    fireEvent.change(usernameInputField, { target: { value: "Test" } });
    fireEvent.change(passwordInputField, { target: { value: "password" } });
    fireEvent.click(registerBtn);

    const authErrorMessage = await screen.findByText(
      /This user already exists/i
    );
    expect(authErrorMessage).toBeTruthy();
  });
});
