import { ethers } from "ethers";
import marketplaceAbi from "@/constants/abi/marketplace.json";

const MARKETPLACE_ADDRESS = process.env
  .NEXT_PUBLIC_MARKETPLACE_ADDRESS as `0x${string}`;

export function getMarketplaceContract(
  signer: ethers.Signer | ethers.Provider
) {
  return new ethers.Contract(MARKETPLACE_ADDRESS, marketplaceAbi.abi, signer);
}

export async function listTicket(
  signer: ethers.Signer,
  eventId: string,
  zone: string,
  eventAddress: string,
  tokenId: BigInt,
  price: BigInt
) {
  const marketplace = getMarketplaceContract(signer);

  try {
    const list = await marketplace.listTicket(
      eventId,
      zone,
      eventAddress,
      tokenId,
      price
    );

    const result = await list.wait();
    console.log("Berhasil list ticket:", result);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function cancelListing(signer: ethers.Signer, listingId: BigInt) {
  const marketplace = getMarketplaceContract(signer);

  try {
    const cancel = await marketplace.cancelListing(listingId);
    const result = await cancel.wait();

    console.log("Listing dibatalkan:", result);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function buyListingTicket(
  signer: ethers.Signer,
  listingId: BigInt
) {
  const marketplace = getMarketplaceContract(signer);

  try {
    const buy = await marketplace.buyTicket(listingId);
    const result = await buy.wait();

    console.log("Berhasil membeli tiket:", result);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getListing(provider: ethers.Provider) {
  const marketplace = getMarketplaceContract(provider);
  try {
    return marketplace.getListing();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
