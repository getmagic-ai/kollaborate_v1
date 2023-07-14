import Navbar from "@/components/Navbar";

export default function AppLayout({ children }) {
  return (
    <div className='max-w-3xl mx-auto bg-gray-900 w-full min-h-screen'>
      <Navbar />
      {children}
    </div>
  );
}
