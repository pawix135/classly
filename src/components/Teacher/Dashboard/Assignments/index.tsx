import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TeacherAddAssignmentDialog from './AddAssignmentDialog';
import DashbaordDateDisplay from '../DateDisplay';

interface Props {
  classes: {
    id: number;
    name: string;
  }[];
  assignments: {
    id: number;
    slug: string;
    name: string;
    updated_at: Date;
  }[];
  teacherId: number;
}

const TeacherDashboardAssignments: React.FC<Props> = ({ classes, assignments, teacherId }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignments</CardTitle>
      </CardHeader>
      <CardContent>
        {assignments.map((assignment, i) => {
          return (
            <div
              key={`last-${assignment.id}`}
              className="flex flex-row gap-2 items-center justify-between hover:bg-secondary p-2"
            >
              <span>{assignment.name}</span>
              <DashbaordDateDisplay date={assignment.updated_at} />
            </div>
          );
        })}
        <TeacherAddAssignmentDialog classes={classes} teacherId={teacherId} />
      </CardContent>
    </Card>
  );
};

export default TeacherDashboardAssignments;
