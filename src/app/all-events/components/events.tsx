"use client";

import { getAllEvents } from "@/lib/blockchain/ticket-factory";
import { getProvider } from "@/lib/blockchain/utils";
import React, { useEffect, useState } from "react";
import Card from "./card";

const Events = () => {
  const [events, setEvents] = useState<any[]>([]);
  const provider = getProvider();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getAllEvents(provider);
        console.log("fetched events:", data);
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

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center w-full py-20 gap-6">
        <p className="font-roboto text-[#7C7C7C]">Loading events...</p>
      </div>
    );
  }
  if (events.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center w-full py-20 gap-6">
        <p className="font-roboto text-[#7C7C7C]">
          Tidak ada acara berlangsung
        </p>
      </div>
    );
  }
  return (
    <div>
      {events.map((event) => {
        return (
          <Card
            title={event.title}
            description={event.description}
            imageUrl={event.image}
          />
        );
      })}
    </div>
  );
};

export default Events;
