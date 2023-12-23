import { teacherAuth } from "@/utils/useAuth";
import * as fetchers from "@/db/fetchers/Teacher";
import TeacherDashboardClasses from "@/components/Teacher/Dashboard";
import { redirect } from "next/navigation";

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
    <div className="container p-5 self-center">
      <TeacherDashboardClasses classes={sortedClasses} />
    </div>
  );
};

export default TeacherDashboardPage;
