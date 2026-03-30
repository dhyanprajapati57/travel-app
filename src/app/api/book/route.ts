import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET = "mysecret";

type User = {
  id: number;
  name: string;
  email: string;
};

type Booking = {
  id: number;
  userId: number;
  type: "flight" | "hotel";
  name: string;
  date: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    //  Get token (optional chaining already correct)
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Please login first" },
        { status: 401 }
      );
    }

    let user: User;

    try {

      user = jwt.verify(token, SECRET) as User;
    } catch {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    //  File path
    const filePath = path.join(process.cwd(), "data", "bookings.json");

    //  Ensure file exists
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, "[]");
    }

    //  Safe read
    let bookings: Booking[] = [];

    try {
      const fileData = fs.readFileSync(filePath, "utf-8");
      bookings = fileData ? JSON.parse(fileData) : [];
    } catch {
      bookings = []; // fallback if file corrupted
    }

    //  Validation (use optional chaining here)
    if (!body?.type || !body?.name || !body?.date) {
      return NextResponse.json(
        { message: "Invalid booking data" },
        { status: 400 }
      );
    }

    //  New booking (safe user access optional but good practice)
    const newBooking: Booking = {
      id: Date.now(),
      userId: user?.id, // safe (though user always exists here)
      type: body.type,
      name: body.name,
      date: body.date,
    };

    bookings.push(newBooking);

    //  Save
    fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2));

    return NextResponse.json({ message: "Booked successfully" });

  } catch (error) {
    return NextResponse.json(
      {
        message:
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (error as any)?.message || "Something went wrong", //  optional chaining
      },
      { status: 500 }
    );
  }
}