import { ethers, formatEther, parseEther } from "ethers";
import ticketAbi from "@/constants/abi/ticket-implementation.json";
import eventAbi from "@/constants/abi/ticket-factory.json";
import { getFactoryContract } from "./ticket-factory";
import { sign } from "crypto";

const TICKET_ADDRESS = process.env.NEXT_PUBLIC_TICKET_ADDRESS as `0x${string}`;

export async function getEventZones(
  provider: ethers.Provider,
  eventAddress: string
) {
  const contract = new ethers.Contract(eventAddress, ticketAbi.abi, provider);

  const zones = await contract.getEventZones(eventAddress);
  // Solidity return: array of structs
  // ethers automatically parses it into JS objects

  console.log("berhasil ambil zones:", zones);

  return zones.map((z: any) => ({
    name: z.name,
    price: formatEther(z.price),
    maxSupply: z.maxSupply,
    totalMinted: z.totalMinted,
  }));
}

export async function getEventDate(
  provider: ethers.Provider,
  eventAddress: string
) {
  const contract = new ethers.Contract(eventAddress, ticketAbi.abi, provider);

  try {
    const eventDate = await contract.eventDateTime();
    const timestamp = Number(eventDate);
    const _date = new Date(timestamp * 1000);

    const date = _date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const time = _date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const formatted = `${date} (${time})`;

    return formatted;
  } catch (error) {
    throw error;
  }
}

export async function buyTicket(
  signer: ethers.Signer,
  eventAddress: string,
  zoneIndex: number,
  quantity: number,
  tokenURI: string,
  totalPrice: bigint
) {
  const ticket = new ethers.Contract(eventAddress, ticketAbi.abi, signer);

  try {
    const tx = await ticket.buyTicket(zoneIndex, quantity, tokenURI, {
      value: totalPrice,
    });

    const receipt = await tx.wait();
    console.log("Ticket purchased:", receipt);
  } catch (error) {
    console.error("Error buying ticket:", error);
    throw error;
  }
}

export async function getMyTickets(
  provider: ethers.Provider,
  signerAddress: string
) {
  const contract = new ethers.Contract(TICKET_ADDRESS, ticketAbi.abi, provider);

  // filter Transfer events ke user
  const filter = contract.filters.Transfer(null, signerAddress);
  const events = await contract.queryFilter(filter);

  // dapetin semua tokenId dari events (safely access args, filter undefined, dedupe)
  let tokenIds: number[] = events
    .map((e: any) => e.args?.tokenId?.toNumber && e.args.tokenId.toNumber())
    .filter((id: number | undefined): id is number => typeof id === "number");

  // remove duplicates if any
  tokenIds = Array.from(new Set(tokenIds));

  // cek ownership & ambil tokenURI
  const myTickets: { tokenId: number; tokenURI: string }[] = [];

  for (let tokenId of tokenIds) {
    try {
      const owner = await contract.ownerOf(tokenId);
      if (owner.toLowerCase() === signerAddress.toLowerCase()) {
        const uri = await contract.tokenURI(tokenId);
        myTickets.push({ tokenId, tokenURI: uri });
      }
    } catch (err) {
      // token mungkin sudah burn, skip
      continue;
    }
  }

  return myTickets;
}
