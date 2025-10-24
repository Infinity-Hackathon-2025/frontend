"use client";
import React from "react";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { cancelEvent, completeEvent } from "@/lib/blockchain/vault";
import { getSigner } from "@/lib/blockchain/utils";
import Link from "next/link";

interface EventCardProps {
  index: number;
  eventAddress: string;
  title: string;
  desription: string;
  status: string;
  imageUrl: string;
}

const EventCard: React.FC<EventCardProps> = ({
  index,
  eventAddress,
  title,
  desription,
  status,
  imageUrl,
}) => {
  const signer = getSigner();
  const statusColor =
    status === "Berjalan"
      ? "bg-green-100 text-green-600"
      : status === "Selesai"
      ? "bg-blue-100 text-blue-600"
      : "bg-red-100 text-red-600";

  const handleComplete = async () => {
    try {
      await completeEvent(await signer, eventAddress);
      console.log("Event completed");
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancel = async () => {
    try {
      await cancelEvent(await signer, eventAddress);
      console.log("Event Canceled");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Link
      key={index}
      className="bg-white hover:scale-[1.02] transition-all rounded-[15px] shadow-md border border-gray-200 overflow-hidden flex flex-col"
      href={`/all-events/${eventAddress}`}
    >
      <div className="relative w-full h-40 bg-gray-200">
        <img
          src={imageUrl}
          alt={title}
          width={600}
          height={160}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <div className="flex flex-row gap-4">
          <h3 className="text-lg font-mont font-bold text-[#0038BD]">
            {title}
          </h3>
        </div>
      </div>

      <div className="p-5 space-y-4 flex-1 font-roboto text-[#7C7C7C] line-clamp-1 mb-6">
        {desription}
      </div>
    </Link>
  );
};

export default EventCard;
