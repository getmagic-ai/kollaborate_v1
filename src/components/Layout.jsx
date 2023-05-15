import { Navbar } from "./Navbar";

export default function AppLayout({ children }) {
  return (
    <div className='min-h-screen bg-black'>
      <Navbar />
      <main className='mx-auto max-w-4xl flex-1 pt-8'>
        <div className='py-6 px-4 sm:px-6'>{children}</div>
      </main>
    </div>
  );
}
