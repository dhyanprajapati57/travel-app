"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Hotel } from "../../utils/types/hotel";
import Button from "../../componenets/common/button";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import axios from "../../lib/axios/axios";

export default function HotelDetails() {
  const params = useParams();
  const router = useRouter();

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        //  safe param access
        const res = await axios.get(`/hotels/${params?.id}`);
        setHotel(res?.data);
      } catch (error) {
        console.error("Hotel not found", error);
        setHotel(null);
      } finally {
        setFetchLoading(false);
      }
    };

    if (params?.id) fetchHotel(); //  safe check
  }, [params?.id]);

  const handleBooking = async () => {
    if (!hotel) return;

    setLoading(true);

    try {
      await axios.post("/book", {
        type: "hotel",
        name: hotel?.name, //  safe
        date: new Date().toISOString(),
      });

      toast.success("Hotel booked successfully!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      //  already correct usage
      if (error?.response?.status === 401) {
        toast.error("Please login first!");
        setTimeout(() => router.push("/login"), 1000);
      } else {
        // optional chaining for message
        const msg =
          error?.response?.data?.message || "Booking failed!";
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  // Loading UI
  if (fetchLoading) {
    return (
      <p className="p-6 text-center text-gray-500 animate-pulse">
        Loading hotel details...
      </p>
    );
  }

  // Not found
  if (!hotel) {
    return (
      <p className="p-6 text-center text-red-500">
        Hotel not found
      </p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-5">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          {hotel?.name}
        </h1>

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold text-gray-900">City:</span>{" "}
            {hotel?.city}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Price:</span>{" "}
            <span className="text-green-600 font-bold">
              ₹{hotel?.price}
            </span>{" "}
            / night
          </p>
        </div>

        <div className="my-5 border-t"></div>

        <div className="flex gap-4">
          <Button
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
          </Button>

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