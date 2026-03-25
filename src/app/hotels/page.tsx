"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import HotelCard from "../../../componenets/hotelcard";
import { Hotel } from "../../../types/hotel";

export default function Hotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const city = searchParams.get("city") || "";

  useEffect(() => {
    fetch("/api/hotels")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((h: Hotel) => {
          return city
            ? h.city.toLowerCase().includes(city.toLowerCase())
            : true;
        });
        setHotels(filtered);
      });
  }, [city]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const cityVal = form.get("city");

    router.push(`/hotels?city=${cityVal}`);
  };

  return (
      <div className="relative min-h-screen">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src="/video3.mp4" type="video/mp4" />
        </video>

        <div className="fixed top-0 left-0 w-full h-full bg-black/60 -z-10"></div>

        <div className="relative z-10 max-w-5xl mx-auto p-6 text-white">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Available Hotels
          </h1>

          <form
            onSubmit={handleSearch}
            className="mb-6 flex flex-col md:flex-row gap-3 bg-white/20 backdrop-blur-md p-4 rounded-lg"
          >
            <input
              name="city"
              placeholder="Search by city"
              defaultValue={city}
              className="px-3 py-2 rounded w-full text-black"
            />
            <button className="bg-orange-600 text-white px-4 rounded hover:bg-orange-700">
              Search
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotels.length === 0 ? (
              <p className="text-center col-span-2">No hotels found </p>
            ) : (
              hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
            )}
          </div>
        </div>
      </div>
  );
}
