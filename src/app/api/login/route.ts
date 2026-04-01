import users from "../../../../data/user.json";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = "mysecret"; 
export async function POST(req: Request) {
  const body = await req.json();

  const user = users.find(
    (u) => u.email === body.email && u.password === body.password
  );

  if (!user) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    SECRET,
    { expiresIn: "1d" }
  );

  const res = NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
  });

  //  Store JWT in cookie
  res.cookies.set("token", token, {
    httpOnly: false,
    path: "/",
  });

  return res;
}