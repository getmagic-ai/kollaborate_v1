import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { dark } from "@clerk/themes";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/providers/tanstack-query-provider";
import { ToastProvider } from "@/providers/toast-provider";
import Loading from "./loading";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Kollaborate",
  description: "Kollaborate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: '#0F172A' },
        elements: {
          card: "bg-white shadow-xl",
          headerTitle: "text-gray-900 font-semibold",
          headerSubtitle: "text-gray-600",
          socialButtonsBlockButton: "bg-white hover:bg-gray-50 border border-gray-200",
          formButtonPrimary: "bg-gray-900 hover:bg-gray-800 text-white",
          formFieldInput: "border-gray-200",
          formFieldLabel: "text-gray-700",
          footerActionLink: "text-gray-900 hover:text-gray-800"
        }
      }}
    >
      <html lang='en'>
        <Providers>
          {/* <Loading> */}
          <body className={poppins.className}>
            <ToastProvider />
            {children}
          </body>
          {/* </Loading> */}
        </Providers>
      </html>
    </ClerkProvider>
  );
}
