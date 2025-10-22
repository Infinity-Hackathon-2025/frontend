"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";
import ButtonCancel from "./button-cancel";

interface MerchPopupProps {
  onClose: () => void;
  onAddMerch: (newMerch: { title: string; desc: string; price: string; stock: number }) => void;
}

export default function MerchPopup({ onClose, onAddMerch }: MerchPopupProps) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState<number | "">("");

  const handleSave = () => {
    if (!title || !desc || !price || stock === "") return;
    onAddMerch({
      title,
      desc,
      price: `${price} ETH`,
      stock: Number(stock),
    });
    onClose();
  };

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(e.target.value));
    setStock(isNaN(value) ? "" : value);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] sm:w-[480px] p-8 relative font-roboto">
        <button
          onClick={onClose}
          className="absolute -top-3 -left-3 bg-[#E60000] hover:opacity-80 text-white rounded-full p-2 shadow-md transition"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-mont font-bold text-[#0038BD] mb-6 text-center">
          Tambahkan Merchandise
        </h2>

        <div className="w-full h-[180px] bg-gray-100 rounded-xl flex flex-col justify-center items-center text-[#7C7C7C] mb-5 cursor-pointer hover:bg-gray-200 transition">
          <Upload className="text-[#0038BD] mb-2" />
          <p className="font-nexa font-medium">Unggah gambar</p>
        </div>

        <div className="flex flex-col gap-4 text-[#7C7C7C]">
          <input
            type="text"
            placeholder="Nama produk"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f4b640]"
          />

          <textarea
            placeholder="Deskripsi produk"
            rows={3}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f4b640]"
          />

          <div className="flex gap-4">
            <div className="relative w-1/2">
              <input
                type="number"
                placeholder="Harga"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f4b640] pr-14"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7C7C7C] font-nexa text-sm">
                ETH
              </span>
            </div>

            <input
              type="number"
              min={0}
              placeholder="Stok"
              value={stock}
              onChange={handleStockChange}
              className="border border-gray-300 rounded-lg p-3 w-1/2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f4b640]"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-6 w-full bg-gradient-to-r from-[#f4b640] to-[#f1a83b] text-white font-nexa font-semibold py-3 rounded-xl hover:opacity-90 transition"
        >
          Simpan Merchandise
        </button>
        <div className="mt-3">
          <ButtonCancel onClick={onClose} />
        </div>
      </div>
    </div>
  );
}
