const AssignmentItem = ({
  title,
  data,
}: {
  title: string;
  data?: string | number | undefined | null;
}) => {
  return (
    <p className="flex flw-row justify-between" data-testid="assignment-item">
      <span className="font-medium">{title}</span>
      <span className="font-bold">{data}</span>
    </p>
  );
};

export default AssignmentItem;
