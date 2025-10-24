"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TicketOption from "./ticket-option";
import OrderDetails from "./order-details";
import { Button } from "@/components/ui/button";
import { buyTicket, getEventDate } from "@/lib/blockchain/ticket";
import { getProvider, getSigner } from "@/lib/blockchain/utils";
import { ethers } from "ethers";

interface SectionProps {
  eventAddress: string;
  eventName: string;

  description: string;
  image: string;
  zones: any[];
}

interface TicketMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
}

export default function Section({
  eventAddress,
  eventName,
  description,
  image,
  zones,
}: SectionProps) {
  const [isLoading, setLoading] = useState(true);
  const [eventDate, setEventDate] = useState("");

  const provider = getProvider();

  useEffect(() => {
    const fetchDate = async () => {
      try {
        if (!eventAddress) return;

        const date = await getEventDate(provider, eventAddress);
        setEventDate(date);
      } catch (error) {
        console.error("Error fetching date:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDate();
  }, [eventAddress]);

  const [selectedZone, setSelectedZone] = useState({
    index: 0,
    name: "",
    price: 0,
    quantity: 1,
  });

  // const [quantity, setQuantity] = useState(0);
  // const [zoneDetails, setZoneDetails] = useState(
  //   zones.map((z) => ({
  //     name: z.name,
  //     price: z.price,
  //     maxSupply: z.maxSupply,
  //     minted: z.minted,
  //     quantity: 0,
  //     totalPrice: 0,
  //   }))
  // );

  const handleQuantityChange = (quantity: number) => {
    setSelectedZone((prev) => ({
      ...prev,
      quantity: quantity,
    }));
  };

  const handleSelect = (index: number, name: string, price: number) => {
    setSelectedZone((prev) => ({
      index: index,
      name: name,
      price: price,
      quantity: 1,
    }));
  };

  async function uploadJSONToIPFS(metadata: any) {
    const res = await fetch("/api/metadata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metadata),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.ipfsURI;
  }

  async function handleBuyTicket() {
    const metadata: TicketMetadata = {
      name: `${selectedZone.name} - ${eventName}`,
      description: description,
      image: image,
      attributes: [
        { trait_type: "Zone", value: selectedZone.name },
        { trait_type: "Price (ETH)", value: selectedZone.price },
      ],
    };
    const tokenURI = await uploadJSONToIPFS(metadata);
    console.log("Uploaded metadata to IPFS:", tokenURI);

    try {
      const signer = await getSigner();
      const pricePerTicket = ethers.parseEther(selectedZone.price.toString());
      const totalPrice = pricePerTicket * BigInt(selectedZone.quantity);

      // const totalPrice = ethers.parseEther(
      //   (selectedZone.price * selectedZone.quantity).toString()
      // );
      const tx = await buyTicket(
        signer,
        eventAddress,
        selectedZone.index,
        selectedZone.quantity,
        tokenURI,
        totalPrice
      );
      console.log("Ticket bought:", tx);

      setSelectedZone({
        index: 0,
        name: "",
        price: 0,
        quantity: 1,
      });
    } catch (error) {
      console.error("Error uploading metadata:", error);
      throw error;
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start gap-8 mb-10">
        <div className="w-[702px] h-[397px]  bg-gray-200 rounded-[12px] overflow-hidden relative">
          <img
            src={image}
            alt={eventName}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <h2 className="font-mont text-[#0038BD] text-[28px] md:text-[36px] font-bold">
            {eventName}
          </h2>
          <p className="text-lg font-roboto font-bold">{eventDate}</p>
          <p className="font-roboto text-[#122B59] text-[16px] leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          {zones.map((zone, index) => (
            <div
              key={index}
              className="flex flex-row justify-between bg-white rounded-[15px] p-6 shadow-sm mb-5"
            >
              <div className="flex flex-col items-start justify-between">
                <h3 className="font-mont text-[20px] lg:text-[22px] text-[#0038BD] font-semibold">
                  {zone.name}
                </h3>
                <span className="font-nexa text-[18px] font-semibold text-[#122B59]">
                  {zone.price} ETH
                </span>
              </div>

              <div className="flex flex-row gap-10 justify-center items-center">
                <div className="flex items-center">
                  {selectedZone.name == zone.name ? (
                    <div>
                      {" "}
                      <label className="mr-2 text-[15px] font-roboto text-[#122B59]">
                        Qty
                      </label>
                      <input
                        type="number"
                        onChange={(e) =>
                          handleQuantityChange(parseInt(e.target.value))
                        }
                        value={selectedZone.quantity}
                        min={0}
                        className="w-16 p-2 border border-[#0038BD] rounded-md text-center focus:ring-2 focus:ring-[#0038BD] outline-none text-[15px]"
                      />
                    </div>
                  ) : (
                    <Button
                      onClick={(e) =>
                        handleSelect(index, zone.name, zone.price)
                      }
                      className="bg-[#1E3A8A] font-roboto text-lg"
                    >
                      Select Ticket
                    </Button>
                  )}
                </div>

                {/* <div className="flex flex-col justify-between font-nexa text-[18px] font-semibold mb-4">
                  {zone.totalPrice.toFixed(3)} ETH
                  <Button className="bg-amber-">Buy</Button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
        <OrderDetails
          onClick={handleBuyTicket}
          quantity={selectedZone.quantity}
          price={selectedZone.price}
          name={selectedZone.name}
        />
      </div>
    </div>
  );
}
