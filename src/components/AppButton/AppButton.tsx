import React from "react";

const AppButton = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      style={{
        background:
          "linear-gradient(113.63deg, #CAE326 8.37%, rgba(202, 227, 38, 0.6) 87.25%)",
      }}
      className={`rounded font-body ${className}`}
    >
      {children}
    </button>
  );
};

export default AppButton;
