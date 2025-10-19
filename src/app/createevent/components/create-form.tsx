"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import SeatSetting from "./seat-setting";
import Image from "next/image";

export default function CreateEventForm() {
  const [poster, setPoster] = useState<File | null>(null);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [seatTypes, setSeatTypes] = useState([{ id: 1 }]);

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPoster(file);
      setPosterUrl(URL.createObjectURL(file));
    }
  };

  const addSeatType = () => {
    setSeatTypes((prev) => [...prev, { id: prev.length + 1 }]);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-left">
        <h1 className="text-3xl font-bold text-[#0038BD] mb-2">
          Create Your Event
        </h1>
        <p className="text-gray-600">
          Atur acara tiket NFT Anda dengan semua detailnya
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-5">
     
          <div className="bg-white rounded-2xl shadow-md p-5">
            <label className="block font-semibold text-[#122B59] mb-2">
              Jadwal Acara *
            </label>
            <input
              type="text"
              placeholder="Pilih hari"
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <label className="block font-semibold text-[#122B59] mb-2">
              Nama Acara *
            </label>
            <input
              type="text"
              placeholder="Masukkan nama acara"
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <label className="block font-semibold text-[#122B59] mb-2">
              Lokasi *
            </label>
            <input
              type="text"
              placeholder="Masukkan lokasi acara"
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <label className="block font-semibold text-[#122B59] mb-2">
              Tanggal dan Waktu *
            </label>
            <div className="flex gap-4">
              <input
                type="date"
                className="w-1/2 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="time"
                className="w-1/2 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <label className="block font-semibold text-[#122B59] mb-2">
              Unggah Syarat & Ketentuan *
            </label>
            <div className="border-2 border-dashed border-blue-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                id="terms-upload"
              />
              <label htmlFor="terms-upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 mb-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5v-9m0 0-3.75 3.75M12 7.5l3.75 3.75"
                    />
                  </svg>
                  masukkan file PDF/DOC di sini atau klik ke jelajah{" "}
                  <span className="text-blue-600">click to browse</span>
                </div>
              </label>
              <p className="text-xs mt-2 text-gray-400">
                Ukuran file maksimal: 10MB
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col">
          <label className="block font-semibold text-[#122B59] mb-3">
            Poster Acara
          </label>

          <div className="border-2 border-dashed border-blue-300 rounded-xl h-[700px] flex flex-col items-center justify-center bg-gray-50 overflow-hidden">
            <input
              type="file"
              accept="image/*"
              onChange={handlePosterChange}
              id="poster-upload"
              className="hidden"
            />

            {posterUrl ? (
              <div className="relative w-full h-full">
                <Image
                  src={posterUrl}
                  alt="Poster preview"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ) : (
              <label
                htmlFor="poster-upload"
                className="flex flex-col items-center justify-center cursor-pointer text-gray-500"
              >
                <div className="bg-yellow-400 rounded-full p-4 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="white"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5v-9m0 0-3.75 3.75M12 7.5l3.75 3.75"
                    />
                  </svg>
                </div>
                <p>Klik untuk upload poster</p>
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-[#122B59] text-lg">
            Pengaturan tempat duduk
          </h2>
          <button
            onClick={addSeatType}
            className="bg-[#0038BD] hover:bg-blue-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm"
          >
            <Plus size={16} /> Tambah
          </button>
        </div>
        {seatTypes.map((seat) => (
          <SeatSetting key={seat.id} index={seat.id} />
        ))}
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 shadow-md">
          Buat Acara
        </button>
      </div>
    </div>
  );
}
