import React from "react";

const InformationFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        height: `calc(100% - 500px)`,
        backdropFilter: "blur(8px)",
      }}
      className="bg-[#d9d9d91a] absolute bottom-0 rounded-t-3xl min-h-[414px] w-full"
    >
      {children}
    </div>
  );
};

export default InformationFooter;
