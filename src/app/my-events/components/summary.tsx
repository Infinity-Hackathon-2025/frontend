'use client';

const EventSummary = () => (
  <div className="space-y-6 mt-12">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-[#0038BD] mb-1">
          My Event
        </h2>
        <p className="text-gray-600 text-sm">
          Kelola acara Anda, lacak penjualan, dan lihat analitik.
        </p>
      </div>

      <button className="mt-3 sm:mt-0 px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 shadow-md">
        + Buat Acara
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-md flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-medium opacity-90">Total Pendapatan</h3>
          <p className="text-3xl font-semibold mt-2">26.9 ETH</p>
          <p className="text-sm mt-1 text-blue-100">+15.3% dari bulan lalu</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <h3 className="text-sm font-medium text-gray-600">Penjualan Tiket</h3>
        <p className="text-3xl font-semibold text-gray-900 mt-2">99,999+</p>
        <p className="text-sm text-gray-500 mt-1">Dalam 3 acara</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <h3 className="text-sm font-medium text-gray-600">Penjualan Merch</h3>
        <p className="text-3xl font-semibold text-gray-900 mt-2">23,257</p>
        <p className="text-sm text-gray-500 mt-1">5.3 ETH total</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <h3 className="text-sm font-medium text-gray-600">Acara Aktif</h3>
        <p className="text-3xl font-semibold text-gray-900 mt-2">2</p>
        <p className="text-sm text-gray-500 mt-1">2 yang akan datang</p>
      </div>
    </div>
  </div>
);

export default EventSummary;
