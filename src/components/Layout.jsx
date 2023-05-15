import { Navbar } from "./Navbar";

export default function AppLayout({ children }) {
  return (
    <div className='min-h-screen bg-black'>
      <main className='mx-auto max-w-4xl flex-1 '>
        <Navbar />
        <div className='pb-6 pt-8  px-4 sm:px-6'>{children}</div>
      </main>
    </div>
  );
}
