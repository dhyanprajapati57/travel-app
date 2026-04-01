"use client";

import { useEffect, useState, useMemo, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { getHotelList } from "../redux/slice/hotel.slice";
import { RootState, AppDispatch } from "../redux/store";

import HotelCard from "../componenets/hotelcard";
import Button from "@/app/componenets/common/button";

export default function Hotels() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { data: hotels, loading } = useSelector(
    (state: RootState) => state.hotels
  );

  const searchParams = useSearchParams();

  //  useTransition
  const [isPending, startTransition] = useTransition();

  // Get city from URL
  const city = searchParams?.get("city") || "";

  // Controlled states
  const [searchCity, setSearchCity] = useState(city);
  const [sortOrder, setSortOrder] = useState("");

  // Sync input with URL
  useEffect(() => {
    setSearchCity(city);
  }, [city]);

  // Fetch hotels
  useEffect(() => {
    dispatch(getHotelList());
  }, [dispatch]);

  // Filter + Sort
const filteredHotels = useMemo(() => {
  let filtered = (hotels || []).filter((h) => {
    if (!searchCity) return true;

    return h?.city
      ?.toLowerCase()
      .trim()
      .includes(searchCity.toLowerCase().trim());
  });

  if (sortOrder === "low") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  return filtered;
}, [hotels, searchCity, sortOrder]);

  //  Search handler with transition
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      router.push(`/hotels?city=${searchCity}`);
    });
  };

  return (
    <div className="relative min-h-screen">
      {/* Background video */}
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

        {/*  Search */}
        <form
          onSubmit={handleSearch}
          className="mb-6 flex flex-col md:flex-row gap-3 bg-white/50 backdrop-blur-md p-4 rounded-lg"
        >
          <input
            name="city"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)} 
            placeholder="Search by city"
            className="px-3 py-2 rounded w-full text-black"
          />

          <Button
            type="submit"
            disabled={isPending}
            className="bg-orange-500 hover:bg-orange-700 px-4 py-1 text-sm w-auto"
          >
            {isPending ? "Searching..." : "Search"}
          </Button>
        </form>

        {/*  Sort */}
        <div className="mb-4 flex justify-end">
          <select
            value={sortOrder}
            onChange={(e) => {
              const value = e.target.value;

              
              startTransition(() => {
                setSortOrder(value);
              });
            }}
            className="bg-orange-500 text-white hover:bg-orange-700 px-3 py-2 rounded-md shadow-md border focus:outline-none focus:ring-2 text-sm"
          >
            <option value="">Sort by Price</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
        </div>

        {/*  Hotels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading || isPending ? (
            <p>Loading...</p>
          ) : filteredHotels?.length === 0 ? (
            <p className="text-center col-span-2">No hotels found</p>
          ) : (
            filteredHotels?.map((hotel) => (
              <HotelCard key={hotel?.id} hotel={hotel} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}