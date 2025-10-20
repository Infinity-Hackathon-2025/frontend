'use client';

const QuickAction = () => (
  <div
    className="bg-white rounded-[15px] shadow-md border border-gray-200 p-6 flex flex-col items-center"
    style={{
      width: "410px",
      height: "370px",
    }}
  >
    <h3 className="text-lg font-semibold text-gray-800 mb-6 self-start">
      Quick Action
    </h3>

    <div className="flex flex-col gap-4 items-center w-full">
      <button
        className="w-[327px] h-[58px] bg-[#FF9E42] text-white rounded-[100px] text-base font-medium hover:bg-blue-700 transition-all shadow-sm flex items-center justify-center"
        aria-label="Tambah Merchandise"
      >
        + Tambah Merchandise
      </button>

      <button
        className="w-[327px] h-[58px] bg-[#0038BD] text-white rounded-[100px] text-base font-medium hover:bg-yellow-600 transition-all shadow-sm flex items-center justify-center"
        aria-label="Lihat Analitik"
      >
        Lihat Analitik
      </button>

      <button
  className="w-[327px] h-[58px] border border-red-500 text-red-500 rounded-[100px] text-base font-medium hover:bg-red-50 transition-all shadow-sm flex items-center justify-center"
  aria-label="Batalkan Acara"
>
  Batalkan Acara
</button>

    </div>
  </div>
);

export default QuickAction;
