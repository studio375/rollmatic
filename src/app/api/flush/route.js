import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
    const tag = "all";
    revalidateTag(tag);
    return NextResponse.json({ flushed: true, now: Date.now(), tag: tag });
}
export async function GET(request) {
    return NextResponse.json({});
}