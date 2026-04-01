"use client";

import Link from "next/link";
import { useState } from "react";
import HomeHeroSkeleton from "../app/componenets/Skeleton/homeSkeleton";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      
      {/* Skeleton Overlay */}
      {!isLoaded && <HomeHeroSkeleton />}

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        onLoadedData={() => setIsLoaded(true)}
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Travel App
        </h1>

        <p className="text-lg mb-8 max-w-xl">
          Book flights and hotels easily with Redux & Next.js
        </p>

        <div className="flex gap-4 mb-6">
          <Link
            href="/flights"
            className="bg-purple-600 px-6 py-3 rounded-lg hover:bg-purple-700 transition transform hover:scale-105"
          >
            See Flights
          </Link>

          <Link
            href="/hotels"
            className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
          >
            See Hotels
          </Link>
        </div>

        <div className="flex gap-3 flex-wrap justify-center">
          <Link href="/csr" className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">
            CSR
          </Link>
          <Link href="/isr" className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">
            ISR
          </Link>
          <Link href="/ssg" className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">
            SSG
          </Link>
          <Link href="/ssr" className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">
            SSR
          </Link>
        </div>
      </div>
    </div>
  );
}