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

  if (chat.length === 1) {
    setTimeout(
      () =>
        setChat((messages) => [
          ...messages,
          {
            text: "Our AI is taking a break! We will email you to follow up.Thanks for your patience!",
            sender: "app",
          },
        ]),
      1000
    );
  }

  return (
    <div className='flex flex-col h-60 max-h-60 overflow-y-auto bg-gray-800 my-4'>
      <div className='flex-1  p-4'>
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
                msg.sender === "user" ? "blue" : "blue"
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
