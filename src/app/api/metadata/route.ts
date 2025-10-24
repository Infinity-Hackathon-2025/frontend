import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const metadata = await req.json();

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      metadata,
      {
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
        },
      }
    );

    const hash = res.data.IpfsHash;
    return NextResponse.json({ ipfsURI: `ipfs://${hash}` });
  } catch (error: any) {
    console.error("Pinata upload failed:", error.response?.data || error);
    return NextResponse.json(
      { error: "Upload to IPFS failed" },
      { status: 500 }
    );
  }
}
