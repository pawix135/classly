import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TeacherAddAssignmentDialog from "./AddAssignmentDialog";

interface Props {
  classes: {
    id: number;
    name: string;
  }[];
  teacherId: number;
}

const TeacherDashboardAssignments: React.FC<Props> = ({ classes, teacherId }) => {
  return (
    <section className="grid grid-flow-row md:grid-cols-3 grid-cols-1  gap-10">
      <Card>
        <CardHeader>
          <CardTitle>Last assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Assignment 1</p>
          <p>Assignment 2</p>
          <p>Assignment 3</p>
          <p>Assignment 4</p>
          <p>Assignment 5</p>
          <TeacherAddAssignmentDialog classes={classes} teacherId={teacherId} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Test</CardTitle>
        </CardHeader>
      </Card>
    </section>
  );
};

export default TeacherDashboardAssignments;
