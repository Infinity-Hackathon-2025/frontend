import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import type { Metadata } from "next";
import { Providers } from "./provider";
import { mont, nexa, roboto } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Trustix | Event Marketplace",
  description:
    "Temukan konser, merch, dan tiket resale favoritmu di satu tempat.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${mont.variable} ${nexa.variable} ${roboto.variable} antialiased min-h-screen text-[#171717]`}
      >
        <Providers>
          <div
            className="pointer-events-none fixed inset-0 -z-10 
              bg-[url('/background/bg-landingpage.png')]  // Menggunakan gambar sebagai background
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
