"use client";

import { ethers } from "ethers";

export function getProvider() {
  if (typeof window !== "undefined" && (window as any).ethereum) {
    return new ethers.BrowserProvider((window as any).ethereum);
  } else {
    return new ethers.JsonRpcProvider();
  }
}
