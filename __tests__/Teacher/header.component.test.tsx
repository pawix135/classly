import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "@/components/Teacher/Header";

describe("Teacher Navbar", () => {
  // TODO: Fix the form action error
  it("renders Teacher Header", () => {
    render(<Header />);

    // Check if header is in the document
    const header = screen.getByTestId("teacher-header");
    expect(header).toBeInTheDocument();

    // Check if nav is in the document
    const nav = screen.getByTestId("teacher-nav");
    expect(nav).toBeInTheDocument();

    // Check if the link to dashboard is in the document
    const link = screen.getByText("Classly - Teacher");
    expect(link).toBeInTheDocument();
  });
});
