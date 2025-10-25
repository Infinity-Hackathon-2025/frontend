import { ethers } from "ethers";
import vaultAbi from "@/constants/abi/vault.json";

const VAULT_ADDRESS = process.env.NEXT_PUBLIC_VAULT_ADDRESS as `0x${string}`;

export async function cancelEvent(signer: ethers.Signer, eventAddress: string) {
  const vault = new ethers.Contract(VAULT_ADDRESS, vaultAbi.abi, signer);

  try {
    const cancel = await vault.cancelEvent(eventAddress);
    const result = await cancel.wait();
    console.log("Event cancelled:", result);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// export async function refund() {}

export async function completeEvent(
  signer: ethers.Signer,
  eventAddress: string
) {
  const vault = new ethers.Contract(VAULT_ADDRESS, vaultAbi.abi, signer);

  try {
    const complete = await vault.completeEvent(eventAddress);
    const result = await complete.wait();
    console.log("Event completed:", result);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function withdrawEventFunds(
  signer: ethers.Signer,
  eventAddress: string
) {
  const vault = new ethers.Contract(VAULT_ADDRESS, vaultAbi.abi, signer);

  try {
    const withdraw = await vault.withdrawEventFunds(eventAddress);
    const result = await withdraw.wait();
    console.log("Withdraw success:", result);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getEventStatus(
  provider: ethers.Provider,
  eventAddress: string
) {
  const vault = new ethers.Contract(VAULT_ADDRESS, vaultAbi.abi, provider);

  try {
    const status = await vault.getEventStatus(eventAddress);
    console.log("📊 Event status:", status);
    return status;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getEventBalance(
  provider: ethers.Provider,
  eventAddress: string
) {
  const vault = new ethers.Contract(VAULT_ADDRESS, vaultAbi.abi, provider);

  try {
    const balance = ethers.formatEther(
      await vault.getEventBalance(eventAddress)
    );

    console.log("💰 Event balance:", balance, "ETH");
    return balance;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
