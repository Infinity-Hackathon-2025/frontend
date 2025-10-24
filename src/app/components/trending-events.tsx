"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  getAllActiveEvents,
  getAllEvents,
} from "@/lib/blockchain/ticket-factory";
import { getProvider } from "@/lib/blockchain/utils";
import { getEventDate } from "@/lib/blockchain/ticket";
import { useEffect, useState } from "react";
import Link from "next/link";

const TrendingEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const provider = getProvider();
  const [isLoading, setLoading] = useState(true);

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
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < events.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(events.length - 1);
    }
  };
  const handleDotClick = (dotIndex: number) => {
    setIndex(dotIndex);
  };

  return (
    <section className="mx-auto w-full max-w-5xl flex flex-col gap-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-[#1E3A8A]">Trending Events</h2>
        <Link
          className="bg-[#1E3A8A] text-white px-4 py-2 rounded-full shadow-md hover:opacity-90 transition"
          href={"/all-events"}
        >
          Lihat lebih banyak
        </Link>
      </div>

      <div className="relative flex items-center">
        <button
          onClick={handlePrev}
          className="absolute left-[-25px] bg-[#1E3A8A] text-white p-2 rounded-full shadow-md -ml-8"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex gap-8 overflow-x-clip justify-center w-full">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${index * (100 / 3)}%)`,
              width: `${(events.length / 3) * 100}%`,
            }}
          >
            {events.map((e, index) => (
              <Link
                href={`/all-events/${e.eventAddress}`}
                key={index}
                className="w-1/3  transition-all hover:scale-105 shrink-0 flex justify-center"
              >
                <div className="bg-[#FFF6F6] rounded-[40px] p-4 shadow-lg w-[90%] flex flex-col items-start text-left relative">
                  {/* {e.soldOut && (
                    <span className="absolute top-3 right-4 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      SOLD OUT
                    </span>
                  )} */}
                  <img
                    src={e.image}
                    alt={e.eventName}
                    className="rounded-[40px] w-full h-[280px] object-cover"
                  />
                  <h3 className="text-lg font-bold mt-3">{e.eventName}</h3>
                  {/* <p className="text-sm text-gray-600">{e.venue}</p> */}
                  <p className="text-[11px] text-gray-500">{e.eventDate}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-[-25px] bg-[#1E3A8A] text-white p-2 rounded-full shadow-md -mr-8"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all
        ${
          i === index
            ? "h-4 w-4 bg-[#1E3A8A] backdrop-blur-lg shadow-xl"
            : "bg-gray-300 opacity-50"
        }
      `}
            style={{
              backdropFilter: "blur(10px)",
              backgroundColor:
                i === index
                  ? "rgba(30, 58, 138, 0.3)"
                  : "rgba(255, 255, 255, 0.2)",
              boxShadow:
                i === index
                  ? "0 4px 10px rgba(0, 0, 0, 0.2), 0 0 15px rgba(30, 58, 138, 0.6)"
                  : "none",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingEvents;
