"use client";

import { ethers } from "ethers";

const DEFAULT_RPC = process.env.NEXT_PUBLIC_DEFAULT_RPC;

export function getProvider() {
  if (typeof window !== "undefined" && (window as any).ethereum) {
    return new ethers.BrowserProvider((window as any).ethereum);
  } else {
    return new ethers.JsonRpcProvider(DEFAULT_RPC);
  }
}

export async function getSigner() {
  if (typeof window !== "undefined" && (window as any).ethereum) {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    return signer;
  } else {
    throw new Error("No wallet detected");
  }
}
