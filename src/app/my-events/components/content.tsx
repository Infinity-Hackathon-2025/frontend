"use client";
import React, { useEffect, useState } from "react";
import EventCard from "./event-card";
import { getProvider } from "@/lib/blockchain/utils";
import { getAllEvents, getMyEvents } from "@/lib/blockchain/ticket-factory";
import Link from "next/link";
import { getEventBalance } from "@/lib/blockchain/vault";
import FinancialReport from "./financial-report";
import RoyaltyReport from "./royalty-report";
import WeeklyTicketSales from "./weekly-ticketsales";
import QuickAction from "./quick-action";
import EventSummary from "./summary";

const Content = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const provider = getProvider();

  let allEventsBalance = 0;

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getAllEvents(provider);

        const eventsWithBalances = await Promise.all(
          data.map(async (event) => {
            const balance = await getEventBalance(provider, event.eventAddress);
            return { ...event, balance };
          })
        );

        console.log("events: ", eventsWithBalances);

        setEvents(eventsWithBalances);
      } catch (err) {
        console.error("failed to load events:", err);
      } finally {
        setIsLoading(false);
      }

      for (let i = 0; i < events.length; i++) {
        allEventsBalance = allEventsBalance + events[i].balance;
      }
    }
    fetchEvents();
  }, []);

  if (isLoading) {
    return <p className="font-roboto text-[#7C7C7C]">Loading events...</p>;
  }
  if (events.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center w-full py-20 gap-6">
        <p className="font-roboto text-[#7C7C7C]">No events found.</p>
        <Link
          className="mt-6 sm:mt-0 px-8 py-3 rounded-xl text-white font-nexa font-semibold text-lg bg-linear-to-r from-[#FFB444] to-[#FF9E42] hover:from-[#FF9E42] hover:to-[#E88400] shadow-md transition-all"
          href={"/create-event"}
        >
          + Buat Acara
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <EventSummary allEventsBalance={allEventsBalance} />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 font-roboto text-[#7C7C7C]">
        {events.map((event, index) => (
          <div>
            {event.totalMinted}
            <EventCard
              key={index}
              index={index}
              eventAddress={event.eventAddress}
              title={event.eventName}
              ticketsSold={450}
              totalTickets={500}
              balance={event.balance}
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
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FinancialReport />
        </div>
        <div>
          <RoyaltyReport />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklyTicketSales />
        </div>
        <div>
          <QuickAction />
        </div>
      </div>
    </div>
  );
};

export default Content;
