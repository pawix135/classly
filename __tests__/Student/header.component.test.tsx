import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "../../src/components/Student/Header/index";

describe("Student Dashboard", () => {
  it("renders Student dashboard", () => {
    render(<Header />);

    // Check if header is in the document
    const header = screen.getByTestId("student-header");
    expect(header).toBeInTheDocument();

    // Check if nav is in the document
    const nav = screen.getByTestId("student-nav");
    expect(nav).toBeInTheDocument();

    // Check if the link to dashboard is in the document
    const link = screen.getByText("Classly");
    expect(link).toBeInTheDocument();

    // Check if the Settings button is in the document
    const settingsButton = screen.getByText("Settings");
    expect(settingsButton).toBeInTheDocument();

    // Check if the Sign out button is in the document
    const signOutButton = screen.getByText("Sign out");
    expect(signOutButton).toBeInTheDocument();
  });
});
