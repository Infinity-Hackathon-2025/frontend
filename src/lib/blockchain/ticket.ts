import { ethers } from "ethers";
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
    price: z.price,
    maxSupply: z.maxSupply,
    totalMinted: z.totalMinted,
  }));
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
