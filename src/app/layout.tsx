import "./globals.css";
import Navbar from "./components/navbar";
import type { Metadata } from "next";
import { Providers } from "./provider";
import { mont, nexa, roboto } from "@/lib/fonts";
import Footer from "./components/footer";

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
      {/* <head>
        <link
          rel="preload"
          href="/fonts/mont/Mont-ExtraLight.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/mont/Mont-Heavy.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/nexa/Nexa-Black.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/nexa/Nexa-Heavy.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/nexa/Nexa-Bold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/nexa/Nexa-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/nexa/Nexa-Light.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/nexa/Nexa-ExtraLight.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head> */}
      <body
        className={`${mont.variable} ${nexa.variable} ${roboto.variable} antialiased min-h-screen text-[#171717]`}
      >
        <Providers>
          <div
            className="pointer-events-none fixed inset-0 -z-10 
              bg-[url('/background/bg-landingpage.png')] 
              bg-no-repeat bg-center bg-cover"
          />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
