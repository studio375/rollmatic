"use server";
import { headers } from "next/headers";

export async function getClientIp() {
  const h = await headers();

  const realIp = h.get("x-real-ip");
  if (realIp) return realIp.trim();

  const forwardedFor = h.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  return "";
}