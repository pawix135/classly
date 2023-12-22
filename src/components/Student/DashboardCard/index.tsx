interface Props {
  title?: string;
  children: React.ReactNode;
}

const DashboardCard: React.FC<Props> = ({ title, children }) => {
  return (
    <div
      className="flex flex-col gap-2 bg-primary-foreground px-5 py-7 shadow-md shadow-primary-foreground rounded-lg"
      data-testid="dashboard-card"
    >
      {title && <h2 className="text-3xl">{title}</h2>}
      {children}
    </div>
  );
};

export default DashboardCard;
