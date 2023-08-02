import { currentUser } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { ModalProvider } from "@/providers/modal-provider";

export default async function AppLayout({ children }) {
  const user = await currentUser();

  return (
    <div className='max-w-5xl mx-auto bg-gray-900 w-full min-h-screen'>
      <Navbar />
      <div className='p-2 lg:p-4 overflow-y-auto'>
        <ModalProvider
          isDiscordConnected={
            user?.externalAccounts.filter(
              (acc) => acc.provider === "discord"
            ) === 0
          }
        />
        {children}
      </div>
    </div>
  );
}
