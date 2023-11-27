import { NextResponse } from "next/server";
import { Resend } from "resend";
import React from "react";

const InvitationEmail = () => {
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  };

  const headerStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const buttonStyle = {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        Hello! You have been invited to Kollaborate.co
      </div>
      <h1>Click the button below to get started.</h1>
      <a href={"https://kollaborate.vercel.app"} style={buttonStyle}>
        Join Now
      </a>
      <p>
        If the button above doesn't work, you can also copy and paste the
        following link into your browser:
        <br />
        <a href={"https://kollaborate.vercel.app"}>
          https://kollaborate.vercel.app
        </a>
      </p>
      <p>Thank you for joining our community!</p>
    </div>
  );
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "anup@kollaborate.co",
      to: ["prathmeshsadake@gmail.com"],
      subject: "Join Our App Invitation",
      react: <InvitationEmail />,
    });

    if (error) {
      return NextResponse.json({ error });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
