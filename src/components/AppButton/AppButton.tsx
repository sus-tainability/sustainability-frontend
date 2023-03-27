import React from "react";

const AppButton = ({
  children,
  className,
  bgColour = "greenGradient",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  bgColour?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded ${bgColour} font-body ${className}`}
    >
      {children}
    </button>
  );
};

export default AppButton;
