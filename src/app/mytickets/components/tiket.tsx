"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

export default function Tiket() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const refunds = [
    {
      title: "CAS",
      type: "FESTIVAL",
      date: "17 Januari 2025",
      desc: "Bandung Creative Park",
    },
    {
      title: "ENHYPEN",
      type: "CAT 2",
      date: "14 Desember 2025",
      desc: "M Bloc Space, Jakarta",
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
            {/* Header */}
            <button
              onClick={() => toggle(index)}
              className={`w-full flex justify-between items-start p-6 transition-all duration-500 ${
                isOpen ? "translate-y-[10px]" : "translate-y-0"
              }`}
            >
              <div className="text-left transition-all duration-500">
                <h2 className="text-2xl font-semibold text-[#122B59]">
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
                <div className="flex justify-between items-center border-t border-gray-300 pt-5 px-6 gap-2">
                  <p className="font-semibold text-sm text-[#122B59]">
                    ETH XX
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowModal(true)}
                      className="bg-[#f4b640] hover:bg-[#e9a82d] text-white text-xs px-3 py-1 rounded-md font-medium"
                    >
                      Resell
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
          <div className="bg-white rounded-2xl shadow-lg w-[480px] p-6 relative">
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-[#122B59] hover:text-[#0f1e3c]"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-[#122B59]">
              Resell Ticket
            </h2>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-sm text-[#122B59]">Resell Price</label>
                <input
                  type="text"
                  placeholder="ETH"
                  className="w-full mt-1 p-2 border rounded-md bg-gray-100 text-[#122B59]"
                />
              </div>

              <div>
                <label className="text-sm text-[#122B59]">Sell Duration</label>
                <select className="w-full mt-1 p-2 border rounded-md bg-gray-100 text-[#122B59]">
                  <option>Pilih Durasi</option>
                  <option>1 Hari</option>
                  <option>3 Hari</option>
                  <option>7 Hari</option>
                </select>
              </div>

              <div className="flex justify-between text-sm mt-2 text-[#122B59]">
                <span>Promotor Fee</span>
                <span>ETH 1</span>
              </div>
              <div className="flex justify-between text-sm text-[#122B59]">
                <span>Subtotal</span>
                <span>ETH 2</span>
              </div>

              <div className="flex justify-between font-semibold text-lg mt-3 text-[#122B59]">
                <span>EARNINGS</span>
                <span>ETH 2</span>
              </div>

              <button className="mt-5 bg-gradient-to-r from-[#f4b640] to-[#f1a83b] text-white py-2 rounded-lg font-semibold">
                RESELL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
