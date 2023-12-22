import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import InputGroup from "@/components/Forms/InputGroup";

describe("Input group", () => {
  it("renders input group", () => {
    render(
      <>
        <InputGroup name="username" text="Username" type="text" />
        <InputGroup name="password" text="Password" type="password" />
        <InputGroup name="error-test" text="Error test" type="text" error={"Error test"} />
      </>
    );

    // Get labels
    let usernameLabel = screen.getByTestId("username-label");
    let passwordLabel = screen.getByTestId("password-label");
    let errorTestLabel = screen.getByTestId("error-test-label");

    // Get username and password input
    let usernameInput = screen.getByTestId("username-input");
    let passwordInput = screen.getByTestId("password-input");
    let errorTestInput = screen.getByTestId("error-test-input");

    expect(usernameLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(errorTestLabel).toBeInTheDocument();

    // Check if error test label has error class and text
    expect(errorTestLabel.nextElementSibling).toHaveClass("text-red-500");
    expect(errorTestLabel.nextElementSibling).toHaveTextContent("Error test");

    // Check if inputs have correct attributes
    expect(usernameInput).toHaveAttribute("type", "text");
    expect(usernameInput).toHaveAttribute("name", "username");
    expect(passwordInput).toHaveAttribute("autoComplete", "current-password");
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(passwordInput).toHaveAttribute("name", "password");

    // Check if error input has error class
    expect(errorTestInput).toHaveClass("border-red-500");
  });
});
