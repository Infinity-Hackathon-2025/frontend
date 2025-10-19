"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Tiket() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const refunds = [
    {
      title: "LANY",
      type: "CAT 1",
      date: "20 Agustus 2025",
      desc: "Tiket ini sedang dalam tahap penjualan kembali dan proses perpindahan kepemilikan kepada pembeli",
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-[16px]">
      {refunds.map((refund, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="w-[1319px] max-w-full bg-gradient-to-b from-[#dee3f5] to-[#bcc6e0] rounded-2xl shadow-sm transition-all duration-500 overflow-hidden"
            style={{
              height: isOpen ? "200px" : "182px",
            }}
          >
            <button
              onClick={() => toggle(index)}
              className={`w-full flex justify-between items-start p-6 transition-all duration-500 ${
                isOpen ? "translate-y-[10px]" : "translate-y-0"
              }`}
            >
              <div className="text-left transition-all duration-500">
                <h2 className="text-base font-semibold text-[#1e2843]">{refund.title}</h2>
                <p className="text-sm text-gray-600">{refund.type}</p>
                <p className="text-sm mt-3 text-gray-700">{refund.desc}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm text-gray-700">{refund.date}</p>
                <div className="mt-3">
                  {isOpen ? (
                    <ChevronUp size={18} className="text-gray-700" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-700" />
                  )}
                </div>
              </div>
            </button>

<div
  className={`transition-all duration-500 ${
    isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
  }`}
  style={{
    height: isOpen ? "107px" : "0px",
  }}
>
  {isOpen && (
    <div className="flex justify-between items-center border-t border-gray-300 pt-5 px-6 gap-2">
      <p className="font-semibold text-sm text-gray-800">
        ETH XX
      </p>
      <div className="flex gap-2">
        <button className="bg-gray-200 text-xs px-3 py-1 rounded-md font-medium">
          Sold
        </button>
        <button className="bg-gray-200 text-xs px-3 py-1 rounded-md font-medium">
          QR
        </button>
      </div>
    </div>
  )}
</div>

          </div>
        );
      })}
    </div>
  );
}
