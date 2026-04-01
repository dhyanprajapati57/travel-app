export const runtime = "nodejs";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import Link from "next/link";
import BookingCard from "../../componenets/BookingCard";
import { User } from "../../utils/types/user";
import { Booking } from "../../utils/types/Booking";

const SECRET = "mysecret";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let user: User;

  try {
    user = jwt.verify(token, SECRET) as User;
  } catch {
    redirect("/login");
  }

  const filePath = path.join(process.cwd(), "data", "bookings.json");

  let allBookings: Booking[] = [];

  if (fs.existsSync(filePath)) {
    try {
      const fileData = fs.readFileSync(filePath, "utf-8");
      allBookings = fileData ? JSON.parse(fileData) : [];
    } catch {
      allBookings = [];
    }
  }

  const bookings = allBookings.filter(
    (b: Booking) => Number(b?.userId) === Number(user?.id)
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="dashbord.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto mt-10 p-6 text-white">
        
        {/* Header */}
        <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

        {/* User Info */}
        <div className="mb-8 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
          <h2 className="text-xl font-semibold">
            Welcome {user?.name}
          </h2>
          <p className="text-gray-300">{user?.email}</p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mb-8">
          <Link
            href="/flights"
            className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg transition"
          >
            Flights
          </Link>

          <Link
            href="/hotels"
            className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg transition"
          >
            Hotels
          </Link>
        </div>

        {/* Bookings Section */}
        <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>

        {bookings?.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-center">
            <p className="text-gray-300">No bookings yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {bookings.map((b: Booking) => (
              <BookingCard key={b?.id} booking={b} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}