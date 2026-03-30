import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}

export default function Button({
  children,
  onClick,
  disabled,
  type = "button",
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type} 
      onClick={onClick}
      disabled={disabled}
      className={`py-2 rounded-lg text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg ${
  disabled
    ? "bg-gray-400 cursor-not-allowed"
    : "bg-blue-600 hover:bg-blue-700 active:scale-95"
} ${className}`}
    >
      {children}
    </button>
  );
}