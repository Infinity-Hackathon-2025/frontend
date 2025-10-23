"use client";

import {
  getAllActiveEvents,
  getAllEvents,
} from "@/lib/blockchain/ticket-factory";
import { getProvider } from "@/lib/blockchain/utils";
import React, { useEffect, useState } from "react";
import EventCard from "./event-card";

const Events = () => {
  const [events, setEvents] = useState<any[]>([]);
  const provider = getProvider();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getAllActiveEvents(provider);
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
    <div className="mt-20 grid grid-cols-4">
      {events.map((event, index) => {
        return (
          <EventCard
            index={index}
            eventAddress={event.eventAddress}
            title={event.eventName}
            desription={event.description}
            status={event.status}
            imageUrl={event.image}
          />
        );
      })}
    </div>
  );
};

export default Events;
