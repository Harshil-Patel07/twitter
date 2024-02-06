import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Sidebar from "../components/Sidebar";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {



  return (
    <SessionProvider session={session}>
       <Sidebar />
      <div className="">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
