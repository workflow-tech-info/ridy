import React from "react";
import { cn } from "../../lib/utils";

export function InputField({ label, className, ...props }) {
  return (
    <div className={cn("flex flex-col space-y-1 relative", className)}>
      {label && <label className="text-sm text-savaari-gray ml-1">{label}</label>}
      <input
        className="bg-transparent border-b border-savaari-border focus:border-savaari-accent transition-colors py-2 px-1 outline-none text-white placeholder:text-savaari-gray/50"
        {...props}
      />
    </div>
  );
}
