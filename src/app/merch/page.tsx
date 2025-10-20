"use client";

import { useState } from "react";
import MerchCard from "./components/merch-card";
import MerchPopup from "./components/merch-popup";

export default function MerchPage() {
  const [showPopup, setShowPopup] = useState(false);

  const merchList = [
    { title: "Enhypen", date: "14 Desember 2025", venue: "M Bloc Space, Jakarta" },
    { title: "CAS", date: "17 Januari 2025", venue: "Bandung Creative Park" },
    { title: "Bangkit!", date: "21 Juli 2025", venue: "Gorilang Sariyah, Jakarta" },
    { title: "Hatsune Miku", date: "14 Desember 2025", venue: "M Bloc Space, Jakarta" },
  ];

  return (
    <div className="flex flex-col bg-[#f4f6fb] min-h-screen px-[80px] py-[100px] relative">
      <div className="relative flex flex-col items-center text-center mb-16">
        <h1 className="text-[28px] font-bold text-[#1e2843] mb-2">
          Add Merchandise to Your Event
        </h1>
        <p className="text-gray-600 text-[15px] leading-relaxed">
          Opsional: Buat barang dagangan untuk peserta Anda
        </p>

        <button
          onClick={() => setShowPopup(true)}
          className="absolute right-0 bottom-[-10px] bg-gradient-to-r from-[#f4b640] to-[#f1a83b] text-white px-8 py-3 rounded-xl font-medium shadow-md hover:opacity-90 transition-all"
        >
          + Tambahkan Merch
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {merchList.map((merch, idx) => (
          <MerchCard key={idx} merch={merch} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-20">
        <button className="bg-[#22377E] text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition">
          Kembali
        </button>
        <button className="bg-gradient-to-r from-[#f4b640] to-[#f1a83b] text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition">
          Payment and Create Event
        </button>
      </div>

      {showPopup && <MerchPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}
