"use client";

import React, { use, useEffect, useState } from "react";
import Section from "./components/section";
import { getProvider } from "@/lib/blockchain/utils";
import { getEventByAddress } from "@/lib/blockchain/ticket-factory";
import { getEventZones } from "@/lib/blockchain/ticket";

export default function page({
  params,
}: {
  params: Promise<{ eventAddress: string }>;
}) {
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
    <div
      className="min-h-screen bg-gray-50 px-[60px] md:px-[80px] py-[100px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background/bg-desktop.png')" }}
    >
      <Section
        eventName={event.eventName}
        description={event}
        image={event.image}
        zones={zones}
      />
    </div>
  );
}
