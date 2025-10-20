'use client';

import { useState } from "react";
import Image from "next/image";
import TicketOption from "./ticket-option";
import OrderDetails from "./order-details";

export default function Section() {
  const [ticketDetails, setTicketDetails] = useState([
    { title: "Festival", quantity: 0, price: 0.05 },
    { title: "VIP", quantity: 0, price: 0.1 },
  ]);

  const location = "Jakarta Convention Center";
  const date = "20 Agustus 2025";

  const handleQuantityChange = (title: string, quantity: number) => {
    setTicketDetails((prev) =>
      prev.map((ticket) =>
        ticket.title === title ? { ...ticket, quantity } : ticket
      )
    );
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start gap-8 mb-10">
        <div className="w-[702px] h-[397px] bg-gray-200 rounded-[12px] overflow-hidden relative">
          <Image
            src="/images/concert-placeholder.jpg"
            alt="Concert placeholder"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex-1">
          <h2 className="text-4xl font-bold text-[#1E3A8A] mb-3">KONSER</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            Tiket konser
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          {ticketDetails.map((ticket) => (
            <TicketOption
              key={ticket.title}
              title={ticket.title}
              description={
                ticket.title === "VIP" ? "SEATED AREA" : "FREE STANDING"
              }
              price={ticket.price}
              quantity={ticket.quantity}
              onQuantityChange={(qty) =>
                handleQuantityChange(ticket.title, qty)
              }
            />
          ))}
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
}
