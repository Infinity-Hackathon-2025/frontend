"use client";

import React from "react";
import { useWriteContract } from "wagmi";
import factoryAbi from "@/constants/abi/ticket-factory.json";

const CreateEventButton = () => {
  const { writeContract, isPending } = useWriteContract();

  const handleCreate = async () => {
    try {
      await writeContract({
        address: process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}`,
        abi: factoryAbi.abi,
        functionName: "createEvent",
        args: [
          "E001", // eventId
          "Konser Garudago", // eventName
          "Music & Tech Festival", // description
          "https://image-link", // image
          "VIP", // zone
          BigInt(0.05e18), // price in wei
          BigInt(100), // maxSupply
          BigInt(500), // royaltyFee
          ["0xOrganizerWallet"], // payout wallets
          [10000], // payout shares (100%)
        ],
      });
      alert("Event berhasil dibuat!");
    } catch (err) {
      console.error(err);
      alert("Gagal membuat event!");
    }
  };

  return (
    <button
      onClick={handleCreate}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      disabled={isPending}
    >
      {isPending ? "Deploying..." : "Create Event"}
    </button>
  );
};

export default CreateEventButton;
