import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TestComponent from "@/components/TestComponent";
import TestComponentTwo from "@/components/TestComponentTwo";

describe("Test Component", () => {
  it("renders a heading", () => {
    render(<TestComponent />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});

describe("Test Component Two", () => {
  it("renders a heading", () => {
    render(<TestComponentTwo />);

    const heading = screen.findByRole("heading");

    expect(heading).toBeInTheDocument();
  });
});
