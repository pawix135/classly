import { teacherAuth } from '@/utils/useAuth';
import * as fetchers from '@/db/fetchers/Teacher';
import TeacherDashboardClasses from '@/components/Teacher/Dashboard';
import { redirect } from 'next/navigation';
import TeacherDashboardAssignments from '@/components/Teacher/Dashboard/Assignments';
import TeacherDashboardNews from '@/components/Teacher/Dashboard/News';

const TeacherDashboardPage = async () => {
  let teacher = teacherAuth();

  if (!teacher) return redirect('/teacher/signin');

  const [classWithStudents, lastSubmittedAssignments, latestNews] = await Promise.all([
    fetchers.getClassesWithStudents(teacher.id),
    fetchers.getLastSubmittedAssignments(teacher.id),
    fetchers.getLatestNews(teacher.id),
  ]);

  let classes = classWithStudents.map((x) => ({ id: x.id, name: x.name }));
  console.log(latestNews);

  return (
    <div className="container p-5 self-center flex flex-col gap-5">
      <TeacherDashboardClasses classes={classWithStudents} />
      <h2 className="text-3xl font-bold">Last updates</h2>
      <section className="grid grid-flow-row  md:grid-cols-2 grid-cols-1  gap-10">
        <TeacherDashboardAssignments
          classes={classes}
          assignments={lastSubmittedAssignments}
          teacherId={teacher.id}
        />
        <TeacherDashboardNews news={latestNews} classes={classes} />
      </section>
    </div>
  );
};

export default TeacherDashboardPage;
