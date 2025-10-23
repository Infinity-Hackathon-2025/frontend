import { ethers, formatEther, parseEther } from "ethers";
import ticketAbi from "@/constants/abi/ticket-implementation.json";

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
    const eventDate = contract.eventDateTime();
    const timestamp = Number(eventDate);
    const date = new Date(timestamp * 1000);

    const formatted = date.toLocaleString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return formatted;
  } catch (error) {
    throw error;
  }
}

export async function buyTicket(
  signer: ethers.Signer,
  zoneIndex: number,
  quantity: number,
  tokenURI: string,
  totalPrice: bigint
) {
  const ticket = new ethers.Contract(TICKET_ADDRESS, ticketAbi.abi, signer);

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
