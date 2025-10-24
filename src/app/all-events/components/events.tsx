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
  const [searchQuery, setSearchQuery] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const filteredEvent = events.filter((e) =>
    e.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <div className="flex flex-col justify-center items-center w-full py-20 gap-6 min-h-screen">
        <p className="font-roboto text-[#7C7C7C]">Loading events...</p>
      </div>
    );
  }
  if (events.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center w-full min-h-screen py-20 gap-6">
        <p className="font-roboto text-[#7C7C7C]">
          Pastikan wallet sudah terkoneksi.
        </p>
      </div>
    );
  }
  return (
    <div>
      <div className="col-span-12 flex justify-center mb-[60px]">
        <div className="relative w-full max-w-[800px]">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="font-roboto w-full h-[52px] rounded-full border border-gray-300 px-5 pr-12 text-[#122B59] text-[14px] md:text-[16px] focus:ring-2 focus:ring-[#0038BD] outline-none shadow-sm bg-white"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0038BD] cursor-pointer">
            🔍
          </span>
        </div>
      </div>
      <div className="mt-20 gap-8 grid grid-cols-4">
        {filteredEvent.map((event, index) => {
          return (
            <EventCard
              key={index}
              eventAddress={event.eventAddress}
              title={event.eventName}
              desription={event.description}
              status={event.status}
              imageUrl={event.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Events;
