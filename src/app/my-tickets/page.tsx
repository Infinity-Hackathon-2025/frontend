"use client";

import { useState } from "react";
import Tiket from "./components/tiket";
import RiwayatTiket from "./components/riwayat-tiket";
import ResellReport from "./components/resell-report";
import Refund from "./components/refund";

export default function MyTicketsPage() {
  const [activeTab, setActiveTab] = useState("tiket");

  const tabs = [
    { key: "tiket", label: "Tiket" },
    { key: "riwayat", label: "Riwayat Tiket" },
    { key: "resell", label: "Resell Report" },
    { key: "refund", label: "Refund" },
  ];

  return (
    <div
      className="min-h-screen px-[50px] py-[100px] bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: "url('/background/bg-landingpage.png')" }}
    >
      <div className="max-w-[1319px] mx-auto">
        <h1 className="text-xl font-semibold text-[#122B59] mb-6">My Ticket</h1>

        <div className="flex gap-[70px] border-b border-gray-300 mb-8 text-sm">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-2 transition-all duration-200 ${
                activeTab === tab.key
                  ? "border-b-2 border-yellow-400 font-medium text-[#1e2843]"
                  : "text-gray-500 hover:text-[#1e2843]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            {/* {activeTab === "tiket" && <Tiket />}
            {activeTab === "riwayat" && <RiwayatTiket />}
            {activeTab === "resell" && <ResellReport />}
            {activeTab === "refund" && <Refund />} */}
            <div className="font-roboto text-lg">Sedang dalam perbaikan</div>
          </div>
        </div>
      </div>
    </div>
  );
}
