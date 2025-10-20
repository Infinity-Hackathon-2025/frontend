'use client';

import Image from "next/image";

interface OrderDetailsProps {
  location: string;
  date: string;
  ticketDetails: { title: string; quantity: number; price: number }[];
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ location, date, ticketDetails }) => {
  const visibleTickets = ticketDetails.filter((t) => t.quantity > 0);
  const totalPrice = visibleTickets.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="relative w-full lg:w-[300px] rounded-[12px] shadow-lg overflow-hidden text-gray-800 bg-white">
      <div className="relative w-full min-h-[350px]">
        <Image
          src="/images/cardtiket.png"
          alt="Background tiket konser"
          fill
          className="object-cover"
          priority
        />

        <div className="relative bg-black/30 backdrop-blur-sm p-6 flex flex-col justify-between rounded-[12px]">
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Detail Pesanan</h3>

            <div className="mb-5 text-sm text-white">
              <div className="flex justify-between mb-1">
                <span>Lokasi</span>
                <span className="text-right break-words">{location}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Tanggal</span>
                <span>{date}</span>
              </div>

              <div className="border-b border-white/50 mt-2"></div>
            </div>

            {visibleTickets.length > 0 ? (
              <div className="mb-4">
                <h4 className="font-medium mb-2 text-white">Tiket</h4>
                {visibleTickets.map((ticket, index) => (
                  <div key={index} className="flex justify-between mb-2 text-white">
                    <span>{ticket.title}</span>
                    <span>
                      x{ticket.quantity} — {(ticket.price * ticket.quantity).toFixed(3)} ETH
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/70 italic">
                Belum ada tiket yang dipilih
              </p>
            )}
          </div>

          <div className="pt-3 border-t border-white/40 mt-3">
            <div className="flex justify-between text-white font-semibold mb-3">
              <span>Total</span>
              <span>{totalPrice.toFixed(3)} ETH</span>
            </div>

            <button
              disabled={visibleTickets.length === 0}
              className={`font-medium py-2.5 rounded-full w-full transition-all ${
                visibleTickets.length === 0
                  ? 'bg-gray-400 cursor-not-allowed text-white/70'
                  : 'bg-[#FFAA33] hover:bg-[#e29a2d] text-white'
              }`}
            >
              Lanjut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
