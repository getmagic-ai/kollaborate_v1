import CTA from "@/components/CTA";
import React from "react";

const InviteAFriend = () => {
  return (
    <div className='mx-auto max-w-7xl py-6 px-6 lg:px-8'>
      <h3 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
        Invite a friend
      </h3>
      <div>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-gray-200'
        >
          Enter email of a friend you want to invite
        </label>
        <div className='mt-1 max-w-lg'>
          <input
            type='email'
            name='email'
            id='email'
            className='py-2.5 px-2 block bg-gray-700 w-full rounded-md border-gray-300 shadow-sm sm:text-sm'
            placeholder='you@example.com'
          />
        </div>
      </div>
      <CTA />
    </div>
  );
};

export default InviteAFriend;
