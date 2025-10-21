'use client';

import { useEffect, useState } from 'react';

export default function CountdownTimer() {
  const [time, setTime] = useState(90); 

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(time / 60)).padStart(2, '0');
  const seconds = String(time % 60).padStart(2, '0');

  return (
    <div className="flex justify-center gap-2">
      <div className="bg-[#FFC93C] w-[64px] h-[59px] rounded text-[#1E2B59] font-semibold flex items-center justify-center text-lg">
        00
      </div>
      <div className="bg-[#FFC93C] w-[64px] h-[59px] rounded text-[#1E2B59] font-semibold flex items-center justify-center text-lg">
        {minutes}
      </div>
      <div className="bg-[#FFC93C] w-[64px] h-[59px] rounded text-[#1E2B59] font-semibold flex items-center justify-center text-lg">
        {seconds}
      </div>
    </div>
  );
}
