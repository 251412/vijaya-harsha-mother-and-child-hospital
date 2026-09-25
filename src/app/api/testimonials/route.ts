import { NextResponse } from "next/server";
import { getTestimonialsList } from "@/lib/dataStore";

export async function GET() {
  try {
    const testimonials = await getTestimonialsList();
    return NextResponse.json({ success: true, count: testimonials.length, testimonials });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: "Failed to load testimonials" },
      { status: 500 }
    );
  }
}
