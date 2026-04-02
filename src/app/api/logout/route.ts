import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.json({ success: true });

  res.cookies.set("token", "", {
    path: "/",              //  MUST MATCH LOGIN
    expires: new Date(0),   //  DELETE COOKIE
  });

  return res;
}