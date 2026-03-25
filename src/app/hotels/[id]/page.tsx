"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Hotel } from "../../../../types/hotel";
import Button from "../../../../componenets/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function HotelDetails() {
  const params = useParams();
  const router = useRouter();

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch hotel
  useEffect(() => {
    const fetchHotel = async () => {
      const res = await fetch(`/api/hotels/${params.id}`);
      const data: Hotel = await res.json();
      setHotel(data);
    };
    fetchHotel();
  }, [params.id]);

  // Booking
  const handleBooking = async () => {
    if (!hotel) return;

    setLoading(true);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "hotel",
          name: hotel.name,
          date: new Date().toISOString(),
        }),
      });

      if (res.status === 401) {
        toast.error("Please login first!");
        setTimeout(() => router.push("/login"), 1000);
        return;
      }

      if (!res.ok) {
        toast.error("Booking failed!");
        return;
      }

      toast.success("Hotel booked successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (!hotel)
    return (
      <p className="p-6 text-center text-gray-500 animate-pulse">
        Loading hotel details...
      </p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-5">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          {hotel.name}
        </h1>

        {/* Info */}
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold text-gray-900">City:</span>{" "}
            {hotel.city}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Price:</span>{" "}
            <span className="text-green-600 font-bold">
              ₹{hotel.price}
            </span>{" "}
            / night
          </p>
        </div>

        {/* Divider */}
        <div className="my-5 border-t"></div>

        {/* Buttons */}
        <div className="flex gap-4">
          {/* Book Button */}
          <button
            onClick={handleBooking}
            disabled={loading}
            className={`
              flex-1 py-2 rounded-lg font-medium text-white transition-all duration-300
              ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-md hover:shadow-lg"
              }
            `}
          >
            {loading ? "Booking..." : "Book Hotel"}
          </button>

          {/* Back Button */}
          <Link
            href="/hotels"
            className="flex-1 text-center py-2 rounded-lg bg-gray-200 text-gray-800 
            hover:bg-gray-300 transition-all duration-300 active:scale-95 shadow-sm"
          >
            Back
          </Link>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}