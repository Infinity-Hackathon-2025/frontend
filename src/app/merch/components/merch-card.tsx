"use client";

import Image from "next/image";
import { X } from "lucide-react";

interface MerchCardProps {
  merch: { title: string; desc: string; price: string };
  onDelete: () => void;
}

export default function MerchCard({ merch, onDelete }: MerchCardProps) {
  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all font-roboto">
      <button
        onClick={onDelete}
        className="absolute -top-3 -left-3 bg-[#E60000] text-white p-2 rounded-full shadow-md hover:opacity-80 transition"
      >
        <X size={16} />
      </button>

      <div className="relative w-full h-[220px] bg-gray-200">
        <Image
          src="/background/images/merch.jpg"
          alt={merch.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
          priority
        />
      </div>

      <div className="p-5">
        <h3 className="font-mont text-[#0038BD] text-lg font-bold mb-1">{merch.title}</h3>
        <p className="font-nexa text-[#122B59] text-sm mb-2">{merch.desc}</p>
        <p className="text-[#7C7C7C] font-roboto text-sm">{merch.price}</p>
      </div>
    </div>
  );
}
