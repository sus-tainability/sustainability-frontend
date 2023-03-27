import React from "react";

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="relative w-full h-8 rounded-full bg-[#676767]">
      <div
        className="absolute top-0 left-0 h-full rounded-full bg-[#CAE326]"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
