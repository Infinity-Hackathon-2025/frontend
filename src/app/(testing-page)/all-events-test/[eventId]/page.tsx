"use client";

import { getEventZones } from "@/lib/blockchain/ticket";
import { getEventById } from "@/lib/blockchain/ticket-factory";
import { getProvider } from "@/lib/blockchain/utils";
import React, { use, useEffect, useState } from "react";

const page = ({ params }: { params: Promise<{ eventId: string }> }) => {
  const { eventId } = use(params);

  const [event, setEvent] = useState<any>(null);
  const [zones, setZones] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const provider = getProvider();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const _event = await getEventById(provider, eventId);
        setEvent(_event);

        // const _zones = await getEventZones(provider, _event.eventAddress);
        // setZones(_zones);
        // console.log("zones:", _zones);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (!event) return <p className="text-red-500">Event not found.</p>;

  if (loading) return <p className="text-gray-400">Loading event details...</p>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold">{event.eventName}</h1>
      <img
        src={event.image}
        alt={event.eventName}
        className="mt-4 rounded-lg w-64 h-64 object-cover"
      />
      <p className="mt-4 text-gray-300">{event.description}</p>
      <p className="mt-2 text-sm text-gray-400">Organizer: {event.organizer}</p>
      <p className="mt-2 text-sm text-gray-400">
        Royalty: {Number(event.royaltyFee) / 100}%
      </p>
      s
      {zones ? (
        zones.map((z: any, idx: number) => {
          return (
            <div key={idx} className="bg-amber-200">
              <h1>t{z.name}</h1>
              <p>{z.price}</p>
              <p>{z.maxSupply - z.totalMinted}</p>
            </div>
          );
        })
      ) : (
        <div>ga ada zones</div>
      )}
    </div>
  );
};

export default page;
