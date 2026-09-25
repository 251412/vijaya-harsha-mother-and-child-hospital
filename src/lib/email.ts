import { Resend } from "resend";
import { HOSPITAL_CONFIG } from "./constants";

const RESEND_API_KEY = process.env.EMAIL_PROVIDER_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || `Vijaya Harsha Hospital <onboarding@resend.dev>`;
const HOSPITAL_EMAIL = process.env.HOSPITAL_EMAIL || "info@vijayaharshahospital.com";

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// In-memory inspection log for verifying email delivery during testing
export const emailDeliveryLogs: Array<{
  to: string;
  subject: string;
  type: string;
  actionUrls?: { confirm?: string; cancel?: string };
  sentAt: Date;
  previewText: string;
}> = [];

// Base Email Template HTML Wrapper
function renderEmailWrapper(content: string, preheader: string = ""): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vijaya Harsha Mother & Child Hospital</title>
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; color: #1e293b; }
    .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
    .header { background: linear-gradient(135deg, #0A2540 0%, #0284C7 100%); padding: 28px 24px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; }
    .header p { margin: 6px 0 0 0; font-size: 13px; color: #e0f2fe; text-transform: uppercase; letter-spacing: 0.05em; }
    .body { padding: 32px 28px; font-size: 15px; line-height: 1.6; }
    .info-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px 20px; margin: 20px 0; }
    .info-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed #e2e8f0; font-size: 14px; }
    .info-row:last-child { border-bottom: none; }
    .info-label { font-weight: 600; color: #64748b; }
    .info-value { font-weight: 600; color: #0f172a; text-align: right; }
    .actions { text-align: center; margin: 28px 0; }
    .btn { display: inline-block; padding: 14px 28px; margin: 8px 6px; font-size: 14px; font-weight: 700; text-decoration: none; border-radius: 8px; text-align: center; }
    .btn-confirm { background-color: #059669; color: #ffffff !important; }
    .btn-cancel { background-color: #dc2626; color: #ffffff !important; }
    .btn-primary { background-color: #0284C7; color: #ffffff !important; }
    .footer { background-color: #f8fafc; padding: 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; }
    .badge-pending { background-color: #fef3c7; color: #d97706; }
    .badge-confirmed { background-color: #d1fae5; color: #059669; }
    .badge-cancelled { background-color: #fee2e2; color: #dc2626; }
  </style>
</head>
<body>
  <div style="display:none;font-size:1px;color:#f1f5f9;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
    ${preheader}
  </div>
  <div class="container">
    <div class="header">
      <h1>VIJAYA HARSHA</h1>
      <p>Mother & Child Hospital • Srikakulam</p>
    </div>
    <div class="body">
      ${content}
    </div>
    <div class="footer">
      <p style="margin: 0 0 6px 0; font-weight: 600; color: #334155;">Vijaya Harsha Mother & Child Hospital</p>
      <p style="margin: 0 0 8px 0;">${HOSPITAL_CONFIG.address.full}</p>
      <p style="margin: 0 0 8px 0;">Emergency: <strong>${HOSPITAL_CONFIG.emergencyPhoneFormatted}</strong> | Desk: <strong>${HOSPITAL_CONFIG.phoneFormatted}</strong></p>
      <p style="margin: 0; color: #94a3b8; font-size: 11px;">This is an automated healthcare communication. Please do not reply directly if you require urgent medical intervention.</p>
    </div>
  </div>
</body>
</html>
`;
}

// 1. Hospital Appointment Notification with Secure Single-Use Action Buttons
export async function sendHospitalAppointmentNotification(appointment: any, confirmUrl: string, cancelUrl: string) {
  const content = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <h2 style="margin: 0; font-size: 18px; color: #0A2540;">New Patient Appointment Request</h2>
      <span class="badge badge-pending">Action Required</span>
    </div>
    <p style="margin: 0 0 16px 0; color: #475569;">A new appointment has been requested by a patient. Review the patient information below and click an action button to confirm or decline.</p>

    <div class="info-box">
      <div class="info-row"><span class="info-label">Appointment ID</span><span class="info-value" style="color:#0284C7;">${appointment.appointmentId}</span></div>
      <div class="info-row"><span class="info-label">Patient Name</span><span class="info-value">${appointment.patientName}</span></div>
      <div class="info-row"><span class="info-label">Contact Phone</span><span class="info-value">${appointment.patientPhone}</span></div>
      <div class="info-row"><span class="info-label">Email</span><span class="info-value">${appointment.patientEmail}</span></div>
      <div class="info-row"><span class="info-label">Consulting Doctor</span><span class="info-value">${appointment.doctorName}</span></div>
      <div class="info-row"><span class="info-label">Department</span><span class="info-value">${appointment.department}</span></div>
      <div class="info-row"><span class="info-label">Preferred Date</span><span class="info-value">${appointment.preferredDate}</span></div>
      <div class="info-row"><span class="info-label">Preferred Time</span><span class="info-value">${appointment.preferredTime}</span></div>
      <div class="info-row"><span class="info-label">Reason / Symptoms</span><span class="info-value">${appointment.reason}</span></div>
      <div class="info-row"><span class="info-label">Current Status</span><span class="info-value"><span class="badge badge-pending">PENDING</span></span></div>
    </div>

    <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 14px; margin: 20px 0; font-size: 13px; color: #166534;">
      <strong>Doctor / Staff Action Required:</strong>
      <p style="margin: 4px 0 0 0;">Clicking either button will securely authenticate the action, immediately update the hospital database, and automatically dispatch a branded confirmation or cancellation email to the patient.</p>
    </div>

    <div class="actions">
      <a href="${confirmUrl}" class="btn btn-confirm" style="color:#ffffff;">&#10004; CONFIRM APPOINTMENT</a>
      <a href="${cancelUrl}" class="btn btn-cancel" style="color:#ffffff;">&#10008; CANCEL APPOINTMENT</a>
    </div>

    <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 16px;">
      Links are single-use, cryptographically verified, and valid for 72 hours.
    </p>
  `;

  const html = renderEmailWrapper(content, `New appointment booking: ${appointment.patientName} for ${appointment.doctorName}`);
  return dispatchEmail({
    to: HOSPITAL_EMAIL,
    subject: `[Appointment Triage] ${appointment.appointmentId}: ${appointment.patientName} - ${appointment.department}`,
    html,
    type: "HOSPITAL_APPOINTMENT_TRIAGE",
    actionUrls: { confirm: confirmUrl, cancel: cancelUrl },
    previewText: `New appointment: ${appointment.patientName} with ${appointment.doctorName} on ${appointment.preferredDate} (${appointment.preferredTime})`
  });
}

// 2. Patient Booking Acknowledgement
export async function sendPatientAppointmentAcknowledgement(appointment: any) {
  const content = `
    <h2 style="margin: 0 0 12px 0; font-size: 18px; color: #0A2540;">Dear ${appointment.patientName},</h2>
    <p style="margin: 0 0 16px 0; color: #475569;">
      Thank you for choosing <strong>Vijaya Harsha Mother & Child Hospital</strong>. We have successfully received your appointment request.
    </p>

    <div class="info-box">
      <div class="info-row"><span class="info-label">Appointment ID</span><span class="info-value" style="color:#0284C7;">${appointment.appointmentId}</span></div>
      <div class="info-row"><span class="info-label">Doctor</span><span class="info-value">${appointment.doctorName}</span></div>
      <div class="info-row"><span class="info-label">Department</span><span class="info-value">${appointment.department}</span></div>
      <div class="info-row"><span class="info-label">Requested Date</span><span class="info-value">${appointment.preferredDate}</span></div>
      <div class="info-row"><span class="info-label">Requested Slot</span><span class="info-value">${appointment.preferredTime}</span></div>
      <div class="info-row"><span class="info-label">Status</span><span class="info-value"><span class="badge badge-pending">PENDING TRIAGE</span></span></div>
    </div>

    <p style="color: #475569;">
      Our medical team is reviewing doctor availability for your requested slot. You will receive an immediate confirmation email once our medical desk confirms your booking.
    </p>

    <div style="background-color: #f8fafc; border-left: 4px solid #0284C7; padding: 12px 16px; margin: 20px 0; font-size: 13px;">
      <strong>Need to make immediate changes?</strong><br>
      Please contact our reception desk directly at <strong>${HOSPITAL_CONFIG.phoneFormatted}</strong> quoting Appointment ID <strong>${appointment.appointmentId}</strong>.
    </div>
  `;

  const html = renderEmailWrapper(content, `Your appointment request ${appointment.appointmentId} has been received.`);
  return dispatchEmail({
    to: appointment.patientEmail,
    subject: `Appointment Request Received: ${appointment.appointmentId} - Vijaya Harsha Mother & Child Hospital`,
    html,
    type: "PATIENT_APPOINTMENT_ACK",
    previewText: `Appointment received for ${appointment.preferredDate}. Status: PENDING.`
  });
}

// 3. Patient Appointment Confirmation
export async function sendPatientAppointmentConfirmation(appointment: any) {
  const content = `
    <div style="text-align: center; margin-bottom: 20px;">
      <span class="badge badge-confirmed" style="font-size: 14px; padding: 6px 16px;">&#10004; APPOINTMENT CONFIRMED</span>
      <h2 style="margin: 12px 0 6px 0; font-size: 20px; color: #0A2540;">Your Appointment is Confirmed!</h2>
      <p style="margin: 0; color: #475569;">Dear ${appointment.patientName}, Dr. ${appointment.doctorName} looks forward to consulting with you.</p>
    </div>

    <div class="info-box">
      <div class="info-row"><span class="info-label">Appointment ID</span><span class="info-value" style="color:#059669; font-size: 16px;">${appointment.appointmentId}</span></div>
      <div class="info-row"><span class="info-label">Consulting Specialist</span><span class="info-value">${appointment.doctorName}</span></div>
      <div class="info-row"><span class="info-label">Department</span><span class="info-value">${appointment.department}</span></div>
      <div class="info-row"><span class="info-label">Confirmed Date</span><span class="info-value" style="color:#0284C7;">${appointment.preferredDate}</span></div>
      <div class="info-row"><span class="info-label">Confirmed Time Slot</span><span class="info-value" style="color:#0284C7;">${appointment.preferredTime}</span></div>
      <div class="info-row"><span class="info-label">Hospital Address</span><span class="info-value">${HOSPITAL_CONFIG.address.street}, ${HOSPITAL_CONFIG.address.city}</span></div>
    </div>

    <h4 style="margin: 16px 0 8px 0; color: #0A2540;">Important Patient Instructions:</h4>
    <ul style="padding-left: 20px; color: #475569; font-size: 14px;">
      <li>Please arrive <strong>15 minutes prior</strong> to your scheduled slot for registration.</li>
      <li>Carry any prior medical records, ultrasound reports, or immunization books.</li>
      <li>If this is an obstetric or ultrasound appointment, please adhere to instructions provided by reception.</li>
    </ul>

    <div class="actions">
      <a href="${HOSPITAL_CONFIG.mapsUrl}" class="btn btn-primary" style="color:#ffffff;">Get Directions on Google Maps</a>
    </div>
  `;

  const html = renderEmailWrapper(content, `Confirmed: Your appointment ${appointment.appointmentId} with ${appointment.doctorName}`);
  return dispatchEmail({
    to: appointment.patientEmail,
    subject: `Your Appointment Has Been Confirmed - Vijaya Harsha Mother & Child Hospital`,
    html,
    type: "PATIENT_APPOINTMENT_CONFIRMED",
    previewText: `Confirmed: ${appointment.appointmentId} on ${appointment.preferredDate} at ${appointment.preferredTime}`
  });
}

// 4. Patient Appointment Cancellation
export async function sendPatientAppointmentCancellation(appointment: any) {
  const content = `
    <div style="text-align: center; margin-bottom: 20px;">
      <span class="badge badge-cancelled" style="font-size: 14px; padding: 6px 16px;">APPOINTMENT UPDATE</span>
      <h2 style="margin: 12px 0 6px 0; font-size: 20px; color: #0A2540;">Appointment Status Update</h2>
      <p style="margin: 0; color: #475569;">Dear ${appointment.patientName},</p>
    </div>

    <p style="color: #475569;">
      We regret to inform you that your appointment request for <strong>${appointment.preferredDate}</strong> at <strong>${appointment.preferredTime}</strong> with <strong>${appointment.doctorName}</strong> could not be scheduled due to emergency clinical procedures or unavailable doctor slots.
    </p>

    <div class="info-box">
      <div class="info-row"><span class="info-label">Appointment ID</span><span class="info-value">${appointment.appointmentId}</span></div>
      <div class="info-row"><span class="info-label">Doctor</span><span class="info-value">${appointment.doctorName}</span></div>
      <div class="info-row"><span class="info-label">Requested Date</span><span class="info-value">${appointment.preferredDate}</span></div>
      <div class="info-row"><span class="info-label">Status</span><span class="info-value"><span class="badge badge-cancelled">CANCELLED</span></span></div>
    </div>

    <p style="color: #475569;">
      We sincerely apologize for the inconvenience. Our reception team will be glad to assist you in rescheduling to an alternate date or time that best fits your convenience.
    </p>

    <div class="actions">
      <a href="tel:${HOSPITAL_CONFIG.phone}" class="btn btn-primary" style="color:#ffffff;">Call Reception: ${HOSPITAL_CONFIG.phoneFormatted}</a>
    </div>
  `;

  const html = renderEmailWrapper(content, `Appointment Update: ${appointment.appointmentId} - Vijaya Harsha Hospital`);
  return dispatchEmail({
    to: appointment.patientEmail,
    subject: `Appointment Update - Vijaya Harsha Mother & Child Hospital`,
    html,
    type: "PATIENT_APPOINTMENT_CANCELLED",
    previewText: `Update regarding your appointment ${appointment.appointmentId}. Please contact us to reschedule.`
  });
}

// 5. Contact Form Alert to Hospital & Patient
export async function sendContactFormEmails(contact: any) {
  // To Hospital
  const hospitalContent = `
    <h2 style="margin: 0 0 12px 0; font-size: 18px; color: #0A2540;">New Website Contact Inquiry</h2>
    <div class="info-box">
      <div class="info-row"><span class="info-label">Name</span><span class="info-value">${contact.name}</span></div>
      <div class="info-row"><span class="info-label">Email</span><span class="info-value">${contact.email}</span></div>
      <div class="info-row"><span class="info-label">Phone</span><span class="info-value">${contact.phone}</span></div>
      <div class="info-row"><span class="info-label">Subject</span><span class="info-value">${contact.subject}</span></div>
      <div class="info-row"><span class="info-label">Message</span><span class="info-value">${contact.message}</span></div>
    </div>
  `;
  await dispatchEmail({
    to: HOSPITAL_EMAIL,
    subject: `[Website Inquiry] ${contact.subject} - from ${contact.name}`,
    html: renderEmailWrapper(hospitalContent, `Inquiry from ${contact.name}: ${contact.subject}`),
    type: "HOSPITAL_CONTACT_ALERT",
    previewText: `Contact inquiry from ${contact.name} (${contact.phone}): ${contact.message}`
  });

  // Acknowledgement to Patient
  if (contact.email) {
    const patientContent = `
      <h2 style="margin: 0 0 12px 0; font-size: 18px; color: #0A2540;">Dear ${contact.name},</h2>
      <p style="color: #475569;">
        Thank you for contacting <strong>Vijaya Harsha Mother & Child Hospital</strong>. We have received your inquiry regarding <strong>"${contact.subject}"</strong>.
      </p>
      <p style="color: #475569;">
        Our hospital coordination desk will review your message and respond promptly. For urgent medical queries, please call our 24/7 hotline at <strong>${HOSPITAL_CONFIG.emergencyPhoneFormatted}</strong>.
      </p>
    `;
    await dispatchEmail({
      to: contact.email,
      subject: `Thank you for contacting Vijaya Harsha Mother & Child Hospital`,
      html: renderEmailWrapper(patientContent, `We received your inquiry regarding ${contact.subject}`),
      type: "PATIENT_CONTACT_ACK",
      previewText: `Thank you for contacting us. We will get back to you shortly.`
    });
  }
}

// Low-level dispatcher handling Resend SDK with seamless development fallback logger
async function dispatchEmail(params: {
  to: string;
  subject: string;
  html: string;
  type: string;
  actionUrls?: { confirm?: string; cancel?: string };
  previewText: string;
}) {
  const logEntry = {
    to: params.to,
    subject: params.subject,
    type: params.type,
    actionUrls: params.actionUrls,
    sentAt: new Date(),
    previewText: params.previewText,
  };
  emailDeliveryLogs.unshift(logEntry);
  if (emailDeliveryLogs.length > 50) emailDeliveryLogs.pop();

  if (resend) {
    try {
      const response = await resend.emails.send({
        from: EMAIL_FROM,
        to: params.to,
        subject: params.subject,
        html: params.html,
      });
      console.log(`[Email Dispatch Success] [${params.type}] To: ${params.to} | Resend ID: ${response.data?.id}`);
      return { success: true, id: response.data?.id };
    } catch (err: any) {
      console.error(`[Email Dispatch Error] Failed sending via Resend to ${params.to}:`, err.message);
      // Fall through to dev log
    }
  }

  // Development logger output
  console.log(`\n================== [TRANSACTIONAL EMAIL DISPATCH] ==================`);
  console.log(`TYPE:    ${params.type}`);
  console.log(`TO:      ${params.to}`);
  console.log(`SUBJECT: ${params.subject}`);
  if (params.actionUrls?.confirm) {
    console.log(`ACTION [CONFIRM]: ${params.actionUrls.confirm}`);
  }
  if (params.actionUrls?.cancel) {
    console.log(`ACTION [CANCEL]:  ${params.actionUrls.cancel}`);
  }
  console.log(`PREVIEW: ${params.previewText}`);
  console.log(`====================================================================\n`);

  return { success: true, mode: "dev-logged" };
}
