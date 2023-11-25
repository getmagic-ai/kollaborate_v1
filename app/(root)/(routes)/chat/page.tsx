"use client";
import React, { useState } from "react";

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      setChat([...chat, { text: message, sender: "user" }]);
      setMessage("");
      // Here you can add logic to send the message to a server or handle it as needed.
    }
  };

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex-1 overflow-y-auto p-4'>
        {/* Chat messages */}
        {chat.map((msg, index) => (
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
  );
};

export default ChatScreen;
