import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AssignmentItem from "../../src/components/Student/DashboardCard/AssignmentItem/index";
import DashboardCard from "../../src/components/Student/DashboardCard/index";

describe("Dashboard Card Component", () => {
  it("renders Dashboard Card", () => {
    render(
      <DashboardCard title="Assignments">
        <AssignmentItem title="Grade" data={"5"} />
      </DashboardCard>
    );

    let card = screen.getByTestId("dashboard-card");
    let title = screen.getByText("Assignments");
    let spans = screen.getAllByText(/Grade|5/);

    expect(card).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(spans[0]).toHaveTextContent("Grade");
    expect(spans[1]).toHaveTextContent("5");
  });
});
