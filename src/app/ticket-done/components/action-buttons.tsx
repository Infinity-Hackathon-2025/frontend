'use client';

import { useRouter } from 'next/navigation';

export default function ActionButtons() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 mt-8 items-center">
      <button
        onClick={() => router.push('/')}
        className="bg-gradient-to-r from-[#2D4ECC] to-[#1E2B59] text-white py-3 px-6 rounded-full font-mont font-semibold text-[16px] w-[240px] transition-all hover:opacity-90"
      >
        Kembali ke Beranda
      </button>
      <button
        onClick={() => router.push('/mytickets')}
        className="border border-[#1E2B59] py-3 px-6 rounded-full font-mont text-[#1E2B59] font-medium text-[16px] w-[240px] hover:bg-[#F4F6FA] transition-all"
      >
        Lihat Riwayat
      </button>
    </div>
  );
}
