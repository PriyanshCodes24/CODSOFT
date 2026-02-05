import { Link } from "react-router-dom";
import { formatDate } from "../Utils/formatDate";
import StatusBadge from "./StatusBadge";
import List from "./List";

const ApplicationSection = ({ title, items }) => {
  if (items.length === 0) return null;
  return (
    <div className="mb-8">
      <h2 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">
        {title} ({items.length})
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {items.map((application) => {
          if (!application.job) {
            return null;
          }
          return (
            <List key={application._id}>
              <Link to={`/jobs/${application.job._id}`}>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                  {application?.job?.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {application?.job?.company} · {application?.job?.location}
                </p>
                <div className="mt-4 text-sm space-y-1">
                  <p>
                    <span className="font-semibold">Applied on</span> :{" "}
                    {formatDate(application?.createdAt)}
                  </p>
                  <p>
                    <span className="font-semibold">Status</span> :{" "}
                    <StatusBadge status={application.status} />
                  </p>
                </div>
              </Link>
            </List>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationSection;
