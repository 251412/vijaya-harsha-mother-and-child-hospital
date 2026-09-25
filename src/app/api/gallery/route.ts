import { NextRequest, NextResponse } from "next/server";
import { getGalleryItems } from "@/lib/dataStore";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || undefined;

  try {
    const items = await getGalleryItems(category);
    return NextResponse.json({ success: true, count: items.length, items });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: "Failed to load gallery items" },
      { status: 500 }
    );
  }
}
