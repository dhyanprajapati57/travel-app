"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Flight } from "../../types/flight";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import Button from "../../componenets/button";
import axios from "../../lib/axios"; //  Axios

export default function FlightDetails() {
  const params = useParams();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  //  Fetch flight using Axios
  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const res = await axios.get(`/flight/${params.id}`);
        setFlight(res.data);
      } catch (error) {
        console.error("Flight not found", error);
        setFlight(null);
      } finally {
        setFetchLoading(false);
      }
    };

    if (params.id) fetchFlight();
  }, [params.id]);

  //  Booking using Axios
  const handleBooking = async () => {
    if (!flight) return;

    setLoading(true);

    try {
      await axios.post("/book", {
        type: "flight",
        name: flight.airline,
        date: new Date().toISOString(),
      });

      toast.success("Flight booked successfully!");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Booking failed!");
    } finally {
      setLoading(false);
    }
  };

  //  Loading UI
  if (fetchLoading) {
    return (
      <p className="p-6 text-center text-gray-500 animate-pulse">
        Loading flight details...
      </p>
    );
  }

  //  No flight found
  if (!flight) {
    return (
      <p className="p-6 text-center text-red-500">
        Flight not found
      </p>
    );
  }

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
          <Button
            onClick={handleBooking}
            disabled={loading}
            className="flex-1 bg-purple-600 hover:bg-purple-700"
          >
            {loading ? "Booking..." : "Book Flight"}
          </Button>

          {/* Back Button */}
          <Link
            href="/flights"
            className="flex-1 text-center py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all duration-300 active:scale-95 shadow-sm"
          >
            Back
          </Link>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}