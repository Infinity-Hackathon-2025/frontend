'use client';

const WeeklyTicketSales = () => (
  <div
    className="bg-white rounded-[15px] shadow-md border border-gray-200 p-6 flex flex-col"
    style={{
      width: "842px",
      height: "460px",
    }}
  >
    <div className="flex items-center justify-between mb-5">
      <h3 className="text-lg font-semibold text-gray-800">
        Weekly Ticket Sales
      </h3>
      <span className="text-sm text-gray-500">Minggu ini</span>
    </div>

    <p className="text-sm text-gray-600 mb-6">
      Ringkasan penjualan tiket selama 7 hari terakhir.
    </p>

    <div className="flex-1 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 text-sm">
      Grafik penjualan mingguan (coming soon)
    </div>
  </div>
);

export default WeeklyTicketSales;
