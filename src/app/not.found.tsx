"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center p-6 bg-yellow-50 rounded shadow">
        <h1 className="text-3xl font-bold text-yellow-600 mb-2">404 - Page Not Found</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          Go Home
        </Link>
      </div>
    </div>
  );
}