"use client";
import { motion } from "framer-motion";

export default function Animate({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      style={{ height: "100%", width: '100%'}}
    >
      {children}
    </motion.div>
  );
}
