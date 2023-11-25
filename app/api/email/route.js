import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render as EmailRender } from "@react-email/render";
import InviteUserEmail from "@/components/email-templates/invitation";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  const html = EmailRender(<InviteUserEmail />);
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resends.dev>",
      to: ["delivered@resend.dev"],
      subject: "Hello world",
      react: html,
    });

    if (error) {
      return NextResponse.json({ error });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
