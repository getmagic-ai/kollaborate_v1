import "./globals.css";
import { dark } from "@clerk/themes";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import TanStackQueryClientProvider from "@/providers/tanstack-query-client-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { ModalProvider } from "@/providers/modal-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Kollaborate",
  description: "Kollaborate",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang='en'>
        <TanStackQueryClientProvider>
          <body className={`${poppins.className} bg-gray-950`}>
            <ModalProvider />
            <ToastProvider />
            {children}
          </body>
        </TanStackQueryClientProvider>
      </html>
    </ClerkProvider>
  );
}
