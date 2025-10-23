"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import Hamburger from "hamburger-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ConnectButtonCustom from "./connect-button";
import { useAccount } from "wagmi";

const Navbar = () => {
  const { isConnected, address } = useAccount();
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const menu = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Events", href: "/#events" },
    { name: "Merch", href: "/#merch" },
    { name: "Resale", href: "/#resale" },
    { name: "Help center", href: "/#help" },
  ];

  return (
    <div className="fixed flex flex-col w-full items-end z-50">
      <header className="w-full  top-0 left-0 z-50 overflow-visible flex items-center justify-between px-10 py-6">
        <div className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="Trustix Logo"
            className="w-[120px] h-auto"
          />
        </div>

        <nav className="absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg rounded-full px-4 py-4 flex items-center justify-center">
          <ul className="flex items-center gap-8 text-sm font-medium text-[#1E3A8A]">
            {menu.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`px-3 py-2 rounded-full transition ${
                    activeSection == item.href.slice(2)
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

        {isConnected ? (
          <DropdownMenu open={isOpen} modal={false}>
            <DropdownMenuTrigger asChild>
              <button className="bg-none" aria-label="Open menu">
                <Hamburger toggled={isOpen} toggle={setOpen} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit" align="end">
              <DropdownMenuGroup className="flex flex-col py-3 px-4 gap-2">
                <Link
                  href={"/my-tickets"}
                  className=" font-nexa font-semibold text-lg hover:bg-zinc-100 py-4 px-4"
                >
                  My Tickets
                </Link>
                <Link
                  className="font-nexa font-semibold text-lg hover:bg-zinc-100 py-4 px-4"
                  href={"/my-events"}
                >
                  My Events
                </Link>
                <div className="hover:bg-zinc-100 py-2 px-4">
                  <ConnectButtonCustom />
                </div>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <ConnectButtonCustom />
        )}
      </header>
    </div>
  );
};

export default Navbar;
