import { NextResponse } from "next/server";
import { getTranslatedSlug } from "@/helpers/api/fetch-api";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
 
  const path = searchParams.get("path");
  const slug = searchParams.get("slug");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  if (!path || !slug || !from || !to) {
    return NextResponse.json(
      { error: "Missing params: path, slug, from, to" },
      { status: 400 },
    );
  }
  
  const translatedSlug = await getTranslatedSlug(path, slug, from, to);

  if (!translatedSlug) {
    return NextResponse.json(
      { error: "Translation not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ slug: translatedSlug });
}