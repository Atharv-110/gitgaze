import React from "react";

const Chip = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-600 w-fit px-2.5 py-0.5 text-xs rounded-full">
      {children}
    </div>
  );
};

export default Chip;
