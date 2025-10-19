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
      <h3 className="text-lg font-semibold text-gray-800">Financial Report</h3>
      <span className="text-sm text-gray-500">6 bulan terakhir</span>
    </div>

    <p className="text-sm text-gray-600 mb-6">
      Laporan pendapatan dan tren selama 6 bulan terakhir.
    </p>

    <div className="bg-gray-100 rounded-lg flex-1 flex items-center justify-center text-gray-400 text-sm border border-gray-200">
      Grafik pendapatan (coming soon)
    </div>
  </div>
);

export default FinancialReport;
