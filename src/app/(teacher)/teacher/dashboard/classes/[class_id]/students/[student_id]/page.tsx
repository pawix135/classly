interface Props {
  params: {
    class_id: string;
    student_id: string;
  };
}

const TeacherStudentPage: React.FC<Props> = ({ params: { class_id, student_id } }) => {
  return (
    <div>
      <h1>
        {class_id} {student_id}
      </h1>
    </div>
  );
};
export default TeacherStudentPage;
