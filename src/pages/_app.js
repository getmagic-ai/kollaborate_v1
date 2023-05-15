import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Poppins } from "next/font/google";
import "moment-timezone";

import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const queryClient = new QueryClient();
//these are for pages that don't need authentication and can be accessed by anyone in an unauthenticated state
// @PrathmeshSadake can you please add the blog endpoints to this list as well, as we want the blogs to be accessed by anyone
const nonLayoutPaths = ["/auth/signin", "/auth/signup"];

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();

  return (
    <SessionProvider session={session} /*makes auth session data available to all pages*/>
      <QueryClientProvider client={queryClient} /*makes database data available to all pages*/>
        <main className={poppins.className}>
          <Toaster />
          {nonLayoutPaths.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </main>
      </QueryClientProvider>
    </SessionProvider>
  );
}
