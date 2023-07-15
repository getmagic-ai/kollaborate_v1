import Navbar from "@/components/Navbar";
import { auth, clerkClient } from "@clerk/nextjs";

export default async function AppLayout({ children }) {
  return (
    <div className='max-w-5xl mx-auto bg-gray-900 w-full min-h-screen'>
      <Navbar />
      <div className='p-2 lg:p-4 overflow-y-auto'>{children}</div>
    </div>
  );
}
