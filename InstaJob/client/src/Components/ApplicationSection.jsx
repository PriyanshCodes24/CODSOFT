import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { listCardUi } from "../Utils/uiClasses";
import { formatDate } from "../Utils/formatDate";
import StatusBadge from "./StatusBadge";

const ApplicationSection = ({ title, items }) => {
  if (items.length === 0) return null;
  return (
    <div className="mb-8">
      <h2 className="font-semibold text-lg mb-3 text-gray-900">
        {title} ({items.length})
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {items.map((application) => {
          if (!application.job) {
            return null;
          }
          return (
            <Link to={`/jobs/${application.job._id}`} key={application._id}>
              <motion.div
                layoutId={`job-${application.job._id}`}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={listCardUi}
              >
                <h3 className="font-semibold text-gray-900 text-lg">
                  {application?.job?.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {application?.job?.company} · {application?.job?.location}
                </p>
                <div className="mt-4 text-sm">
                  <p>
                    <span className="font-semibold">Applied on</span> :{" "}
                    {formatDate(application?.createdAt)}
                  </p>
                  <p>
                    <span className="font-semibold">Status</span> :{" "}
                    <StatusBadge status={application.status} />
                  </p>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationSection;
