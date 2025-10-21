'use client';

export default function SuccessMessage() {
  return (
    <div>
      <h1 className="font-mont text-[#1E2B59] text-[28px] md:text-[36px] font-bold">
        PEMBAYARAN BERHASIL
      </h1>
      <p className="font-roboto text-[#122B59] text-[16px] leading-relaxed mt-3 max-w-md mx-auto">
        Cek di <span className="font-semibold text-[#1E2B59]">My Ticket</span> untuk melihat detail pesanan Anda.
      </p>
    </div>
  );
}
 