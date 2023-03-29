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
      style={{
        height: `calc(100% - ${heightOffSet}px)`,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      className="bg-[#d9d9d91a] absolute bottom-0 rounded-t-3xl min-h-[450px] w-full overflow-y-auto"
    >
      {children}
    </div>
  );
};

export default InformationFooter;
