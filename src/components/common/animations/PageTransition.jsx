import { motion as Motion } from "framer-motion";

const PageTransition = ({ children, className = "" }) => {
  return (
    <Motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </Motion.div>
  );
};

export default PageTransition;
