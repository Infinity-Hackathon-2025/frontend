'use client';

import { useRouter } from 'next/navigation';

export default function ActionButtons() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 mt-8 items-center">
      <button
        onClick={() => router.push('/')}
        className="bg-gradient-to-r from-[#2D4ECC] to-[#1E2B59] text-white py-2 px-6 rounded-full font-semibold w-[240px]"
      >
        Kembali ke beranda
      </button>

      <button
        onClick={() => router.push('/history')}
        className="border border-[#1E2B59] py-2 px-6 rounded-full text-[#1E2B59] font-medium w-[240px]"
      >
        Lihat riwayat
      </button>
    </div>
  );
}
