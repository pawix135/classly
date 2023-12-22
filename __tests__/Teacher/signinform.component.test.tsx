import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SignInForm from "@/components/Teacher/Forms/SignInForm";

describe("Teacher sign in form", () => {
  it("renders form", () => {
    render(<SignInForm signInAction={"POST" as any} forgotPasswordAction={"POST" as any} />);

    // Get sign in and recovery tab trigger
    let signInTabTrigger = screen.getByTestId("tab-signin-trigger");
    let recoveryTabTrigger = screen.getByTestId("tab-recovery-trigger");

    // Get username input
    let usernameInput = screen.getByTestId("username-input");

    // Get password input
    let passwordInput = screen.getByTestId("password-input");

    // Check if tab triggers are rendered
    expect(signInTabTrigger).toHaveTextContent("Sign in");
    expect(recoveryTabTrigger).toHaveTextContent("Account recovery");

    // Check if username input is rendered
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveAttribute("name", "username");

    // Check if password input is rendered
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("name", "password");
  });
});
