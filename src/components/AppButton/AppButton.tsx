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
      onClick={onClick}
      className={`rounded greenGradient font-body ${className}`}
    >
      {children}
    </button>
  );
};

export default AppButton;
