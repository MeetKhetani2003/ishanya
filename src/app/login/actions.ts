"use server";

import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getJwtSecretKey = () => {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || secret.length === 0) {
    // Provide a fallback for development if they haven't set it yet,
    // though in production this should definitely throw an error.
    return "fallback-dev-secret-key-do-not-use-in-prod";
  }
  return secret;
};

export async function login(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const validUser = process.env.ADMIN_USER;
  const validPass = process.env.ADMIN_PASSWORD;

  if (username === validUser && password === validPass) {
    // Credentials match, sign a JWT
    const token = await new SignJWT({ user: username })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h") // Session lasts 24 hours
      .sign(new TextEncoder().encode(getJwtSecretKey()));

    // Set HTTP-only cookie
    (await cookies()).set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    // Redirect to admin dashboard
    redirect("/admin");
  } else {
    // Return error message to display
    return { error: "Invalid username or password" };
  }
}
