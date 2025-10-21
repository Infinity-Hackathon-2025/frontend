'use client';

import React from "react";

interface OrderDetailsProps {
  location: string;
  date: string;
  ticketDetails: { title: string; quantity: number; price: number }[];
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ location, date, ticketDetails }) => {
  const visibleTickets = ticketDetails.filter((t) => t.quantity > 0);
  const totalPrice = visibleTickets.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full lg:w-[320px] bg-white rounded-[16px] shadow-md p-7 text-[#122B59]">
      <h3 className="font-mont text-[#0038BD] text-[22px] font-semibold mb-5">
        Detail Pesanan
      </h3>

      <div className="mb-4 font-roboto text-[15px]">
        <div className="flex justify-between mb-2">
          <span className="font-nexa text-[15px] text-[#122B59]">Lokasi</span>
          <span className="text-right">{location}</span>
        </div>
        <div className="flex justify-between mb-3">
          <span className="font-nexa text-[15px] text-[#122B59]">Tanggal</span>
          <span>{date}</span>
        </div>
        <div className="border-b border-[#D1D5DB] my-2"></div>
      </div>

      {visibleTickets.length > 0 ? (
        <div className="mb-5">
          <h4 className="font-nexa text-[17px] text-[#122B59] mb-3">Tiket</h4>
          {visibleTickets.map((ticket, index) => (
            <div
              key={index}
              className="flex justify-between mb-2 font-roboto text-[15px]"
            >
              <span>{ticket.title}</span>
              <span>
                x{ticket.quantity} — {(ticket.price * ticket.quantity).toFixed(3)} ETH
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="font-roboto text-[#122B59]/70 text-[15px] italic">
          Belum ada tiket yang dipilih
        </p>
      )}

      <div className="border-t border-[#D1D5DB] pt-4 mt-4">
        <div className="flex justify-between font-nexa text-[18px] font-semibold mb-4">
          <span>Total</span>
          <span>{totalPrice.toFixed(3)} ETH</span>
        </div>

        <button
          disabled={visibleTickets.length === 0}
          className={`font-nexa text-[15px] py-3 rounded-full w-full transition-all ${
            visibleTickets.length === 0
              ? 'bg-gray-300 cursor-not-allowed text-white/70'
              : 'bg-[#FFAA33] hover:bg-[#e29a2d] text-white'
          }`}
        >
          Lanjut
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
