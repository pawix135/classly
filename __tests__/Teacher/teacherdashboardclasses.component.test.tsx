import TeacherDashboardClasses from "@/components/Teacher/Dashboard";
import { render, screen } from "@testing-library/react";

describe("Teacher Dashboard Classes Component Test", () => {
  it("should render message if empty classes array", () => {
    render(<TeacherDashboardClasses classes={[]} />);
    expect(screen.getByTestId("dashboard-classes-empty")).toBeInTheDocument();
  });

  it("should render class with no students", () => {
    render(
      <TeacherDashboardClasses
        classes={[
          {
            id: 1,
            name: "1b",
            students: [],
            supervisorId: 1,
          },
        ]}
      />
    );

    expect(screen.getByTestId("teacher-class-no-students")).toHaveTextContent("No students in this class yet.");
  });

  it("should check student href", () => {
    render(
      <TeacherDashboardClasses
        classes={[
          {
            id: 1,
            name: "1b",
            students: [{ id: 3, name: "First", surname: "Student" }],
            supervisorId: 1,
          },
        ]}
      />
    );

    let student = screen.getByTestId("teacher-class-student");
    expect(student).toHaveTextContent("1 First Student");
    expect(student).toHaveAttribute("href", "/teacher/dashboard/classes/1/students/3");
  });

  it("should render 2 classes and 3 students", () => {
    render(
      <TeacherDashboardClasses
        classes={[
          {
            id: 1,
            name: "1b",
            students: [
              { id: 1, name: "First", surname: "Student" },
              { id: 2, name: "Second", surname: "Student" },
            ],
            supervisorId: 1,
          },
          { id: 2, name: "2b", students: [{ id: 3, name: "Third", surname: "Student" }], supervisorId: 1 },
        ]}
      />
    );

    expect(screen.getAllByTestId("teacher-classes-container")).toHaveLength(2);
    expect(screen.getAllByTestId("teacher-class-student")).toHaveLength(3);
  });
});
