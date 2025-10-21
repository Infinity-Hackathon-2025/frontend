'use client';

import { useState } from 'react';
import TicketOption from './components/ticket-option';
import OrderDetails from './components/order-details';

const Concerts = (props: PageProps<"/concerts">) => {
  const [ticketDetails, setTicketDetails] = useState([
    { title: 'Festival', quantity: 1 },
    { title: 'VIP', quantity: 0 },
  ]);

  const location = 'Lorem ipsum dolor sit amet';
  const date = '20 Agustus 2025';

  const handleQuantityChange = (title: string, quantity: number) => {
    setTicketDetails((prevDetails) =>
      prevDetails.map((ticket) =>
        ticket.title === title ? { ...ticket, quantity } : ticket
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-[60px] md:px-[80px] py-[100px]">
      <div className="flex flex-col md:flex-row items-start gap-8 mb-10">
        <div className="w-[702px] h-[397px] bg-gray-200 rounded-[12px] overflow-hidden">
          <img
            src="/images/concert-placeholder.jpg"
            alt="Concert placeholder"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-4xl font-bold text-[#1E3A8A] mb-3">KONSER</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <TicketOption
            title="Festival"
            description="FREE STANDING"
            price="IDR XXX.XXX"
            quantity={ticketDetails[0].quantity}
            onQuantityChange={(quantity) => handleQuantityChange('Festival', quantity)}
          />
          <TicketOption
            title="VIP"
            description="SEATED AREA"
            price="IDR XXX.XXX"
            quantity={ticketDetails[1].quantity}
            onQuantityChange={(quantity) => handleQuantityChange('VIP', quantity)}
          />
        </div>

        <div className="w-full lg:w-[300px]">
          <OrderDetails
            location={location}
            date={date}
            ticketDetails={ticketDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default Concerts;
