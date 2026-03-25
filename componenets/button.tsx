import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;   //  ADD THIS
}

export default function Button({ children, onClick, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}   //  PASS IT
      className={`px-4 py-2 rounded text-white ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"   //  disabled style
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {children}
    </button>
  );
}