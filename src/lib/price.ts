"use client";

export async function convertEthToIdr(amountEth: number) {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,idr"
    // { cache: "no-store" } // optional biar selalu realtime
  );

  if (!res.ok) throw new Error("Failed to fetch ETH price");
  const data = await res.json();

  const ethPriceIdr = data.ethereum.idr;
  return amountEth * ethPriceIdr;
}
