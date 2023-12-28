import { cn } from '@/lib/utils';
import { $Enums } from '@prisma/client';

interface Props {
  status: $Enums.AssignmentStatus;
}
const AssignmentStatusBadge: React.FC<Props> = ({ status }) => {
  return (
    <div
      className={cn(
        'px-3 py-1 bg-red-500 text-center text-sm rounded-full font-bold max-w-max uppercase text-nowrap',
        {
          'bg-blue-500 text-white': status === $Enums.AssignmentStatus.COMPLETED,
          'bg-green-500 text-white': status === $Enums.AssignmentStatus.GRADED,
        }
      )}
    >
      {status.replaceAll('_', ' ')}
    </div>
  );
};

export default AssignmentStatusBadge;
