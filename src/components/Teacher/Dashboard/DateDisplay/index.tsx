interface Props {
  date: Date;
}
const DashbaordDateDisplay: React.FC<Props> = ({ date }) => {
  return (
    <span className="text-xs ">
      <p suppressHydrationWarning>{date.toLocaleDateString()}</p>
      <p suppressHydrationWarning>{date.toLocaleTimeString()}</p>
    </span>
  );
};

export default DashbaordDateDisplay;
