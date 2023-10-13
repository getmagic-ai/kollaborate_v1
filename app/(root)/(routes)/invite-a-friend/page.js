"use client";
import CTA from "@/components/CTA";
import sgMail from "@sendgrid/mail";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const InviteAFriend = () => {
  const [email, setEmail] = useState("");

  const inviteFriend = () => {
    const msg = {
      to: email,
      from: "test@example.com", // Use the email address or domain you verified above
      subject: "Sending with Twilio SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    sgMail.send(msg).then(
      () => {
        toast.success("Invite sent successfully");
      },
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    );
  };

  return (
    <div className='mx-auto max-w-7xl py-6 px-6 lg:px-8'>
      <h3 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
        Invite a friend
      </h3>
      <div>
        <label
          htmlFor='email'
          className='block text-sm mt-2 font-medium text-gray-200'
        >
          Enter email of a friend you want to invite
        </label>
        <div className='mt-2 max-w-lg flex space-x-4'>
          <input
            type='email'
            name='email'
            id='email'
            className='py-2.5 px-2 block bg-gray-700 w-full rounded-md border-gray-300 shadow-sm sm:text-sm'
            placeholder='you@example.com'
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant='outline'>Invite</Button>
        </div>
      </div>
      <CTA />
    </div>
  );
};

export default InviteAFriend;
