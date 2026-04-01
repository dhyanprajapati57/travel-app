"use client";

import { Booking } from "../utils/types/Booking";

export default function BookingCard({ booking }: { booking: Booking }) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg hover:scale-[1.02] transition-all duration-300">
      
      {/* Type Badge */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs uppercase bg-blue-600 px-2 py-1 rounded text-white">
          {booking?.type}
        </span>
        <span className="text-xs text-gray-300">
          {booking?.date}
        </span>
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-white">
        {booking?.name}
      </h3>

      {/* Extra Info */}
      <p className="text-sm text-gray-300 mt-1">
        Booking ID: #{booking?.id}
      </p>
    </div>
  );
}