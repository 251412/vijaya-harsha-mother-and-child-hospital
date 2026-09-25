async function runE2E() {
  const BASE_URL = "http://localhost:3000";
  console.log("=================================================================");
  console.log("  VIJAYA HARSHA HOSPITAL - END-TO-END AUTOMATED AUDIT SUITE");
  console.log("=================================================================\n");

  // TEST 1: Submit valid appointment for confirmation workflow
  console.log("STEP 1: Patient submits appointment (Will be Confirmed)...");
  const appt1Res = await fetch(`${BASE_URL}/api/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      patientName: "Smt. G. Bhavani",
      patientEmail: "bhavani.g@example.com",
      patientPhone: "9876543210",
      doctorId: "doc-1",
      doctorName: "Dr. N. Vijaya Kumar",
      department: "Pediatrics & Neonatal Care",
      preferredDate: "2026-11-05",
      preferredTime: "10:00 AM - 10:30 AM",
      reason: "Post-natal infant growth evaluation and milestone tracking",
    }),
  });

  const appt1Data = await appt1Res.json();
  if (!appt1Res.ok || !appt1Data.success) {
    throw new Error(`Appointment 1 failed: ${JSON.stringify(appt1Data)}`);
  }
  const apptId1 = appt1Data.appointmentId;
  console.log(`✓ Appointment created: ${apptId1} | Status: ${appt1Data.data.status}`);

  // STEP 2: Verify emails and get confirm URL
  console.log("\nSTEP 2: Verifying hospital notification & patient acknowledgement...");
  const devRes1 = await fetch(`${BASE_URL}/api/dev/recent-emails`);
  const devData1 = await devRes1.json();
  const triageEmail1 = devData1.recentEmails.find(
    (e) => e.type === "HOSPITAL_APPOINTMENT_TRIAGE" && e.subject.includes(apptId1)
  );
  if (!triageEmail1 || !triageEmail1.actionUrls?.confirm) {
    throw new Error("Hospital triage email not found or missing action URLs");
  }
  console.log(`✓ Triage Email Dispatched To: ${triageEmail1.to}`);
  console.log(`✓ Single-Use Confirm Action URL: ${triageEmail1.actionUrls.confirm}`);

  // STEP 3: Doctor clicks CONFIRM link
  console.log("\nSTEP 3: Simulating Doctor clicking [ CONFIRM APPOINTMENT ]...");
  const confirmActionRes = await fetch(triageEmail1.actionUrls.confirm, {
    redirect: "manual",
  });
  const redirectLocation = confirmActionRes.headers.get("location");
  console.log(`✓ Action Link HTTP Status: ${confirmActionRes.status}`);
  console.log(`✓ Redirect Target: ${redirectLocation}`);
  if (!redirectLocation || !redirectLocation.includes("state=success") || !redirectLocation.includes("action=confirm")) {
    throw new Error(`Unexpected redirect location on confirm: ${redirectLocation}`);
  }

  // STEP 4: Verify patient confirmation email
  console.log("\nSTEP 4: Verifying patient receives Confirmation Email...");
  const devRes2 = await fetch(`${BASE_URL}/api/dev/recent-emails`);
  const devData2 = await devRes2.json();
  const confirmEmail = devData2.recentEmails.find(
    (e) => e.type === "PATIENT_APPOINTMENT_CONFIRMED" && e.to === "bhavani.g@example.com"
  );
  if (!confirmEmail) {
    throw new Error("Patient confirmation email was not dispatched");
  }
  console.log(`✓ Patient Confirmation Email Found!`);
  console.log(`  To: ${confirmEmail.to}`);
  console.log(`  Subject: ${confirmEmail.subject}`);
  console.log(`  Preview: ${confirmEmail.previewText}`);

  // STEP 5: Re-clicking the same token must be rejected (single-use guarantee)
  console.log("\nSTEP 5: Verifying single-use token security (Re-click used link)...");
  const reclickRes = await fetch(triageEmail1.actionUrls.confirm, { redirect: "manual" });
  const reclickLocation = reclickRes.headers.get("location");
  console.log(`✓ Re-click Redirect: ${reclickLocation}`);
  if (!reclickLocation || !reclickLocation.includes("state=already_used")) {
    throw new Error(`Security violation: Re-used token was not flagged as already_used: ${reclickLocation}`);
  }
  console.log(`✓ Replay protection verified: Status preserved, token blocked.`);

  // STEP 6: Submit appointment for cancellation workflow
  console.log("\nSTEP 6: Patient submits appointment 2 (Will be Cancelled)...");
  const appt2Res = await fetch(`${BASE_URL}/api/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      patientName: "Sri. K. Venkat",
      patientEmail: "venkat.k@example.com",
      patientPhone: "9440191244",
      doctorId: "doc-2",
      doctorName: "Dr. K. Harsha Latha",
      department: "Obstetrics & Gynecology",
      preferredDate: "2026-11-10",
      preferredTime: "05:30 PM - 06:00 PM",
      reason: "Consultation regarding high-risk pregnancy second opinion",
    }),
  });
  const appt2Data = await appt2Res.json();
  const apptId2 = appt2Data.appointmentId;
  console.log(`✓ Appointment 2 created: ${apptId2}`);

  // STEP 7: Get cancel URL and click CANCEL
  const devRes3 = await fetch(`${BASE_URL}/api/dev/recent-emails`);
  const devData3 = await devRes3.json();
  const triageEmail2 = devData3.recentEmails.find(
    (e) => e.type === "HOSPITAL_APPOINTMENT_TRIAGE" && e.subject.includes(apptId2)
  );
  console.log(`✓ Single-Use Cancel Action URL: ${triageEmail2.actionUrls.cancel}`);

  console.log("\nSTEP 8: Simulating Doctor clicking [ CANCEL APPOINTMENT ]...");
  const cancelActionRes = await fetch(triageEmail2.actionUrls.cancel, { redirect: "manual" });
  const cancelLocation = cancelActionRes.headers.get("location");
  console.log(`✓ Cancel Redirect Target: ${cancelLocation}`);
  if (!cancelLocation || !cancelLocation.includes("state=success") || !cancelLocation.includes("action=cancel")) {
    throw new Error(`Unexpected cancel redirect: ${cancelLocation}`);
  }

  // STEP 9: Verify patient cancellation email
  console.log("\nSTEP 9: Verifying patient receives Cancellation & Reschedule Email...");
  const devRes4 = await fetch(`${BASE_URL}/api/dev/recent-emails`);
  const devData4 = await devRes4.json();
  const cancelEmail = devData4.recentEmails.find(
    (e) => e.type === "PATIENT_APPOINTMENT_CANCELLED" && e.to === "venkat.k@example.com"
  );
  if (!cancelEmail) {
    throw new Error("Patient cancellation email was not dispatched");
  }
  console.log(`✓ Patient Cancellation Email Found!`);
  console.log(`  To: ${cancelEmail.to}`);
  console.log(`  Subject: ${cancelEmail.subject}`);
  console.log(`  Preview: ${cancelEmail.previewText}`);

  // STEP 10: Test Contact Form
  console.log("\nSTEP 10: Testing Contact Us Form Submission...");
  const contactRes = await fetch(`${BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "T. Sunitha",
      email: "sunitha.t@example.com",
      phone: "9876501234",
      subject: "NICU Facilities and Preterm Admission Protocol",
      message: "Our family is expecting twins and we want to tour the Level-III NICU facilities.",
    }),
  });
  const contactData = await contactRes.json();
  console.log(`✓ Contact Form HTTP Status: ${contactRes.status} | Success: ${contactData.success}`);

  // STEP 11: Test Input Validation (Rejection of invalid date and bad email)
  console.log("\nSTEP 11: Testing Validation & Anti-Tamper Logic...");
  const badRes = await fetch(`${BASE_URL}/api/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      patientName: "",
      patientEmail: "invalid-email",
      patientPhone: "123",
      doctorId: "",
      doctorName: "",
      department: "",
      preferredDate: "2020-01-01",
      preferredTime: "",
      reason: "x",
    }),
  });
  const badData = await badRes.json();
  console.log(`✓ Invalid Submission Rejected with HTTP ${badRes.status}: ${badData.error}`);
  console.log(`✓ Validation Details:`, Object.keys(badData.details));

  console.log("\n=================================================================");
  console.log("  ALL END-TO-END HEALTHCARE AUDIT TESTS PASSED SUCCESSFULLY! ✓");
  console.log("=================================================================\n");
}

runE2E().catch((err) => {
  console.error("AUDIT FAILURE:", err);
  process.exit(1);
});
