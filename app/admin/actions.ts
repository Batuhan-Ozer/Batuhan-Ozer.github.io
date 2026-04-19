"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME, createSessionValue } from "@/lib/auth";

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get("password") || "");

  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: "Şifre yanlış." };
  }

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, createSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  redirect("/panel");
}