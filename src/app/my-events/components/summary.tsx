"use client";

import { getAllEvents, getMyEvents } from "@/lib/blockchain/ticket-factory";
import { getProvider } from "@/lib/blockchain/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const EventSummary = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);

  const [incomingCount, setIncomingCount] = useState(0);

  const provider = getProvider();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getAllEvents(provider);
        setEvents(data);

        const count = data.filter((e) => e.eventStatus === "Active").length;
        setIncomingCount(count);
      } catch (err) {
        console.error("failed to load events:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);
  return (
    <div className="space-y-8 mt-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[54px] leading-16 font-nexa font-bold text-[#0038BD] mb-3">
            My Event
          </h2>
          <p className="text-lg text-gray-600 font-roboto">
            Kelola acara Anda, lacak penjualan, dan lihat analitik.
          </p>
        </div>

        <Link
          className="mt-6 sm:mt-0 px-8 py-3 rounded-xl text-white font-nexa font-semibold text-lg bg-linear-to-r from-[#FFB444] to-[#FF9E42] hover:from-[#FF9E42] hover:to-[#E88400] shadow-md transition-all"
          href={"/create-event"}
        >
          + Buat Acara
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="bg-[#0038BD] text-white p-7 rounded-2xl shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-base font-nexa opacity-90">Total Pendapatan</h3>
            <p className="text-4xl font-mont font-bold mt-3">26.9 ETH</p>
            <p className="text-sm font-roboto mt-2 text-blue-100">
              +15.3% dari bulan lalu
            </p>
          </div>
        </div>
        <div className="bg-white p-7 rounded-2xl shadow-md border border-gray-200">
          <h3 className="text-base font-nexa text-gray-600">Penjualan Tiket</h3>
          <p className="text-4xl font-mont font-bold text-[#122B59] mt-3">
            99,999+
          </p>
          <p className="text-sm font-roboto text-[#7C7C7C] mt-2">
            Dalam 3 acara
          </p>
        </div>

        {/* Penjualan Merch */}
        <div className="bg-white p-7 rounded-2xl shadow-md border border-gray-200">
          <h3 className="text-base font-nexa text-gray-600">Penjualan Merch</h3>
          <p className="text-4xl font-mont font-bold text-[#122B59] mt-3">
            23,257
          </p>
          <p className="text-sm font-roboto text-[#7C7C7C] mt-2">
            5.3 ETH total
          </p>
        </div>

        <div className="bg-white p-7 rounded-2xl shadow-md border border-gray-200">
          <h3 className="text-base font-nexa text-gray-600">Acara Aktif</h3>
          <p className="text-4xl font-mont font-bold text-[#122B59] mt-3">
            {events.length}
          </p>
          <p className="text-sm font-roboto text-[#7C7C7C] mt-2">
            {incomingCount} yang akan datang
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventSummary;
