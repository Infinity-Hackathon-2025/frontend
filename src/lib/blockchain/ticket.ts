import { ethers } from "ethers";
import ticketAbi from "@/constants/abi/ticket-implementation.json";

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
