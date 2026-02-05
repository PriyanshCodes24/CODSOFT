const StatusBadge = ({ status }) => {
  const color =
    status === "accepted"
      ? "text-green-600 dark:text-green-400 "
      : status === "rejected"
        ? "text-red-600 dark:text-red-500"
        : "text-[#5E503F] dark:text-[#C8BCAE]";
  return (
    <span className={"font-semibold " + color}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
