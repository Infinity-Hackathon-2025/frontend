'use client';
import React, { useEffect, useState } from "react";
import EventCard from "./event-card";
import { getProvider } from "@/lib/blockchain/utils";
import { getAllEvents } from "@/lib/blockchain/ticket-factory";

const Events = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const provider = getProvider();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getAllEvents(provider);
        setEvents(data);
      } catch (err) {
        console.error("failed to load events:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (isLoading)
    return (
      <p className="font-roboto text-[#7C7C7C]">Loading events...</p>
    );
  if (!events || !Array.isArray(events))
    return (
      <p className="font-roboto text-[#7C7C7C]">No events found.</p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 font-roboto text-[#7C7C7C]">
      {events.map((event, index) => (
        <EventCard
          key={index}
          index={index}
          eventAddress={event.eventAddress}
          title={event.eventName}
          ticketsSold={450}
          totalTickets={500}
          ticketAmount={4.5}
          merchSold={246}
          merchAmount={3.2}
          status={
            event.eventStatus === "Active"
              ? "Berjalan"
              : event.eventStatus === "Complete"
              ? "Selesai"
              : "Dibatalkan"
          }
          imageUrl={event.image}
        />
      ))}
    </div>
  );
};

export default Events;
