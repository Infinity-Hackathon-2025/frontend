import { X, Upload } from "lucide-react";

interface MerchPopupProps {
  onClose: () => void;
}

export default function MerchPopup({ onClose }: MerchPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] sm:w-[480px] p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-[#f87171] hover:bg-[#ef4444] text-[#7C7C7C] rounded-full p-2 transition"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-bold text-[#1E2B59] mb-6 text-center">
          Tambahkan Merchandise
        </h2>

        <div className="w-full h-[180px] bg-gray-100 rounded-xl flex flex-col justify-center items-center text-[#7C7C7C] mb-5 cursor-pointer hover:bg-gray-200 transition">
          <Upload className="text-[#22377E] mb-2" />
          <p className="font-medium">Unggah gambar</p>
        </div>

        <div className="flex flex-col gap-4 text-[#7C7C7C]">
          <input
            type="text"
            placeholder="Nama produk"
            className="border border-gray-300 rounded-lg p-3 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f4b640] text-[#7C7C7C]"
          />
          <textarea
            placeholder="Deskripsi produk"
            rows={4}
            className="border border-gray-300 rounded-lg p-3 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f4b640] text-[#7C7C7C]"
          />
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Harga (ETH)"
              className="border border-gray-300 rounded-lg p-3 w-1/2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f4b640] text-[#7C7C7C]"
            />
            <input
              type="number"
              placeholder="Stok"
              className="border border-gray-300 rounded-lg p-3 w-1/2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f4b640] text-[#7C7C7C]"
            />
          </div>
        </div>
        <button className="mt-6 w-full bg-gradient-to-r from-[#f4b640] to-[#f1a83b] text-white font-semibold py-3 rounded-xl hover:opacity-90 transition">
          Simpan Merchandise
        </button>
      </div>
    </div>
  );
}
