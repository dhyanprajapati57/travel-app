import users from "../../../../data/user.json";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 });
  }
    // Create new user object
  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);

  // Write to file
  const filePath = path.join(process.cwd(), "data", "users.json");
  //Save updated users array back to file
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    //send success response
  return NextResponse.json({ message: "User registered" });
}