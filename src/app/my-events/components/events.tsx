"use client";
import React, { useEffect, useState } from "react";
import EventCard from "./event-card";
import { getProvider } from "@/lib/blockchain/utils";
import { getAllEvents, getMyEvents } from "@/lib/blockchain/ticket-factory";
import { getEventStatus } from "@/lib/blockchain/vault";

const Events = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [eventStatus, setEventStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const provider = getProvider();

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

  // const events = getAllEvents(provider);
  if (isLoading) return <p>Loading events...</p>;
  if (!events || !Array.isArray(events)) return <p>No events found.</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {events.map((event, index) => {
        return (
          <EventCard
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
        );
      })}
    </div>
  );
};

export default Events;
