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
      <h3 className="text-lg font-nexa font-semibold text-[#122B59]">
        Weekly Ticket Sales
      </h3>
      <span className="text-sm text-[#525252] font-roboto">Minggu ini</span>
    </div>

    <p className="text-sm text-[#525252] mb-6 font-roboto">
      Ringkasan penjualan tiket selama 7 hari terakhir.
    </p>

    <div className="bg-white rounded-[20px] flex-1 flex items-center justify-center text-[#7C7C7C] text-sm font-roboto border border-gray-200 shadow-sm">
      Grafik penjualan mingguan (coming soon)
    </div>
  </div>
);

export default WeeklyTicketSales;
