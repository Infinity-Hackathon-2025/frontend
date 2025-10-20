"use client";

import React from "react";
import Image from "next/image";

interface EventCardProps {
  title: string;
  ticketsSold: number;
  totalTickets: number;
  ticketAmount: number;
  merchSold: number;
  merchAmount: number;
  status: string;
  imageUrl: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  ticketsSold,
  totalTickets,
  ticketAmount,
  merchSold,
  merchAmount,
  status,
  imageUrl,
}) => {
  const statusColor =
    status === "Berjalan"
      ? "bg-green-100 text-green-600"
      : status === "Selesai"
      ? "bg-blue-100 text-blue-600"
      : "bg-red-100 text-red-600";

  return (
    <div className="bg-white rounded-[15px] shadow-md border border-gray-200 overflow-hidden flex flex-col">
      <div className="relative w-full h-40 bg-gray-200">
        <Image
          src={imageUrl}
          alt={title}
          width={600}
          height={160}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
        >
          {status}
        </span>
      </div>

      <div className="p-5 space-y-4 flex-1">
        <div className="bg-gray-50 rounded-[12px] border border-gray-200 p-4 shadow-sm">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Penjualan Tiket
          </h4>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Tiket Terjual</span>
            <span className="font-semibold text-gray-900">
              {ticketsSold}/{totalTickets}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>Total Penjualan</span>
            <span className="font-semibold text-gray-900">
              {ticketAmount} ETH
            </span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-[12px] border border-gray-200 p-4 shadow-sm">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Penjualan Merchandise
          </h4>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Jumlah Terjual</span>
            <span className="font-semibold text-gray-900">{merchSold}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>Total Penjualan</span>
            <span className="font-semibold text-gray-900">
              {merchAmount} ETH
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
