import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Thuliragam Website <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      subject: `New Website Inquiry - ${name}`,
      replyTo: email,

      html: `
        <div style="font-family:Arial,sans-serif;padding:20px">
          <h2 style="color:#15803d;">
            🌱 New Contact Form Submission
          </h2>

          <table style="border-collapse:collapse;width:100%">
            <tr>
              <td><strong>Name</strong></td>
              <td>${name}</td>
            </tr>

            <tr>
              <td><strong>Email</strong></td>
              <td>${email}</td>
            </tr>

            <tr>
              <td><strong>Phone</strong></td>
              <td>${phone || "-"}</td>
            </tr>

            <tr>
              <td><strong>Message</strong></td>
              <td>${message}</td>
            </tr>
          </table>

          <hr/>

          <p>
            This message was sent from the
            <strong>Thuliragam Website</strong>.
          </p>

        </div>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to send email.",
      },
      {
        status: 500,
      }
    );
  }
}