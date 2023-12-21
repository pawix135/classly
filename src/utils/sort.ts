import { $Enums } from "@prisma/client";

export function filterAssignmentsBy<
  T extends {
    assignment: {
      name: string;
      pinned: boolean;
      status: $Enums.AssignmentStatus;
    };
  }
>(
  assignments: T[],
  by: "name" | "pinned" | "status",
  value: boolean | $Enums.AssignmentStatus
) {
  return assignments.filter((assignment) => assignment.assignment[by] == value);
}
