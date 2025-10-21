"use client";

import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import factoryAbi from "@/constants/abi/ticket-factory.json";
import { getAllEvents } from "@/lib/blockchain/ticket-factory";
import { getProvider } from "@/lib/blockchain/utils";
import { ethers } from "ethers";
import { BrowserProvider } from "ethers";
import Link from "next/link";

const page = () => {
  // const { data: events, isLoading } = useReadContract({
  //   address: process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}`,
  //   abi: factoryAbi.abi,
  //   functionName: "getAllEvents",
  // });
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const provider = getProvider();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getAllEvents(provider);
        console.log("📦 fetched events:", data);
        setEvents(data);

        console.log("events: ", events);
      } catch (err) {
        console.error("failed to load events:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, []);

  // const events = getAllEvents(provider);
  if (isLoading) return <p>Loading events...</p>;
  if (!events || !Array.isArray(events)) return <p>No events found.</p>;

  return (
    <div className="px-20 py-40">
      {events.map((e: any, idx: number) => {
        // Kadang wagmi ngembaliin tuple array, jadi kita safe fallback:
        const eventAddress = e.eventAddress ?? e[0];
        const eventName = e.eventName ?? e[1];
        const eventId = e.eventId ?? e[2];
        const description = e.description ?? e[3];
        const image = e.image ?? e[4];
        const organizer = e.organizer ?? e[5];
        const royaltyFee = e.royaltyFee ?? e[6];

        return (
          <Link key={idx} href={`/all-events-test/${eventAddress}`}>
            <div className="border p-3 rounded-md mb-3">
              <h3 className="font-semibold text-lg">{eventName}</h3>
              <p className="text-sm text-gray-400">Event Id: {eventId}</p>
              <p className="text-sm text-gray-400">{description}</p>
              <p className="text-sm">Organizer: {organizer}</p>
              <p className="text-sm">Contract: {eventAddress}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default page;
