"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import Hamburger from "hamburger-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConnectButtonCustom from "./connect-button";
import { useAccount } from "wagmi";

const Navbar = () => {
  const pathname = usePathname();
  const { isConnected, address } = useAccount();

  const menu = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Events", href: "/#events" },
    { name: "Merch", href: "/#merch" },
    { name: "Resells", href: "/#resells" },
    { name: "Help center", href: "/#help" },
  ];

  return (
    <div className="fixed flex flex-col w-full items-end">
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

        {isConnected ? (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <div className="bg-none" aria-label="Open menu">
                <Hamburger />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit" align="end">
              <DropdownMenuGroup className="flex  flex-col py-2 px-2 gap-2">
                <DropdownMenuItem>
                  <Link
                    href={"/my-tickets"}
                    className=" font-nexa font-semibold text-lg "
                  >
                    My Tickets
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    className="font-nexa font-semibold text-lg"
                    href={"/my-events"}
                  >
                    My Events
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ConnectButtonCustom />
                </DropdownMenuItem>
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
