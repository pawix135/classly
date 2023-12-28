import { columns } from '@/components/Teacher/Dashboard/Assignments/AssignmentsTable/columns';
import { AssignmentsDataTable } from '@/components/Teacher/Dashboard/Assignments/AssignmentsTable/data-table';
import { getAssignmentsForStudent, getStudentById } from '@/db/fetchers/Teacher';
import { generateDatabaseExample, generateFakeClass, generateFakeStudent } from '@/utils/fake';
import { teacherAuth } from '@/utils/useAuth';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    class_id: string;
    student_id: string;
  };
}

export const generateMetadata = async (props: Props): Promise<Metadata | null> => {
  let student = await getStudentById(
    parseInt(props.params.student_id),
    parseInt(props.params.class_id)
  );

  if (!student) return null;

  return {
    title: `${student.name} ${student.surname} | ${student.class.name}`,
  };
};

const TeacherStudentPage: React.FC<Props> = async ({ params: { class_id, student_id } }) => {
  let teacher = teacherAuth();
  if (!teacher) throw new Error('Not authenticated');
  let student = await getStudentById(parseInt(student_id), parseInt(class_id));

  if (!student) notFound();

  let studentAssignments = await getAssignmentsForStudent({
    classId: parseInt(class_id),
    studentId: parseInt(student_id),
  });

  // console.log(await generateDatabaseExample());

  return (
    <div className="px-5 pt-5 container mx-auto flex flex-col gap-5">
      <h1 className="text-4xl">Summary</h1>
      <p className="flex flex-row justify-between items-center">
        <span className="text-xl font-semibold">{`${student.name} ${student.surname}`}</span>
        <span className="font-bold">Class: {student.class.name}</span>
      </p>
      <AssignmentsDataTable columns={columns} data={studentAssignments} />
    </div>
  );
};
export default TeacherStudentPage;
