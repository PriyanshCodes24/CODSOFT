import { motion, AnimatePresence } from "framer-motion";

const Navitem = ({ icon: Icon, label, active, onClick, size = 18 }) => {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md transition-colors ${active ? "font-semibold text-white" : "text-gray-300 hover:text-white"}`}
    >
      <Icon size={size} />
      <AnimatePresence>
        {active && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            className="text-sm whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navitem;
