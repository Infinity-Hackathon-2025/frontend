import { useWriteContract, useReadContract, useAccount } from "wagmi";
import factoryAbi from "@/constants/abi/ticket-factory.json";
import { ethers, parseEther } from "ethers";
import { createHash } from "crypto";

const FACTORY_ADDRESS = process.env
  .NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}`;

export function getFactoryContract(signer: ethers.Signer) {
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
