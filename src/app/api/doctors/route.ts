import { NextRequest, NextResponse } from "next/server";
import { getDoctorsList } from "@/lib/dataStore";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const department = searchParams.get("department") || undefined;
  const search = searchParams.get("search") || undefined;

  try {
    const doctors = await getDoctorsList(department, search);
    return NextResponse.json({ success: true, count: doctors.length, doctors });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: "Failed to load doctors" },
      { status: 500 }
    );
  }
}
