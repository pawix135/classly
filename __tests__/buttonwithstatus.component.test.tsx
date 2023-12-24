import ButtonWithStatus from "@/components/Forms/ButtonWithStatus";
import { render, screen } from "@testing-library/react";

describe("Button with status", () => {
  it("renders button with status", () => {
    render(
      <>
        <ButtonWithStatus testId="button-signin">Sign in</ButtonWithStatus>
        <ButtonWithStatus testId="button-error" error={true}>
          Error
        </ButtonWithStatus>
      </>
    );

    // Get buttons
    let buttonSignin = screen.getByTestId("button-signin");
    let buttonError = screen.getByTestId("button-error");

    // Check if buttons have correct text
    expect(buttonSignin).toHaveTextContent("Sign in");
    expect(buttonError).toHaveTextContent("Error");

    // Check if error button has error class
    expect(buttonError).toHaveClass("bg-destructive");
  });
});
