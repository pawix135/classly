import { Class } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';

interface Props {
  classes: (Class & { students: { id: number; name: string; surname: string }[] })[];
}

export const TeacherDashboardClasses: React.FC<Props> = ({ classes }) => {
  if (classes.length === 0)
    return (
      <p data-testid="dashboard-classes-empty">
        You don&apos;t have any classes yet. Please contact the administrator!
      </p>
    );

  const sortStudents = (students: { id: number; name: string; surname: string }[]) => {
    return students.sort((a, b) => {
      if (a.surname > b.surname) return 1;
      if (a.surname < b.surname) return -1;
      return 0;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold text-3xl">Your classes</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-flow-row grid-cols-1  md:gird-flow-row md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
        {classes.map((cls, clsI) => {
          let sortedStudents = sortStudents(cls.students);

          return (
            <Card key={cls.name} data-testid="teacher-classes-container">
              <CardHeader>
                <CardTitle className="flex flex-row">
                  <Link href={'/teacher/dashboard/classes/' + cls.id}>{cls.name}</Link>
                  <span className="ml-auto">{sortedStudents.length} students</span>
                </CardTitle>
                <Separator />
              </CardHeader>
              <CardContent>
                {sortedStudents.length === 0 ? (
                  <p data-testid="teacher-class-no-students">No students in this class yet.</p>
                ) : (
                  <ScrollArea className="w-full h-52">
                    {sortedStudents.map((student, studentI) => {
                      return (
                        <Link
                          key={`class-${clsI}-${studentI}`}
                          href={`/teacher/dashboard/classes/${cls.id}/students/${student.id}`}
                          className="flex even:bg-primary-foreground py-2 px-2 even:hover:bg-secondary odd:hover:bg-primary-foreground"
                          data-testid="teacher-class-student"
                        >
                          {studentI + 1} {student.name} {student.surname}
                        </Link>
                      );
                    })}
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default TeacherDashboardClasses;
