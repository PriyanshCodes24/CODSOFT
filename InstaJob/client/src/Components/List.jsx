import { motion } from "framer-motion";
import { listCardUi } from "../Utils/uiClasses";

const ListUi = ({ jobid, children }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      layoutId={`job-${jobid}`}
      className={listCardUi}
    >
      {children}
    </motion.div>
  );
};

export default ListUi;
