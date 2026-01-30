import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const validUser = process.env.ADMIN_USER;
    const validPass = process.env.ADMIN_PASSWORD;

    if (username === validUser && password === validPass) {
      // Create JWT token
      const token = jwt.sign(
        { username, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );

      // Create response
      const response = NextResponse.json(
        { message: "Login successful" },
        { status: 200 },
      );

      // Set cookie
      response.cookies.set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 86400, // 1 day
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 },
    );
  }
}
