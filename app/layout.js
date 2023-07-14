import "./globals.css";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

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
        <body className={`${poppins.className} bg-gray-950`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
