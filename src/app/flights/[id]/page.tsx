"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Flight } from "../../../../types/flight";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function FlightDetails() {
  const params = useParams();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch flight
  useEffect(() => {
    const fetchFlight = async () => {
      const res = await fetch(`/api/flight/${params.id}`);
      if (!res.ok) {
        console.error("Flight not found");
        setFlight(null);
        return;
      }
      const data: Flight = await res.json();
      setFlight(data);
    };
    fetchFlight();
  }, [params.id]);

  // Booking
  const handleBooking = async () => {
    if (!flight) return;

    setLoading(true);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "flight",
          name: flight.airline,
          date: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        toast.error("Booking failed!");
        return;
      }

      toast.success("Flight booked successfully!");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Loading UI
  if (!flight)
    return (
      <p className="p-6 text-center text-gray-500 animate-pulse">
        Loading flight details...
      </p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-blue-100 p-5">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-purple-600 mb-4">
          {flight.airline}
        </h1>

        {/* Info */}
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold text-gray-900">From:</span>{" "}
            {flight.from}
          </p>
          <p>
            <span className="font-semibold text-gray-900">To:</span>{" "}
            {flight.to}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Price:</span>{" "}
            <span className="text-green-600 font-bold">
              ₹{flight.price}
            </span>
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
                  ? "bg-purple-300 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 active:scale-95 shadow-md hover:shadow-lg"
              }
            `}
          >
            {loading ? "Booking..." : "Book Flight"}
          </button>

          {/* Back Button */}
          <Link
            href="/flights"
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