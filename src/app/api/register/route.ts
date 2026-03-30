export const runtime = "nodejs";

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export async function POST(req: Request) {
  try {
    //  safer typing
    const body: Partial<User> = await req.json();

    const name = body?.name;
    const email = body?.email;
    const password = body?.password;

    //  validation using optional chaining
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "data", "user.json");

    //  ensure file exists
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, "[]");
    }

    //  safe read
    let users: User[] = [];

    try {
      const fileData = fs.readFileSync(filePath, "utf-8");
      users = fileData ? JSON.parse(fileData) : [];
    } catch {
      users = []; // fallback if corrupted
    }


    const existingUser = users.find((u) => u?.email === email);

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    //  create new user
    const newUser: User = {
      id: users.length + 1,
      name,
      email,
      password,
    };

    users.push(newUser);

    //  write file
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("REGISTER ERROR:", error);

    return NextResponse.json(
      {
        message:
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (error as any)?.message || "Internal Server Error", //  optional chaining
      },
      { status: 500 }
    );
  }
}