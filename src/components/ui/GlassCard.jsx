import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function GlassCard({ children, className, hoverEffect = false, ...props }) {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, scale: 1.01 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "bg-savaari-glass backdrop-blur-md border border-savaari-border rounded-2xl p-6",
        "shadow-[0_8px_32px_rgba(0,0,0,0.37)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
