const EmptyState = ({ title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="mt-2 text-sm max-w-sm text-gray-500">{description}</p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};

export default EmptyState;
