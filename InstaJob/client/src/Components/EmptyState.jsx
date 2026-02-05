const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center text-center py-16">
      {Icon && (
        <Icon className="mb-4 text-3xl text-gray-400 dark:text-gray-500" />
      )}
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        {title}
      </h2>
      <p className="mt-2 text-sm max-w-md text-gray-500 dark:text-gray-400">
        {description}
      </p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};

export default EmptyState;
