'use client';

const RoyaltyReport = () => (
  <div
    className="bg-white rounded-[15px] shadow-md border border-gray-200 p-6 flex flex-col"
    style={{
      width: "410px",
      height: "515px",
    }}
  >
    <h3 className="text-lg font-mont font-bold text-[#0038BD] mb-5">
      Royalty Report
    </h3>
    <div className="bg-[#0038BD] rounded-[20px] shadow-sm border border-blue-100 w-full max-w-[330px] h-[120px] flex flex-col justify-center px-6 mb-6">
      <p className="text-sm font-nexa text-white">Total Royalti Diperoleh</p>
      <h4 className="text-3xl font-mont font-bold text-white mt-2">2.4 ETH</h4>
    </div>

    <div className="space-y-3 text-sm font-roboto text-[#7C7C7C]">
      <div className="flex justify-between">
        <span>Tarif Royalti</span>
        <span className="font-nexa text-[#122B59] font-semibold">5%</span>
      </div>
      <div className="flex justify-between">
        <span>Penjualan Sekunder</span>
        <span className="font-nexa text-[#122B59] font-semibold">48</span>
      </div>
      <div className="flex justify-between">
        <span>Rata-Rata Harga Jual Kembali</span>
        <span className="font-nexa text-[#122B59] font-semibold">1.2 ETH</span>
      </div>
    </div>

    <div className="flex-grow" />
  </div>
);

export default RoyaltyReport;
