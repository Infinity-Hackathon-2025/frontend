"use client";

import { getEventZones } from "@/lib/blockchain/ticket";
import { getEventByAddress } from "@/lib/blockchain/ticket-factory";
import { getProvider } from "@/lib/blockchain/utils";
import { ethers } from "ethers";
import Image from "next/image";
import React, { useEffect, useState, use } from "react";

export default function EventPage({
  params,
}: {
  params: Promise<{ eventAddress: string }>;
}) {
  // ✅ Unwrap params promise pakai React.use()
  const { eventAddress } = use(params);

  const [event, setEvent] = useState<any>(null);
  const [zones, setZones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const provider = getProvider();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (!eventAddress) return;

        const _event = await getEventByAddress(provider, eventAddress);
        setEvent(_event);

        const _zones = await getEventZones(provider, eventAddress).then((p) =>
          setZones(p)
        );
        // const formattedZones = _zones.map((z: any) => ({
        //   name: z.name,
        //   price: ethers.formatEther(z.price),
        //   maxSupply: Number(z.maxSupply),
        //   totalMinted: Number(z.totalMinted),
        // }));

        console.log("formatted zones:", _zones);

        // setZones(_zones);
      } catch (error) {
        console.error("❌ Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventAddress]);

  if (loading)
    return <p className="text-gray-400 p-8">Loading event details...</p>;

  if (!event)
    return (
      <p className="text-red-500 p-8">
        Event not found or failed to load data.
      </p>
    );

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold">{event.eventName}</h1>

      <div className="mt-4">
        <img
          src={event.image}
          alt={event.eventName}
          height={256}
          className="rounded-lg object-cover"
        />
      </div>

      <p className="mt-4 text-gray-300">{event.description}</p>
      <p className="mt-2 text-sm text-gray-400">
        👤 Organizer: {event.organizer}
      </p>
      <p className="mt-2 text-sm text-gray-400">
        💸 Royalty: {Number(event.royaltyFee) / 100}%
      </p>
      {/* {event.zones["name"]} */}
      <div className="mt-6 space-y-4">
        {zones.map((zone, i) => (
          <div key={i} className="bg-gray-800 p-4 rounded-lg shadow">
            <p className="font-semibold text-lg">{zone.name}</p>
            <p>💰 Price: {zone.price} ETH</p>
            <p>🎟️ Max Supply: {zone.maxSupply}</p>
            <p>🪙 Minted: {zone.totalMinted}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
