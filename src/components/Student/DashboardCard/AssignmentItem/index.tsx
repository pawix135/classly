const AssignmentItem = ({
  title,
  data,
}: {
  title: string;
  data?: string | number | undefined | null;
}) => {
  return (
    <p className="flex flw-row justify-between" data-testid="assignment-item">
      <span>{title}</span>
      <span>{data}</span>
    </p>
  );
};

export default AssignmentItem;
