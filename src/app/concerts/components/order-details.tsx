'use client';

interface OrderDetailsProps {
  location: string;
  date: string;
  ticketDetails: { title: string; quantity: number }[];
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ location, date, ticketDetails }) => {
  const totalTickets = ticketDetails.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative w-full lg:w-[300px] rounded-[12px] shadow-lg overflow-hidden text-gray-800">
      <img
        src="/images/cardtiket.png"
        alt="Background tiket konser"
        width={300}
        height={400}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg mb-4 text-white">Detail Pesanan</h3>

          <div className="mb-5 text-sm text-white">
            <div className="flex justify-between mb-1">
              <span>Lokasi</span>
              <span>{location}</span>
            </div>
            <div className="flex justify-between">
              <span>Tanggal</span>
              <span>{date}</span>
            </div>

            <div className="border-b border-white/50 mt-2"></div>
          </div>

          <div className="mb-4">
            <h4 className="font-medium mb-2 text-white">Tiket</h4>
            {ticketDetails.map((ticket, index) => (
              <div key={index} className="flex justify-between mb-2 text-white">
                <span>{ticket.title}</span>
                <span>x{ticket.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <button className="bg-[#FFAA33] text-white font-medium py-2.5 rounded-full w-full hover:bg-[#e29a2d] transition-all">
            Lanjut
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
