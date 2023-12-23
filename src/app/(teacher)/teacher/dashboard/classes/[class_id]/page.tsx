interface Props {
  params: {
    class_id: string;
  };
}

const TeacherClassPage: React.FC<Props> = ({ params: { class_id } }) => {
  return <div>{class_id}</div>;
};

export default TeacherClassPage;
