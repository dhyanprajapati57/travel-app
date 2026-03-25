"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FlightCard from "../../../componenets/flightcard";
import { Flight } from "../../../types/flight";

export default function Flights() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";

  useEffect(() => {
    fetch("/api/flight")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((f: Flight) => {
          return (
            (from ? f.from.toLowerCase().includes(from.toLowerCase()) : true) &&
            (to ? f.to.toLowerCase().includes(to.toLowerCase()) : true)
          );
        });
        setFlights(filtered);
      });
  }, [from, to]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const fromVal = form.get("from")?.toString() || "";
    const toVal = form.get("to")?.toString() || "";

    router.push(`/flights?from=${fromVal}&to=${toVal}`);
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
        <source src="/video2.mp4" type="video/mp4" />
      </video>

    
      <div className="fixed top-0 left-0 w-full h-full bg-black/60 -z-10"></div>

    
      <div className="max-w-5xl mx-auto p-6 text-white">
        
        <h1 className="text-4xl font-bold mb-6 text-center">
           Available Flights
        </h1>

        <form
          onSubmit={handleSearch}
          className="mb-6 flex flex-col md:flex-row gap-3 bg-white/20 backdrop-blur-md p-4 rounded-lg"
        >
          <input
            name="from"
            placeholder="From"
            defaultValue={from}
            className="px-3 py-2 rounded w-full text-black"
          />
          <input
            name="to"
            placeholder="To"
            defaultValue={to}
            className="px-3 py-2 rounded w-full text-black"
          />
          <button className="bg-orange-600 text-white px-4 rounded hover:bg-orange-700">
            Search
          </button>
        </form>

    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {flights.length === 0 ? (
            <p className="text-center col-span-2">No flights found </p>
          ) : (
            flights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))
          )}
        </div>

      </div>
    </div>
  );
}