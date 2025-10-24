import "./globals.css";
import Navbar from "./components/navbar";
import type { Metadata } from "next";
import { Providers } from "./provider";
import { mont, nexa, roboto } from "@/lib/fonts";
import Footer from "./components/footer";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Trustix.",
  description: "A decentralized event ticketing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${mont.variable} ${nexa.variable} ${roboto.variable} antialiased min-h-screen text-[#171717]`}
      >
        <Analytics />
        <Providers>
          <div
            className="pointer-events-none fixed inset-0 -z-10 
              bg-[url('/background/bg-landingpage.png')] 
              bg-no-repeat bg-center bg-cover"
          />
          <div className="lg:hidden w-screen h-screen flex flex-col font-roboto text-lg justify-center items-center">
            Hanya tersedia versi desktop
          </div>
          <div className="hidden lg:block">
            <Navbar />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
