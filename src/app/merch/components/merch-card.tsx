"use client";

import Image from "next/image";
import { X } from "lucide-react";

interface MerchCardProps {
  merch: {
    title: string;
    desc: string;
    price: string;
    stock: number;
  };
  onDelete?: (title: string) => void;
}

export default function MerchCard({ merch, onDelete }: MerchCardProps) {
  return (
    <div className="relative bg-white shadow-md rounded-2xl p-5 text-left hover:scale-[1.02] transition-all cursor-pointer border border-gray-100 font-roboto">
      {/* Tombol Hapus */}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(merch.title);
          }}
          className="absolute -top-3 -left-3 bg-[#E60000] hover:opacity-80 text-white rounded-full p-2 shadow-md transition"
        >
          <X size={16} />
        </button>
      )}

      {/* Poster Placeholder */}
      <div className="w-full h-[200px] bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
        <Image
          src="/images/merch.jpg"
          alt={merch.title}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, 400px"
          priority
        />
      </div>

      {/* Detail Merchandise */}
      <h3 className="text-lg font-mont font-semibold text-[#0038BD]">
        {merch.title}
      </h3>
      <p className="text-sm font-nexa text-[#122B59] mt-1">{merch.desc}</p>
      <p className="text-sm font-roboto text-[#7C7C7C] mt-1">{merch.price}</p>
    </div>
  );
}
