import { useWriteContract, useReadContract, useAccount } from "wagmi";
import factoryAbi from "@/constants/abi/ticket-factory.json";
import { ethers, parseEther } from "ethers";
import { createHash } from "crypto";

const FACTORY_ADDRESS = process.env
  .NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}`;

export function getFactoryContract(signer: ethers.Signer | ethers.Provider) {
  return new ethers.Contract(FACTORY_ADDRESS, factoryAbi.abi, signer);
}

type Zone = {
  name: string;
  price: string;
  maxSupply: string;
};

type Payout = {
  wallet: string;
  share: string;
};

interface CreateEventProps {
  eventName: string;
  description: string;
  image: string;
  royaltyFee: number;
  payouts: Payout[];
  zones: Zone[];
}

export async function createEvent(
  signer: ethers.Signer,
  props: CreateEventProps
) {
  const factory = getFactoryContract(signer);

  const zones = props.zones.map((z) => z.name);
  const prices = props.zones.map((z) => parseEther(z.price));
  const maxSupplies = props.zones.map((z) => BigInt(z.maxSupply));
  const wallets = props.payouts.map((z) => z.wallet);
  const shares = props.payouts.map((z) => BigInt(z.share));

  const tx = await factory.createEvent(
    props.eventName,
    props.description,
    props.image,
    BigInt(props.royaltyFee),
    wallets,
    shares,
    zones,
    prices,
    maxSupplies
  );

  return await tx.wait();
}

export async function getAllEvents(provider: ethers.Provider) {
  const factory = getFactoryContract(provider);

  try {
    const events = await factory.getAllEvents();

    return events.map((e: any) => ({
      eventAddress: e.eventAddress,
      organizer: e.organizer,
      eventName: e.eventName,
      eventId: e.eventId,
      description: e.description,
      image: e.image,
      royaltyFee: Number(e.royaltyFee),
    }));
  } catch (err) {
    console.error("❌ Failed to fetch events:", err);
    throw err;
  }
}

export async function getEventDetail(
  ticketAddress: string,
  provider: ethers.Provider
) {
  const factory = new ethers.Contract(
    FACTORY_ADDRESS,
    factoryAbi.abi,
    provider
  );

  const allEvents = await getAllEvents(provider);

  const index = await factory.eventIndex(ticketAddress);

  const eventDetail = await allEvents.allEvents(index);

  return {
    address: eventDetail.ticketAddress,
    eventId: eventDetail.eventId,
    name: eventDetail.eventName,
    description: eventDetail.description,
    image: eventDetail.image,
    organizer: eventDetail.organizer,
    royaltyFee: Number(eventDetail.royaltyFee),
  };
}

export async function getEventById(provider: ethers.Provider, eventId: string) {
  const factory = getFactoryContract(provider);
  const event = await factory.getEventById(eventId);

  return event;
}
