"use client";
import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center p-6 bg-red-50 rounded shadow">
        <h1 className="text-3xl font-bold text-red-600 mb-2">Something went wrong</h1>
        <p className="text-gray-700 mb-4">{error.message}</p>
        <button
          onClick={() => reset()}
          className="text-blue-600 hover:underline"
        >
          Try Again
        </button>
      </div>
    </div>
  );
} 