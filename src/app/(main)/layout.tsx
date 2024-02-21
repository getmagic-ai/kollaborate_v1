import React from "react";
import Navbar from "@/components/navbar/navbar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='max-w-5xl mx-auto bg-gray-900 w-full min-h-screen'>
      <Navbar />
      <div className='p-2 lg:p-4 overflow-y-auto'>{children}</div>
    </div>
  );
};

export default AppLayout;
