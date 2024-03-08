import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import InvitationEmail from "@/components/emails/invitation-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest, res: NextResponse) {
  const { email } = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "anup@kollaborate.co",
      to: email,
      subject: "Join Our App Invitation",
      react: InvitationEmail(),
    });

    if (error) {
      return NextResponse.json({ error });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
