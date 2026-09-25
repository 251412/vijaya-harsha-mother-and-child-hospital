import { NextRequest, NextResponse } from "next/server";
import { hashActionToken } from "@/lib/crypto";
import { updateAppointmentStatusByToken, findAppointmentByTokenHash } from "@/lib/dataStore";
import { sendPatientAppointmentConfirmation, sendPatientAppointmentCancellation } from "@/lib/email";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const action = searchParams.get("action"); // "confirm" or "cancel"

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Validate parameters
  if (!token || (action !== "confirm" && action !== "cancel")) {
    return NextResponse.redirect(
      new URL(
        `/appointment-action?state=error&message=${encodeURIComponent(
          "Invalid or malformed appointment action request."
        )}`,
        siteUrl
      )
    );
  }

  try {
    const tokenHash = hashActionToken(token);
    const existing = await findAppointmentByTokenHash(tokenHash);

    if (!existing) {
      return NextResponse.redirect(
        new URL(
          `/appointment-action?state=error&message=${encodeURIComponent(
            "Appointment not found or this action link is invalid."
          )}`,
          siteUrl
        )
      );
    }

    if (existing.actionTokenUsed) {
      return NextResponse.redirect(
        new URL(
          `/appointment-action?state=already_used&appointmentId=${existing.appointmentId}&currentStatus=${existing.status}&message=${encodeURIComponent(
            `This action link has already been processed. The appointment is currently marked as ${existing.status}.`
          )}`,
          siteUrl
        )
      );
    }

    if (new Date(existing.actionTokenExpiresAt) < new Date()) {
      return NextResponse.redirect(
        new URL(
          `/appointment-action?state=expired&appointmentId=${existing.appointmentId}&message=${encodeURIComponent(
            "This action link has expired (validity is 72 hours)."
          )}`,
          siteUrl
        )
      );
    }

    if (existing.status !== "PENDING") {
      return NextResponse.redirect(
        new URL(
          `/appointment-action?state=already_decided&appointmentId=${existing.appointmentId}&currentStatus=${existing.status}&message=${encodeURIComponent(
            `This appointment is already ${existing.status} and cannot be modified again via this link.`
          )}`,
          siteUrl
        )
      );
    }

    const newStatus = action === "confirm" ? "CONFIRMED" : "CANCELLED";
    const updateResult = await updateAppointmentStatusByToken(tokenHash, newStatus);

    if (!updateResult.success || !updateResult.appointment) {
      return NextResponse.redirect(
        new URL(
          `/appointment-action?state=error&message=${encodeURIComponent(
            updateResult.error || "Failed to update appointment status."
          )}`,
          siteUrl
        )
      );
    }

    const updatedAppointment = updateResult.appointment;

    // Dispatch appropriate notification email to patient
    if (newStatus === "CONFIRMED") {
      await sendPatientAppointmentConfirmation(updatedAppointment);
    } else {
      await sendPatientAppointmentCancellation(updatedAppointment);
    }

    return NextResponse.redirect(
      new URL(
        `/appointment-action?state=success&action=${action}&appointmentId=${updatedAppointment.appointmentId}&patientName=${encodeURIComponent(
          updatedAppointment.patientName
        )}&doctorName=${encodeURIComponent(
          updatedAppointment.doctorName
        )}&preferredDate=${encodeURIComponent(
          updatedAppointment.preferredDate
        )}&preferredTime=${encodeURIComponent(updatedAppointment.preferredTime)}`,
        siteUrl
      )
    );
  } catch (err: any) {
    console.error("Appointment action execution error:", err);
    return NextResponse.redirect(
      new URL(
        `/appointment-action?state=error&message=${encodeURIComponent(
          "An unexpected error occurred while updating the appointment."
        )}`,
        siteUrl
      )
    );
  }
}
