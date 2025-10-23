import React from "react";
import { X } from "lucide-react";

interface SeatSettingProps {
  index: number;
  onRemove?: () => void;
  canRemove?: boolean;
}

export default function SeatSetting({
  index,
  onRemove,
  canRemove = false,
}: SeatSettingProps) {
  return (
    <div className="relative bg-gray-50 rounded-2xl p-6 mb-4 border shadow-sm transition-all duration-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-mont text-[#122B59] text-lg font-semibold">
          Tipe Bangku {index}
        </h3>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 font-nexa transition-colors"
          >
            <X size={16} />
            Remove
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Nama bangku (e.g., VIP)"
          className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#0038BD] font-roboto text-[#7C7C7C] placeholder:text-[#A0A0A0] text-sm"
        />
        <input
          type="number"
          placeholder="Jumlah"
          className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#0038BD] font-roboto text-[#7C7C7C] placeholder:text-[#A0A0A0] text-sm"
        />
        <input
          type="number"
          placeholder="Harga"
          className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#0038BD] font-roboto text-[#7C7C7C] placeholder:text-[#A0A0A0] text-sm"
        />
        <input
          type="number"
          placeholder="Maks"
          className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#0038BD] font-roboto text-[#7C7C7C] placeholder:text-[#A0A0A0] text-sm"
        />
      </div>
    </div>
  );
}
