import { useAuth } from "@/utils/useAuth";
import { notFound } from "next/navigation";

const StudentDashboard = () => {
  let student = useAuth();
  if (!student) notFound();

  return (
    <div>
      Hi {student.name} {student.surname}
    </div>
  );
};

export default StudentDashboard;
