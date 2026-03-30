"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlights } from "../redux/slice/flightslice";
import { RootState, AppDispatch } from "../redux/store";

import FlightCard from "../componenets/flightcard";
import Button from "../componenets/button";

export default function Flights() {
  const dispatch = useDispatch<AppDispatch>();

  const { flights, loading, error } = useSelector(
    (state: RootState) => state.flights
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  //  optional chaining (safe URL params)
  const from = searchParams?.get("from") || "";
  const to = searchParams?.get("to") || "";

  useEffect(() => {
    if (flights?.length === 0) { //  safe check
      dispatch(fetchFlights());
    }
  }, [dispatch, flights?.length]);

  //  filter with safe access
  const filteredFlights = flights?.filter((f) => {
    return (
      (from
        ? f?.from?.toLowerCase().includes(from.toLowerCase())
        : true) &&
      (to
        ? f?.to?.toLowerCase().includes(to.toLowerCase())
        : true)
    );
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    //  already correct use
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

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="mb-6 flex flex-col md:flex-row gap-3 bg-white/60 backdrop-blur-md p-4 rounded-lg"
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

          <Button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 px-4 py-1 text-sm w-auto"
          >
            Search
          </Button>
        </form>

        {/* Flights List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Loading */}
          {loading && <p>Loading...</p>}

          {/* Error */}
          {!loading && error && (
            <p className="text-red-400 col-span-2 text-center">
              {error}
            </p>
          )}

          {/* No Data */}
          {!loading && !error && filteredFlights?.length === 0 && (
            <p className="text-center col-span-2">No flights found</p>
          )}

          {/* Data */}
          {!loading &&
            !error &&
            filteredFlights?.map((flight) => (
              <FlightCard key={flight?.id} flight={flight} />
            ))}
        </div>
      </div>
    </div>
  );
}