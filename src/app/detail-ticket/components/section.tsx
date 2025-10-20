'use client';

import { useState } from "react";
import TicketOption from "./ticket-option";
import OrderDetails from "./order-details";

interface SectionProps {
  location: string;
  date: string;
}

export default function Section({ location, date }: SectionProps) {
  const [ticketDetails, setTicketDetails] = useState([
    { title: "Festival", quantity: 0, price: 0.05 },
    { title: "VIP", quantity: 0, price: 0.1 },
  ]);

  const handleQuantityChange = (title: string, newQuantity: number) => {
    setTicketDetails((prevDetails) =>
      prevDetails.map((ticket) =>
        ticket.title === title
          ? { ...ticket, quantity: Math.max(0, newQuantity) } 
          : ticket
      )
    );
  };

  return (
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
            onQuantityChange={(qty) => handleQuantityChange(ticket.title, qty)}
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
  );
}
