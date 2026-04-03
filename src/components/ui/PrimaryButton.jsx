import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function PrimaryButton({ children, className, variant = "accent", onClick, ...props }) {
  const isAccent = variant === "accent";
  const isGreen = variant === "green";
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "relative rounded-full px-8 py-3 font-semibold text-primary overflow-hidden transition-colors",
        isAccent && "bg-savaari-accent text-primary shadow-[0_0_20px_rgba(0,240,255,0.4)]",
        isGreen && "bg-savaari-green text-primary shadow-[0_0_20px_rgba(0,255,85,0.4)]",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity" />
    </motion.button>
  );
}
