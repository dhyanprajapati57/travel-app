"use client";
import { Flight } from "../types/flight";
import Link from "next/link";

interface FlightCardProps {
  flight: Flight;
}

export default function FlightCard({ flight }: FlightCardProps) {
  return (
    <Link href={`/flights/${flight.id}`} className="block">
      <div className="border p-4 rounded shadow hover:shadow-lg hover:scale-105 transition-transform transition-shadow duration-300 cursor-pointer">
        <h2 className="text-lg font-bold">{flight.airline}</h2>
        <p className="text-white-600">{flight.from} → {flight.to}</p>
        <p className="text-white-600 font-medium">Price: ₹{flight.price}</p>
        <div className="mt-2 bg-purple-600 text-white px-3 py-1 rounded inline-block hover:bg-purple-700 transition-colors duration-300">
          View Details
        </div>
      </div>
    </Link>
  );
}