"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

const page = () => {
  return (
    <main className="flex flex-col items-center justify-center py-10 bg-gray-950 text-white">
      <div className="">
        <ConnectButton />
      </div>
    </main>
  );
};

export default page;
