import React from "react";

const InformationFooter = ({
  children,
  heightOffSet = 500,
}: {
  children: React.ReactNode;
  heightOffSet?: number;
}) => {
  return (
    <div
      className="bg-[#d9d9d91a] rounded-t-3xl  backdrop-blur absolute bottom-0"
      style={{ WebkitBackdropFilter: "blur(8px)" }}
    >
      {children}
    </div>
  );
};

export default InformationFooter;
