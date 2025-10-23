"use client";

import React from "react";

interface OrderDetailsProps {
  name: string;
  quantity: number;
  price: number;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  name,
  quantity,
  price,
}) => {
  const totalPrice = quantity * price;

  return (
    <div className="w-full lg:w-[320px] bg-white rounded-2xl shadow-md p-7 text-[#122B59]">
      <h3 className="font-mont text-[#0038BD] text-[22px] font-semibold mb-5">
        Detail Pesanan
      </h3>

      {name ? (
        <div className="mb-5">
          <h4 className="font-nexa text-[17px] text-[#122B59] mb-3">Tiket</h4>

          <div className="flex justify-between mb-2 font-roboto text-[15px]">
            <span>{name}</span>
            <span>
              x{quantity} — {(price * quantity).toFixed(3)} ETH
            </span>
          </div>
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
          className={`font-nexa text-[15px] py-3 rounded-full w-full transition-all ${
            quantity > 0
              ? "bg-[#FFAA33] hover:bg-[#e29a2d] text-white"
              : "bg-gray-300 cursor-not-allowed text-white/70"
          }`}
        >
          Beli
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
