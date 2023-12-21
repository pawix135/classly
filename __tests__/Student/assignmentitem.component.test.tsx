import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AssignmentItem from "../../src/components/Student/DashboardCard/AssignmentItem/index";

describe("Assignment Item Component", () => {
  it("renders Assignment Item", () => {
    render(<AssignmentItem title="Grade" data="5" />);

    const spans = screen.getAllByText(/Grade|5/);

    expect(spans[0]).toHaveTextContent("Grade");
    expect(spans[1]).toHaveTextContent("5");
  });
});
