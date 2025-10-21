"use client";

interface ButtonCancelProps {
  onClick: () => void;
}

export default function ButtonCancel({ onClick }: ButtonCancelProps) {
  return (
    <button
      onClick={onClick}
      className="w-full mt-2 border border-[#7C7C7C] text-[#7C7C7C] py-3 rounded-xl font-nexa hover:bg-gray-100 transition"
    >
      Batal
    </button>
  );
}
