"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();

  const menu = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Events", href: "/#events" },
    { name: "Merch", href: "/#merch" },
    { name: "Resells", href: "/#resells" },
    { name: "Help center", href: "/#help" },
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50 flex items-center justify-between px-10 py-6">
      <div className="flex items-center gap-2">
        <img
          src="/images/logo.png"
          alt="Trustix Logo"
          className="w-[120px] h-auto"
        />
      </div>

      <nav className="absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg rounded-full px-10 py-3 flex items-center justify-center">
        <ul className="flex items-center gap-8 text-sm font-medium text-[#1E3A8A]">
          {menu.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={`px-3 py-2 rounded-full transition ${
                  pathname === item.href
                    ? "bg-[#1E3A8A] text-white shadow-md"
                    : "hover:bg-[#1E3A8A]/10"
                }`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-row gap-4">
        <Link
          className="mt-20 sm:mt-0 px-8 py-3 bg-[#153E9C] hover:bg-[#2F54EB] rounded-xl text-white font-nexa font-semibold text-lg shadow-md "
          href={"/my-events"}
        >
          Tiket Saya
        </Link>
        <ConnectButton />
      </div>
      {/* <button className="border border-[#1E3A8A] text-[#1E3A8A] px-5 py-2 rounded-full font-medium hover:bg-[#1E3A8A] hover:text-white transition">
        Connect Wallet
      </button> */}
    </header>
  );
};

export default Navbar;
