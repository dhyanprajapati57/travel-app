"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { fetchHotels } from "../redux/slice/hotelslice";
import { RootState, AppDispatch } from "../redux/store";

import HotelCard from "../componenets/hotelcard";
import Button from "@/app/componenets/button";

export default function Hotels() {
  const dispatch = useDispatch<AppDispatch>();

  const { hotels, loading } = useSelector(
    (state: RootState) => state.hotels  
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  //  safe param access
  const city = searchParams?.get("city") || "";

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  //  safe filtering
  const filteredHotels = hotels?.filter((h) => {
    return city
      ? h?.city?.toLowerCase().includes(city.toLowerCase())
      : true;
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    //  already correct
    const cityVal = form.get("city")?.toString() || "";

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

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="mb-6 flex flex-col md:flex-row gap-3 bg-white/50 backdrop-blur-md p-4 rounded-lg"
        >
          <input
            name="city"
            placeholder="Search by city"
            defaultValue={city}
            className="px-3 py-2 rounded w-full text-black"
          />
          <Button className="bg-orange-600 hover:bg-orange-700 px-4 py-1 text-sm w-auto">
            Search
          </Button>
        </form>

        {/* Hotels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <p>Loading...</p>
          ) : filteredHotels?.length === 0 ? ( //  safe length
            <p className="text-center col-span-2">No hotels found</p>
          ) : (
            filteredHotels?.map((hotel) => ( //  safe map
              <HotelCard key={hotel?.id} hotel={hotel} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}