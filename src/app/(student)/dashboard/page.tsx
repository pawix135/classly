import DashboardCard from "@/components/Student/DashboardCard";
import AssignmentItem from "@/components/Student/DashboardCard/AssignmentItem";
import { db } from "@/db/prisma";
import { filterAssignmentsBy } from "@/utils/sort";
import { useAuth } from "@/utils/useAuth";
import { Prisma, AssignmentStatus, $Enums } from "@prisma/client";
import { PinIcon } from "lucide-react";
import { notFound } from "next/navigation";

const getStudentInfo = async (id: number) => {
  const data = await db.student.findFirst({
    where: {
      id: id,
    },
    select: {
      assignments: {
        include: {
          assignment: {
            select: {
              pinned: true,
              name: true,
              status: true,
              updated_at: true,
              grade: true,
            },
          },
        },
      },
      _count: {
        select: {
          assignments: true,
        },
      },
    },
    take: 5,
  });

  return data;
};

const getByClass = async (id: number) => {
  return await db.teacher.findMany({
    where: {
      classes: {
        some: {
          id,
        },
      },
    },
  });
};

let fake = async (time: number) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("done");
    }, time);
  });
};

const StudentDashboard = async () => {
  let student = useAuth();
  if (!student) notFound();

  let [teachers, studentInfo] = await Promise.all([
    getByClass(1),
    getStudentInfo(student.id),
  ]);

  if (!studentInfo) throw Error("XD");

  let pinnedAssignments = filterAssignmentsBy(
    studentInfo.assignments,
    "pinned",
    true
  );

  let inProgressAssignments = filterAssignmentsBy(
    studentInfo.assignments,
    "status",
    "IN_PROGRESS"
  );

  let doneAssignments = filterAssignmentsBy(
    studentInfo.assignments,
    "status",
    "COMPLETED"
  );

  let notStartedAssignments = filterAssignmentsBy(
    studentInfo.assignments,
    "status",
    "NOT_STARTED"
  );

  let gradedAssignments = filterAssignmentsBy(
    studentInfo.assignments,
    "status",
    "GRADED"
  );

  let reviewedAssignments = filterAssignmentsBy(
    studentInfo.assignments,
    "status",
    "REVIEWING"
  );

  let latestUpdates = studentInfo.assignments.sort((a, b) => {
    if (a.assignment.updated_at > b.assignment.updated_at) return -1;
    if (a.assignment.updated_at < b.assignment.updated_at) return 1;
    return 0;
  });

  return (
    <div className="bg-secondary container w-full mx-auto">
      <div className="grid grid-flow-row grid-cols-3 grid-rows-2 gap-5 py-5 shadow-lg">
        <DashboardCard title="Assignments">
          <AssignmentItem
            title="Total:"
            data={studentInfo?._count.assignments}
          />
          <AssignmentItem
            title="Not started:"
            data={notStartedAssignments.length}
          />
          <AssignmentItem
            title="In progress:"
            data={inProgressAssignments.length}
          />
          <AssignmentItem title="Done:" data={doneAssignments.length} />
          <AssignmentItem title="Graded:" data={gradedAssignments.length} />
          <AssignmentItem
            title="Under review:"
            data={reviewedAssignments.length}
          />
        </DashboardCard>
        <DashboardCard title="Pinned">
          {pinnedAssignments.length < 1 ? (
            <div>There's no pinned assignments</div>
          ) : (
            pinnedAssignments.map((pinnedAssignment, pinI) => {
              return (
                <div
                  key={`pinned-${pinI}`}
                  className="flex flex-row gap-2 items-center"
                >
                  <PinIcon color="red" />
                  {pinnedAssignment.assignment.name}
                </div>
              );
            })
          )}
        </DashboardCard>
        <DashboardCard title="Last grades">
          {gradedAssignments.length < 1 ? (
            <div>You have 0 graded assignments!</div>
          ) : (
            gradedAssignments.map((assigment, gradedI) => {
              return (
                <AssignmentItem
                  key={`last-grades-${gradedI}`}
                  title={assigment.assignment.name}
                  data={assigment.assignment.grade}
                />
              );
            })
          )}
        </DashboardCard>
        <DashboardCard title="Last updates">
          {latestUpdates.map((assignment, i) => {
            return (
              <AssignmentItem
                key={`updates-${i}`}
                title={assignment.assignment.name}
                data={
                  assignment.assignment.updated_at.toLocaleTimeString() +
                  " " +
                  assignment.assignment.updated_at.toLocaleDateString()
                }
              />
            );
          })}
        </DashboardCard>

        {/* <DashboardCard /> */}
        {/* <DashboardCard title="Importante" /> */}
      </div>
    </div>
  );
};

export default StudentDashboard;
