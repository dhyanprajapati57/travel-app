"use client";
import { Hotel } from "../types/hotel";
import Link from "next/link";

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  return (
    <Link href={`/hotels/${hotel.id}`} className="block">
      <div className="border p-4 rounded shadow hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
        <h2 className="text-lg font-bold">{hotel.name}</h2>
        <p className="text-white-600">Location: {hotel.city}</p>
        <p className="text-white-800 font-medium">Price per night: ₹{hotel.price}</p>
        <div className="mt-2 bg-blue-600 text-white px-3 py-1 rounded inline-block hover:bg-blue-700 transition-colors duration-300">
          View Details
        </div>
      </div>
    </Link>
  );
}   