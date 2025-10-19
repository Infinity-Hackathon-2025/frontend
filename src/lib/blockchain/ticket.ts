import { ethers } from "ethers";
import ticketAbi from "@/constants/abi/ticket-implementation.json";

const TICKET_ADDRESS = process.env.NEXT_PUBLIC_TICKET_ADDRESS as `0x${string}`;

export async function getEventZones(
  provider: ethers.Provider,
  eventAddress: string
) {
  const ticketContract = new ethers.Contract(
    eventAddress,
    ticketAbi.abi,
    provider
  );

  const totalZones = await ticketContract.zones.length;

  const zones: any[] = [];
  let index: number = 0;

  while (true) {
    try {
      const zone = ticketContract.zones(index);
      zones.push(zone);
      index++;
    } catch (error) {
      break;
    }
  }

  return zones;
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
