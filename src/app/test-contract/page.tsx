"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

const page = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
      <h1 className="text-3xl font-bold mb-4">🎟️ NFT Ticketing App</h1>
      <ConnectButton />
    </main>
  );
};

export default page;
