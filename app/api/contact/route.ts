
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        { success: false, message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    // Save enquiry in Supabase
    const { error: databaseError } = await supabase
      .from("contact_enquiries")
      .insert({
        name: name.trim(),
        email: email.trim(),
        phone: typeof phone === "string" ? phone.trim() || null : null,
        message: message.trim(),
      });

    if (databaseError) {
      console.error("SUPABASE ENQUIRY ERROR:", databaseError);

      return NextResponse.json(
        { success: false, message: "Unable to save your enquiry." },
        { status: 500 }
      );
    }

    // Send email notification
    const { error: emailError } = await resend.emails.send({
      from: "Thuliragam Website <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      subject: `New Website Inquiry - ${name.trim()}`,
      replyTo: email.trim(),
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px">
          <h2 style="color:#15803d;">🌱 New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name.trim()}</p>
          <p><strong>Email:</strong> ${email.trim()}</p>
          <p><strong>Phone:</strong> ${phone || "-"}</p>
          <p><strong>Message:</strong> ${message.trim()}</p>
          <hr />
          <p>Sent from the Thuliragam Website.</p>
        </div>
      `,
    });

    if (emailError) {
      console.error("RESEND EMAIL ERROR:", emailError);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Unable to process your enquiry." },
      { status: 500 }
    );
  }
}
