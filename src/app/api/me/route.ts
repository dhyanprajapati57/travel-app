import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = "mysecret";

export async function GET() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Not logged in" }, { status: 401 });
  }

  try {
    const user = jwt.verify(token, SECRET);
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}