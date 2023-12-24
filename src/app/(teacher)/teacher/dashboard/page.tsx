import { teacherAuth } from "@/utils/useAuth";
import * as fetchers from "@/db/fetchers/Teacher";
import TeacherDashboardClasses from "@/components/Teacher/Dashboard";
import { redirect } from "next/navigation";
import TeacherDashboardAssignments from "@/components/Teacher/Dashboard/Assignments";

const TeacherDashboardPage = async () => {
  let teacher = teacherAuth();

  if (!teacher) return redirect("/teacher/signin");

  let classWithStudents = await fetchers.getClassesWithStudents(teacher.id);

  let sortedClasses = classWithStudents.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

  return (
    <div className="container p-5 self-center flex flex-col gap-5">
      <TeacherDashboardClasses classes={sortedClasses} />
      <TeacherDashboardAssignments
        classes={sortedClasses.map((x) => ({ id: x.id, name: x.name }))}
        teacherId={teacher.id}
      />
    </div>
  );
};

export default TeacherDashboardPage;
