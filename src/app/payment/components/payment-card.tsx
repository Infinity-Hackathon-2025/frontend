'use client';

import { useRouter } from 'next/navigation';

export default function PaymentCard() {
  const router = useRouter();

  return (
    <div className="bg-white w-[503px] h-[618px] rounded-2xl shadow-lg p-8 flex flex-col justify-between mx-auto">
      <h3 className="font-bold text-xl text-[#1E2B59] mb-6">
        Detail Pesanan
      </h3>

      <div className="flex-1 text-gray-800 space-y-3">
        <div className="flex justify-between">
          <span>Venue</span>
          <span className="text-right">Lorem ipsum dolor sit amet</span>
        </div>

        <div className="flex justify-between border-b border-gray-300 pb-2">
          <span>Date</span>
          <span>20 Agustus 2025</span>
        </div>

        <div>
          <p className="uppercase font-semibold text-[#1E2B59] mt-3 mb-1">Ticket</p>
          <div className="flex justify-between border-b border-gray-300 pb-2">
            <span>Festival x5</span>
            <span>IDR XXX.XXX</span>
          </div>
        </div>

        <div className="mt-3">
          <p className="uppercase font-semibold text-[#1E2B59] mb-1">
            Detail Order
          </p>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>IDR XXX.XXX</span>
          </div>
          <div className="flex justify-between">
            <span>Fee</span>
            <span>IDR XXX.XXX</span>
          </div>
        </div>

        <div className="flex justify-between font-semibold text-[#1E2B59] pt-4 border-t border-gray-300 mt-2">
          <span>Total</span>
          <span>IDR XXX.XXX</span>
        </div>
      </div>

      <button
        onClick={() => router.push('/done')}
        className="w-full bg-gradient-to-r from-[#FFB347] to-[#FFCC33] py-3 rounded-full text-white font-semibold text-lg hover:opacity-90 transition mt-6"
      >
        Bayar
      </button>
    </div>
  );
}
