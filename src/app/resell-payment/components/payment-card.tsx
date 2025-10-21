'use client';

import { useRouter } from 'next/navigation';

export default function PaymentCard() {
  const router = useRouter();

  return (
    <div className="bg-white w-full max-w-[480px] rounded-2xl shadow-lg p-6 flex flex-col justify-between mx-auto h-auto">
      <h3 className="font-mont text-[#0038BD] text-[20px] md:text-[22px] font-bold mb-5">
        Detail Pesanan
      </h3>

      <div className="flex-1 text-[#122B59] space-y-3 font-roboto text-[14px] md:text-[15px] leading-relaxed">
        <div className="flex justify-between">
          <span>Venue</span>
          <span className="text-right">Jakarta Convention Center</span>
        </div>

        <div className="flex justify-between border-b border-gray-300 pb-1">
          <span>Tanggal</span>
          <span>20 Agustus 2025</span>
        </div>

        <div>
          <p className="uppercase font-nexa text-[#0038BD] font-semibold mt-2 mb-1">Tiket</p>
          <div className="flex justify-between border-b border-gray-300 pb-1">
            <span>Festival x5</span>
            <span>0.25 ETH</span>
          </div>
          <div className="flex justify-between border-b border-gray-300 pb-1">
            <span>VIP x2</span>
            <span>0.20 ETH</span>
          </div>
        </div>

        <div className="mt-2">
          <p className="uppercase font-nexa text-[#0038BD] font-semibold mb-1">Detail Order</p>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>0.01 ETH</span>
          </div>
          <div className="flex justify-between">
            <span>Fee</span>
            <span>0.02 ETH</span>
          </div>
        </div>

        <div className="flex justify-between font-semibold text-[#0038BD] pt-3 border-t border-gray-300 mt-1">
          <span>Total</span>
          <span>0.48 ETH</span>
        </div>
      </div>

      <button
        onClick={() => router.push('/done')}
        className="mt-6 w-full bg-gradient-to-r from-[#FFB347] to-[#FFCC33] py-3 rounded-full text-white font-nexa font-semibold text-[15px] md:text-[16px] hover:opacity-90 transition"
      >
        Bayar
      </button>
    </div>
  );
}
