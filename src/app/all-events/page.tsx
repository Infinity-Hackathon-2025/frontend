"use client";

import React from "react";
import { useReadContract } from "wagmi";
import factoryAbi from "@/constants/abi/ticket-factory.json";

const page = () => {
  const { data: events, isLoading } = useReadContract({
    address: process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}`,
    abi: factoryAbi.abi,
    functionName: "getAllEvents",
  });

  console.log("Events:", events);

  if (isLoading) return <p>Loading events...</p>;
  if (!events || !Array.isArray(events)) return <p>No events found.</p>;

  return (
    <div>
      {events.map((e: any, idx: number) => {
        // Kadang wagmi ngembaliin tuple array, jadi kita safe fallback:
        const ticketAddress = e.ticketAddress ?? e[0];
        const eventName = e.eventName ?? e[1];
        const eventId = e.eventId ?? e[2];
        const description = e.description ?? e[3];
        const image = e.image ?? e[4];
        const organizer = e.organizer ?? e[5];
        const royaltyFee = e.royaltyFee ?? e[6];

        return (
          <div key={idx} className="border p-3 rounded-md mb-3">
            <h3 className="font-semibold text-lg">{eventName}</h3>
            <p className="text-sm text-gray-400">{description}</p>
            <p className="text-sm">Organizer: {organizer}</p>
            <p className="text-sm">Contract: {ticketAddress}</p>
          </div>
        );
      })}
    </div>
  );
};

export default page;
