"use client";
import React, { useState } from "react";
import axios from "axios";
import { useParams, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import CustomLoader from "@/components/custom-loader";

const BrandDetails = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ text: string; sender: string }[]>([]);
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryFn: async () => await axios.post(`/api/brand`, { id: id }),
    queryKey: ["brand"],
  });

  if (isLoading) return <CustomLoader />;

  const brandData = data?.data[0];

  const sendMessage = () => {
    if (message.trim() !== "") {
      setChat([...chat, { text: message, sender: "user" }]);
      setMessage("");
      // Here you can add logic to send the message to a server or handle it as needed.
    }
  };

  return (
    <div className='mx-auto max-w-7xl py-24 px-6 lg:px-8'>
      <h1 className='text-5xl font-bold tracking-tight text-gray-200'>
        {brandData.name}
      </h1>
      <p className='mt-2 text-lg text-gray-400'>
        Category: {brandData.category}
      </p>
      <p className='mt-5 text-xl text-gray-300'>
        {brandData.description
          ? brandData.description
          : "contact us for brand details"}
      </p>

      <div className='flex flex-col h-60 max-h-60 overflow-y-auto bg-gray-800 my-4'>
        <div className='flex-1  p-4'>
          {/* Chat messages */}
          {chat.map((msg: any, index: number) => (
            <div
              key={index}
              className={`mb-2 ${
                msg.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block p-2 bg-${
                  msg.sender === "user" ? "blue" : "green"
                }-500 text-white rounded`}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <div className='flex items-center p-4'>
          {/* Message input */}
          <input
            type='text'
            className='flex-1 border p-2 rounded'
            placeholder='Type your message...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {/* Send button */}
          <button
            className='ml-2 p-2 bg-blue-500 text-white rounded'
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandDetails;
