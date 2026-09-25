import { NextRequest, NextResponse } from "next/server";
import { AppointmentSchema } from "@/lib/validations";
import { generateActionToken, hashActionToken, generateAppointmentId } from "@/lib/crypto";
import { saveAppointment } from "@/lib/dataStore";
import { sendHospitalAppointmentNotification, sendPatientAppointmentAcknowledgement } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Server-side Zod validation
    const validationResult = AppointmentSchema.safeParse(body);
    if (!validationResult.success) {
      const errorMap = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please check all required fields.",
          details: errorMap,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Cryptographically secure action token for doctor triage
    const rawActionToken = generateActionToken();
    const tokenHash = hashActionToken(rawActionToken);
    const appointmentId = generateAppointmentId();
    const tokenExpiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000); // 72 hours

    // Save appointment with status PENDING
    const savedAppointment = await saveAppointment({
      appointmentId,
      patientName: data.patientName,
      patientEmail: data.patientEmail,
      patientPhone: data.patientPhone,
      doctorId: data.doctorId,
      doctorName: data.doctorName,
      department: data.department,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      reason: data.reason,
      status: "PENDING",
      actionTokenHash: tokenHash,
      actionTokenExpiresAt: tokenExpiresAt,
      actionTokenUsed: false,
    });

    // Generate secure single-use action links for the hospital
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const confirmUrl = `${siteUrl}/api/appointments/action?token=${rawActionToken}&action=confirm`;
    const cancelUrl = `${siteUrl}/api/appointments/action?token=${rawActionToken}&action=cancel`;

    // Dispatch emails (hospital triage alert + patient acknowledgement)
    await Promise.allSettled([
      sendHospitalAppointmentNotification(savedAppointment, confirmUrl, cancelUrl),
      sendPatientAppointmentAcknowledgement(savedAppointment),
    ]);

    return NextResponse.json(
      {
        success: true,
        appointmentId,
        message: "Your appointment request has been submitted successfully. A confirmation email will follow.",
        data: {
          appointmentId,
          patientName: savedAppointment.patientName,
          doctorName: savedAppointment.doctorName,
          preferredDate: savedAppointment.preferredDate,
          preferredTime: savedAppointment.preferredTime,
          status: savedAppointment.status,
        },
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("API /api/appointments error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while booking your appointment. Please try again or call our reception.",
      },
      { status: 500 }
    );
  }
}
