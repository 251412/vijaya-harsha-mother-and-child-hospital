import { NextResponse } from "next/server";
import { emailDeliveryLogs } from "@/lib/email";

export async function GET() {
  return NextResponse.json({
    count: emailDeliveryLogs.length,
    recentEmails: emailDeliveryLogs,
  });
}
