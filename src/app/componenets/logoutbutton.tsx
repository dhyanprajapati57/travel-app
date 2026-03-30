"use client";

import { useRouter } from "next/navigation";
import axios from "../lib/axios"; // adjust path if needed

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/logout"); // baseURL = /api
      router.push("/");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
}