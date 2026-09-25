import { NextRequest, NextResponse } from "next/server";
import { getServicesList } from "@/lib/dataStore";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;

  try {
    const services = await getServicesList(category, search);
    return NextResponse.json({ success: true, count: services.length, services });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: "Failed to load services" },
      { status: 500 }
    );
  }
}
