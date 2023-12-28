interface Props {
  date: Date;
}
const DashbaordDateDisplay: React.FC<Props> = ({ date }) => {
  return (
    <span className="text-xs text-end">
      <p>{date.toLocaleDateString()}</p>
      <p>{date.toLocaleTimeString()}</p>
    </span>
  );
};

export default DashbaordDateDisplay;
