import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import { dark } from "@clerk/themes";
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
        baseTheme: dark,
      }}
    >
      <html lang='en'>
        <Providers>
          <Loading>
            <body className={poppins.className}>
              <ToastProvider />
              {children}
            </body>
          </Loading>
        </Providers>
      </html>
    </ClerkProvider>
  );
}
