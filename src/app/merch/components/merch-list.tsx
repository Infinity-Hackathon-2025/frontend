"use client";

import { useState } from "react";
import MerchCard from "./merch-card";
import MerchPopup from "./merch-popup";
import Image from "next/image";

export default function MerchList() {
  const [showPopup, setShowPopup] = useState(false);
  const [merchList, setMerchList] = useState([
    { title: "Merch 1", desc: "Kaos eksklusif edisi event.", price: "0.03 ETH", stock: 10 },
    { title: "Merch 2", desc: "Topi limited edition.", price: "0.02 ETH", stock: 5 },
  ]);

  const handleAddMerch = (newMerch: { title: string; desc: string; price: string; stock: number }) => {
    setMerchList((prev) => [...prev, newMerch]);
  };

  const handleDelete = (index: number) => {
    setMerchList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="relative bg-[#f4f6fb] min-h-screen px-[80px] py-[100px] font-roboto">
      <Image
        src="/background/bg-desktop.jpg"
        alt="Background"
        fill
        className="object-cover -z-10"
        priority
      />
      <div className="relative flex flex-col items-center text-center mb-16">
        <h1 className="font-mont text-[36px] font-bold text-[#0038BD] mb-2">
          Add Merchandise to Your Event
        </h1>
        <p className="font-nexa text-[#122B59] text-[16px]">
          Opsional: Buat barang dagangan untuk peserta Anda
        </p>

        <button
          onClick={() => setShowPopup(true)}
          className="absolute right-0 bottom-[-10px] bg-gradient-to-r from-[#f4b640] to-[#f1a83b] text-white px-8 py-3 rounded-xl font-nexa font-semibold hover:opacity-90 transition-all"
        >
          + Tambahkan Merch
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {merchList.map((merch, idx) => (
          <MerchCard key={idx} merch={merch} onDelete={() => handleDelete(idx)} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-20">
        <button className="bg-[#22377E] text-white px-8 py-3 rounded-xl font-nexa font-semibold hover:opacity-90 transition">
          Kembali
        </button>
        <button className="bg-gradient-to-r from-[#f4b640] to-[#f1a83b] text-white px-8 py-3 rounded-xl font-nexa font-semibold hover:opacity-90 transition">
          Payment and Create Event
        </button>
      </div>

      {showPopup && (
        <MerchPopup onClose={() => setShowPopup(false)} onAddMerch={handleAddMerch} />
      )}
    </div>
  );
}
