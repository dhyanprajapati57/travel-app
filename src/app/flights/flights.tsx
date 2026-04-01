"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getFlights } from "../redux/slice/flight.slice";
import { RootState, AppDispatch } from "../redux/store";

import FlightCard from "../componenets/flightcard";
import Button from "../componenets/common/button";

import {
  addSearchHistory,
  getSearchHistory,
  clearSearchHistory,
} from "@/lib/indexedDB";

import FlightCardSkeleton from "@/app/componenets/Skeleton/flightskeleton";
import HistorySkeleton from "@/app/componenets/Skeleton/historyskeleton";

export default function Flights() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { flights = [], loading, error } = useSelector(
    (state: RootState) => state.flights
  );

  const searchParams = useSearchParams();

  const from = searchParams?.get("from") || "";
  const to = searchParams?.get("to") || "";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [history, setHistory] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (flights.length === 0) {
      dispatch(getFlights());
    }
  }, [dispatch, flights.length]);

  useEffect(() => {
    if (!isClient) return;

    const loadHistory = async () => {
      try {
        const data = await getSearchHistory();
        setHistory(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoaded(true);
      }
    };

    loadHistory();
  }, [isClient, searchParams]);

  useEffect(() => {
    const handleFocus = async () => {
      const data = await getSearchHistory();
      setHistory(data || []);
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  //  Better loading state
  const isInitialLoading = loading && flights.length === 0;

  const filteredFlights = flights.filter((f) => {
    return (
      (from ? f?.from?.toLowerCase().includes(from.toLowerCase()) : true) &&
      (to ? f?.to?.toLowerCase().includes(to.toLowerCase()) : true)
    );
  });

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const fromVal = form.get("from")?.toString() || "";
    const toVal = form.get("to")?.toString() || "";

    if (fromVal && toVal) {
      const newItem = {
        id: Date.now(),
        from: fromVal,
        to: toVal,
        date: new Date().toISOString(),
      };

      setHistory((prev) => [newItem, ...prev].slice(0, 5));
      await addSearchHistory(newItem);
    }

    router.push(`/flights?from=${fromVal}&to=${toVal}`);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
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

        {/* Search */}
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

        {/* History */}
        <div className="mb-6 bg-white/40 backdrop-blur-md p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-black">Recent Searches</h3>

            <button
              onClick={async () => {
                await clearSearchHistory();
                setHistory([]);
              }}
              className="text-red-500 text-sm"
            >
              Clear
            </button>
          </div>

          {!isClient || !isLoaded ? (
            <HistorySkeleton />
          ) : history.length === 0 ? (
            <p className="text-sm text-gray-700">No recent searches</p>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer text-black border-b py-2 hover:bg-gray-200 px-2 rounded"
                onClick={() => {
                  router.push(`/flights?from=${item.from}&to=${item.to}`);
                }}
              >
                {item.from} → {item.to}
              </div>
            ))
          )}
        </div>

        {/* Flights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isInitialLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <FlightCardSkeleton key={i} />
            ))
          ) : error ? (
            <p className="text-red-400 col-span-2 text-center">
              {error}
            </p>
          ) : filteredFlights.length === 0 ? (
            <p className="text-center col-span-2">No flights found</p>
          ) : (
            filteredFlights.map((flight) => (
              <FlightCard key={flight?.id} flight={flight} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}