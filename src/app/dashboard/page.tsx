export const runtime = "nodejs";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import Link from "next/link";
import LogoutButton from "../componenets/logoutbutton";
import { User } from "../types/user";
import { Booking } from "../types/Booking";

const SECRET = "mysecret";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value; //  correct use

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
      allBookings = []; //  safe fallback
    }
  }

  //  optional chaining (defensive)
  const bookings = allBookings.filter(
    (b: Booking) => Number(b?.userId) === Number(user?.id)
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="dashbord.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

      <div className="relative z-20 max-w-4xl mx-auto mt-10 p-6 text-white">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="mb-6">
          {/*  safe rendering */}
          <h2 className="text-xl font-semibold">
            Welcome {user?.name}
          </h2>
          <p>{user?.email}</p>
        </div>

        <div className="flex gap-4 mb-6">
          <Link
            href="/flights"
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Flights
          </Link>
          <Link
            href="/hotels"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Hotels
          </Link>
        </div>

        <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>

        {bookings?.length === 0 ? ( //  optional chaining
          <p>No bookings yet</p>
        ) : (
          <ul className="space-y-3">
            {bookings?.map((b: Booking) => ( //  optional chaining
              <li key={b?.id} className="border p-3 rounded bg-black/50">
                <strong>{b?.type?.toUpperCase()}</strong> - {b?.name} <br />
                <span className="text-sm text-gray-200">
                  {b?.date}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}