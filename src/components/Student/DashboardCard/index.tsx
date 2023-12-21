interface Props {
  title?: string;
  children: React.ReactNode;
}

const DashboardCard: React.FC<Props> = ({ title, children }) => {
  return (
    <div
      className="flex flex-col gap-2 bg-primary-foreground px-5 py-7 shadow-md"
      data-testid="dashboard-card"
    >
      <h2 className="text-3xl">{title ?? "Assignments: 6"}</h2>
      {children}
    </div>
  );
};

export default DashboardCard;
