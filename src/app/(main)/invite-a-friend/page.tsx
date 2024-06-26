"use client";
import axios from "axios";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CTA from "@/components/cta";
import { Loader } from "lucide-react";

const InviteAFriend = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const inviteFriend = async (e: any) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsValidEmail(true);
      return toast.error("Invalid email address");
    }
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/email", {
        email: email,
      });
      if (data) {
        toast.success("Invitation email sent successfully.");
      }
    } catch (error) {
      return toast.error("Internal error. Please try again later.");
    } finally {
      setEmail("");
      setIsLoading(false);
    }
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
        <form onSubmit={inviteFriend} className='mt-2 max-w-lg flex space-x-4'>
          <input
            type='email'
            name='email'
            id='email'
            className='py-2.5 px-2 block bg-gray-700 text-white w-full rounded-md border-gray-300 shadow-sm sm:text-sm'
            placeholder='you@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            disabled={email.length < 0 && isValidEmail}
            onClick={inviteFriend}
            variant='outline'
            type='submit'
          >
            {isLoading ? <Loader className='h-6 w-6 animate-spin' /> : "Invite"}
          </Button>
        </form>
      </div>
      <CTA />
    </div>
  );
};

export default InviteAFriend;
