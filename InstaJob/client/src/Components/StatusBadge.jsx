const StatusBadge = ({ status }) => {
  const color =
    status === "accepted"
      ? "text-green-600"
      : status === "rejected"
      ? "text-red-600"
      : "text-[#5E503F]";
  return (
    <span className={"font-semibold " + color}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
