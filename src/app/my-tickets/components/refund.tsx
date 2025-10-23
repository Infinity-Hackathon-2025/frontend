"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Refund() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const refunds = [
    {
      title: "TENXI",
      type: "FREE STANDING",
      date: "20 Agustus 2025",
      desc: "Pengajuan refund sedang diproses. Harap tunggu maksimal 3x24 jam.",
      status: "Menunggu Konfirmasi",
    },
    {
      title: "WORKSHOP",
      type: "",
      date: "19 Agustus 2025",
      desc: "Refund telah berhasil diproses ke rekening Anda.",
      status: "Refund Selesai",
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-[16px]">
      {refunds.map((refund, index) => {
        const isOpen = openIndex === index;
        const isDone = refund.status === "Refund Selesai";

        return (
          <div
            key={index}
            className={`w-[1319px] max-w-full bg-gradient-to-b from-[#dee3f5] to-[#bcc6e0] rounded-2xl shadow-sm transition-all duration-500 overflow-hidden ${
              isDone ? "brightness-50" : ""
            }`}
            style={{
              height: isOpen ? "200px" : "182px",
            }}
          >
            {/* Header */}
            <button
              onClick={() => toggle(index)}
              className={`w-full flex justify-between items-start p-6 transition-all duration-500 ${
                isOpen ? "translate-y-[10px]" : "translate-y-0"
              }`}
            >
              <div className="text-left transition-all duration-500">
                <h2 className="text-base font-semibold text-[#122B59]">
                  {refund.title}
                </h2>
                <p className="text-sm text-[#122B59]">{refund.type}</p>
                <p className="text-sm mt-3 text-[#122B59]">{refund.desc}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm text-[#122B59]">{refund.date}</p>
                <div className="mt-3">
                  {isOpen ? (
                    <ChevronUp size={18} className="text-[#122B59]" />
                  ) : (
                    <ChevronDown size={18} className="text-[#122B59]" />
                  )}
                </div>
              </div>
            </button>

            {/* Dropdown Detail */}
            <div
              className={`transition-all duration-500 ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
              }`}
              style={{
                height: isOpen ? "107px" : "0px",
              }}
            >
              {isOpen && (
                <div className="flex justify-between items-center border-t border-gray-300 pt-5 px-6">
                  <p className="font-semibold text-sm text-[#122B59]">
                    Status:{" "}
                    <span
                      className={
                        isDone ? "text-green-600" : "text-yellow-600"
                      }
                    >
                      {refund.status}
                    </span>
                  </p>
                  <button className="bg-gray-200 text-xs px-3 py-1 rounded-md font-medium">
                    Detail Refund
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
