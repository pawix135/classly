import DashboardCard from "@/components/Student/DashboardCard";
import AssignmentItem from "@/components/Student/DashboardCard/AssignmentItem";
import { getClassNews, getStudentInfo } from "@/db/fetchers/student";
import { filterAssignmentsBy } from "@/utils/sort";
import { studentAuth } from "@/utils/useAuth";
import { PinIcon } from "lucide-react";
import { notFound } from "next/navigation";

const StudentDashboard = async () => {
  let student = studentAuth();
  if (!student) notFound();

  let [studentInfo, news] = await Promise.all([
    getStudentInfo(student.id),
    getClassNews(student.classId, 5),
  ]);

  if (!studentInfo) throw Error("Student info not found");

  console.log(studentInfo, news);

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
    <div className="container w-full mx-auto">
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2  md:grid-flow-row lg:grid-cols-3 lg:grid-rows-2 gap-5 py-5">
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
        <DashboardCard title="Pinned assignments">
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
        <DashboardCard title="Las">
          <span>Test</span>
        </DashboardCard>
        <DashboardCard title="Last news">
          {news.length < 1 ? (
            <div>There's no news</div>
          ) : (
            news.map((_news, i) => {
              return (
                <div key={`news-${i}`}>
                  <AssignmentItem
                    title={_news.news.title}
                    data={_news.news.content.substring(0, 20) + "..."}
                  />
                </div>
              );
            })
          )}
        </DashboardCard>
      </div>
    </div>
  );
};

export default StudentDashboard;
