'use client';

const FinancialReport = () => (
  <div
    className="bg-white rounded-[15px] shadow-md border border-gray-200 p-6 flex flex-col"
    style={{
      width: "842px",
      height: "515px",
    }}
  >
    <div className="flex items-center justify-between mb-5">
      <h3 className="text-lg font-nexa font-semibold text-[#122B59]">
        Financial Report
      </h3>
      <span className="text-sm text-[#525252] font-roboto">
        6 bulan terakhir
      </span>
    </div>

    <p className="text-sm text-[#525252] mb-6 font-roboto">
      Laporan pendapatan dan tren selama 6 bulan terakhir.
    </p>

    <div className="bg-white rounded-[20px] flex-1 flex items-center justify-center text-[#7C7C7C] text-sm font-roboto border border-gray-200 shadow-sm">
      Grafik pendapatan (coming soon)
    </div>
  </div>
);

export default FinancialReport;
