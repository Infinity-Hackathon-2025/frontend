import { useWriteContract, useReadContract, useAccount } from "wagmi";
import factoryAbi from "@/constants/abi/ticket-factory.json";
import { ethers, parseEther } from "ethers";
import { createHash } from "crypto";
import { getEventStatus } from "./vault";

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
  shareInWei: string;
};

interface CreateEventProps {
  eventName: string;
  description: string;
  eventDateTime: number;
  image: string;
  termsUrl: string;
  royaltyFee: string;
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
  const shares = props.payouts.map((z) => BigInt(z.shareInWei));

  const royaltyInBps = Math.floor(Number(props.royaltyFee) * 100);

  const tx = await factory.createEvent(
    props.eventName,
    props.description,
    BigInt(props.eventDateTime),
    props.image,
    props.termsUrl,
    BigInt(royaltyInBps),
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
    const getEvents = await factory.getAllEvents();

    // Ambil data dasar dari event
    const events = await Promise.all(
      getEvents.map(async (e: any) => {
        const eventStatus = await getEventStatus(provider, e.eventAddress);

        return {
          eventAddress: e.eventAddress,
          organizer: e.organizer,
          eventName: e.eventName,
          eventId: e.eventId,
          description: e.description,
          image: e.image,
          royaltyFee: Number(e.royaltyFee),
          eventStatus,
        };
      })
    );

    return events;
  } catch (err) {
    console.error("Failed to fetch events:", err);
    throw err;
  }
}

export async function getAllActiveEvents(provider: ethers.Provider) {
  const factory = getFactoryContract(provider);

  try {
    const getEvents = await factory.getAllEvents();

    const events = await Promise.all(
      getEvents.map(async (e: any) => {
        const eventStatus = await getEventStatus(provider, e.eventAddress);

        return {
          eventAddress: e.eventAddress,
          organizer: e.organizer,
          eventName: e.eventName,
          eventId: e.eventId,
          description: e.description,
          image: e.image,
          royaltyFee: Number(e.royaltyFee),
          eventStatus,
        };
      })
    );

    const activeEvents = events.filter(
      (e) =>
        e.eventStatus === "Active" ||
        e.eventStatus === 1 ||
        e.eventStatus === true
    );

    return activeEvents;
  } catch (err) {
    console.error("Failed to fetch events:", err);
    throw err;
  }
}

export async function getMyEvents(provider: ethers.Provider) {
  const factory = getFactoryContract(provider);

  try {
    const events = await factory.getMyEvents();

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
    console.error("Failed to fetch events:", err);
    throw err;
  }
}

export async function getEventByAddress(
  provider: ethers.Provider,
  eventAddress: string
) {
  const factory = getFactoryContract(provider);
  const event = await factory.getEventByAddress(eventAddress);

  return event;
}

export async function getEventById(provider: ethers.Provider, eventId: string) {
  const factory = getFactoryContract(provider);
  const event = await factory.getEventById(eventId);

  return event;
}
