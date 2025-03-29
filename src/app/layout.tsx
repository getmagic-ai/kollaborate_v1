import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import { dark, light } from "@clerk/themes";
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
        baseTheme: light,
        elements: {
          card: "bg-white shadow-xl rounded-lg",
          headerTitle: "text-gray-900 text-xl font-semibold",
          headerSubtitle: "text-gray-600",
          socialButtonsBlockButton: "bg-white border border-gray-300 hover:bg-gray-50",
          socialButtonsBlockButtonText: "text-gray-600 font-medium",
          dividerLine: "bg-gray-200",
          dividerText: "text-gray-500",
          formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
          formFieldInput: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
          formFieldLabel: "text-gray-700",
          footer: "text-gray-500",
          footerActionLink: "text-blue-600 hover:text-blue-700",
          identityPreviewText: "text-gray-700",
          identityPreviewEditButton: "text-blue-600 hover:text-blue-700",
        },
        layout: {
          socialButtonsPlacement: "bottom",
          logoPlacement: "inside",
          logoImageUrl: "/your-logo.png", // Add your logo path here
        },
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
