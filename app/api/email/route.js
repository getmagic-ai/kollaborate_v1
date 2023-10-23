import sgMail from "@sendgrid/mail";
import { NextResponse } from "next/server";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: "test@example.com",
  from: "test@example.com", // Use the email address or domain you verified above
  subject: "Sending with Twilio SendGrid is Fun",
  text: `You are invited to ${process.env.NEXT_PUBLIC_APP_URL}`,
};

export async function POST(req) {
  try {
    await sgMail.send(msg);
    return NextResponse.json({ message: "Invite sent successfully." });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
