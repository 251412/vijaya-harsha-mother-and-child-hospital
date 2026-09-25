import { NextRequest, NextResponse } from "next/server";
import { ContactMessageSchema } from "@/lib/validations";
import { saveContactMessage } from "@/lib/dataStore";
import { sendContactFormEmails } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validationResult = ContactMessageSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please fill in all required fields accurately.",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;
    const saved = await saveContactMessage(data);

    // Send emails asynchronously
    await sendContactFormEmails(saved);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out. We have received your inquiry and our desk will respond shortly.",
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("API /api/contact error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to submit your inquiry at this moment. Please call our hospital desk directly.",
      },
      { status: 500 }
    );
  }
}
