"use client";

import { useState, useEffect } from "react";
import { createHash } from "crypto";
import { parseEther } from "viem";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { ethers } from "ethers";
import { createEvent } from "@/lib/blockchain/ticket-factory";
import { convertEthToIdr } from "@/lib/price";

type CreateEventProps = {
  eventName: string;
  description: string;
  image: string;
  termsUrl: string;
  royaltyFee: string; // dalam persen (misal 5 = 5%)
  payouts: {
    wallet: string;
    share: string;
    shareInWei: string; // total 10000
  }[];
  zones: {
    name: string;
    price: string; // dalam ETH
    maxSupply: string;
  }[];
};

const testEvent: CreateEventProps = {
  eventName: "AI Robotics Summit 2025",
  description:
    "Konferensi dan pameran robotika & AI terbesar di Asia Tenggara.",
  image: "https://ipfs.io/ipfs/QmExampleHash123456789",
  termsUrl: "https://example.com/terms-and-conditions",
  royaltyFee: "5", // 5%
  payouts: [
    {
      wallet: "0x1234567890abcdef1234567890abcdef12345678", // organizer
      share: "70",
      shareInWei: "7000", // 70%
    },
    {
      wallet: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd", // partner
      share: "30",
      shareInWei: "3000", // 30%
    },
  ],
  zones: [
    {
      name: "VIP",
      price: "0.05", // 0.05 ETH
      maxSupply: "100",
    },
    {
      name: "Regular",
      price: "0.02",
      maxSupply: "500",
    },
    {
      name: "Student",
      price: "0.01",
      maxSupply: "200",
    },
  ],
};

export default function CreateEventPage() {
  const { address, isConnected } = useAccount();
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const [priceIdr, setPriceIdr] = useState([{ zone: "", price: 0 }]);

  useEffect(() => {
    console.log("isPending:", isPending);
  }, [isPending]);

  const [form, setForm] = useState({
    eventName: "",
    description: "",
    image: "",
    zone: "",
    royaltyFee: "",
    terms: "",
  });

  const [imageFile, setImageFile] = useState<File>();
  const [termsFile, setTermsFile] = useState<File>();

  const [uploading, setUploading] = useState(false);

  const [zones, setZones] = useState([
    {
      name: "",
      price: "",
      maxSupply: "",
      loadingConversion: false,
      idrPrice: 0,
    },
  ]);
  const [payouts, setPayouts] = useState([
    { wallet: "", share: "", shareInWei: "" },
  ]);

  // useEffect(() => {}, [zones]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target?.files?.[0]);
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsFile(e.target?.files?.[0]);
  };

  const uploadImage = async () => {
    try {
      if (!imageFile) {
        alert("No file selected");
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set("file", imageFile);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const signedUrl = await uploadRequest.json();
      setForm({ ...form, image: signedUrl });
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading image");
    }
  };

  const uploadTerms = async () => {
    try {
      if (!termsFile) {
        alert("No file selected");
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set("file", termsFile);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const signedUrl = await uploadRequest.json();
      setForm({ ...form, terms: signedUrl });
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading image");
    }
  };

  const handleZoneChange = async (
    index: number,
    field: "name" | "price" | "maxSupply",
    value: string
  ) => {
    const newZones = [...zones];

    newZones[index] = { ...newZones[index], [field]: value };

    setZones(newZones);

    if (field === "price") {
      newZones[index] = { ...newZones[index], loadingConversion: true };
      setZones(newZones);

      const ethValue = Number(newZones[index].price);
      try {
        const idr = await convertEthToIdr(ethValue);
        newZones[index] = {
          ...newZones[index],
          idrPrice: idr,
          loadingConversion: false,
        };
        setZones([...newZones]);
      } catch (err) {
        console.error("Failed to convert ETH to IDR", err);
        newZones[index] = { ...newZones[index], loadingConversion: false };
        setZones([...newZones]);
      }
    }
  };

  const addZone = () => {
    setZones([
      ...zones,
      {
        name: "",
        price: "",
        maxSupply: "",
        loadingConversion: false,
        idrPrice: 0,
      },
    ]);
  };

  const removeZones = (index: number) => {
    const newZones = zones.filter((_, i) => i !== index);
    setZones(newZones);
  };

  const handlePayoutChange = (
    index: number,
    field: "wallet" | "share" | "shareInWei",
    value: string
  ) => {
    const newPayouts = [...payouts];
    newPayouts[index][field] = value;

    if (field === "share" || field === "shareInWei") {
      const _shareInWei = String(Number(newPayouts[index].share) * 100);
      newPayouts[index] = { ...newPayouts[index], shareInWei: _shareInWei };
    }

    setPayouts(newPayouts);
  };

  const addPayout = () => {
    setPayouts([...payouts, { wallet: "", share: "", shareInWei: "" }]);
  };

  const removePayout = (index: number) => {
    const newPayouts = payouts.filter((_, i) => i !== index);
    setPayouts(newPayouts);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitting...");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const eventData = {
        eventName: form.eventName,
        description: form.description,
        image: form.image,
        termsUrl: form.terms,
        royaltyFee: form.royaltyFee,
        payouts: payouts,
        zones: zones,
      };

      const tx = await createEvent(signer, eventData);
      console.log("✅ Event deployed:", tx);
    } catch (err) {
      console.log("error: ", err);
      alert("❌ Gagal membuat event");
    }
  };

  async function handleCreateEventTest() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    try {
      console.log("⏳ Creating event...");
      const txReceipt = await createEvent(signer, testEvent);
      console.log("✅ Event created:", txReceipt);
    } catch (error) {
      console.error("❌ Failed to create event:", error);
    }
  }

  if (!isConnected) {
    return <p>⚠️ Please connect your wallet first.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6 text-white">
        🎟️ Create New Event
      </h1>
      {/* <p>1 ETH ≈ ${priceIdr} USD</p>; */}
      <form onSubmit={handleSubmit} className="space-y-4 text-gray-200">
        <input
          name="eventName"
          placeholder="Event Name"
          value={form.eventName}
          onChange={handleChange}
          className="w-full bg-gray-800 p-2 rounded-md"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full bg-gray-800 p-2 rounded-md"
          rows={3}
          required
        />
        <div className="flex flex-row gap-4">
          <input type="file" onChange={handleImageChange} />
          <button type="button" disabled={uploading} onClick={uploadImage}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
        {form.image}
        {form.image && <img src={form.image} alt="Image from Pinata" />}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold mt-4">Zones</h2>

          {zones.map((p, index) => (
            <div key={index} className="flex gap-2">
              <input
                placeholder="Zone Name"
                value={p.name}
                onChange={(e) =>
                  handleZoneChange(index, "name", e.target.value)
                }
                className="flex-1 bg-gray-800 p-2 rounded-md"
                required
              />
              <input
                placeholder="Price"
                value={p.price}
                onChange={(e) =>
                  handleZoneChange(index, "price", e.target.value)
                }
                className="w-40 bg-gray-800 p-2 rounded-md"
                required
              />
              <input
                placeholder="max supply"
                value={p.maxSupply}
                onChange={(e) =>
                  handleZoneChange(index, "maxSupply", e.target.value)
                }
                className="w-40 bg-gray-800 p-2 rounded-md"
                required
              />
              <p>{p.loadingConversion ? "LAGI LOADINGG" : p.idrPrice}</p>
              {zones.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeZones(index)}
                  className="bg-red-600 hover:bg-red-700 text-white px-2 rounded-md"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addZone}
            className="text-sm text-indigo-400 hover:text-indigo-300 mt-2"
          >
            + Add Zone
          </button>
        </div>

        <input
          name="royaltyFee"
          placeholder="Royalty (%)"
          value={form.royaltyFee}
          onChange={handleChange}
          className="w-full bg-gray-800 p-2 rounded-md"
        />

        <div className="space-y-2">
          <h2 className="text-lg font-semibold mt-4">💰 Payouts</h2>

          {payouts.map((p, index) => (
            <div key={index} className="flex gap-2">
              <input
                placeholder="Wallet Address"
                value={p.wallet}
                onChange={(e) =>
                  handlePayoutChange(index, "wallet", e.target.value)
                }
                className="flex-1 bg-gray-800 p-2 rounded-md"
                required
              />
              <input
                placeholder="Share (10000 = 100%)"
                value={p.share}
                onChange={(e) =>
                  handlePayoutChange(index, "share", e.target.value)
                }
                className="w-40 bg-gray-800 p-2 rounded-md"
                required
              />
              {p.shareInWei}
              {payouts.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePayout(index)}
                  className="bg-red-600 hover:bg-red-700 text-white px-2 rounded-md"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addPayout}
            className="text-sm text-indigo-400 hover:text-indigo-300 mt-2"
          >
            + Add Wallet
          </button>
        </div>

        <div className="flex flex-row gap-4">
          <input accept="pdf" type="file" onChange={handleTermsChange} />
          <button type="button" disabled={uploading} onClick={uploadTerms}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
        {form.terms}

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold"
        >
          {isPending ? "Deploying..." : "Create Event"}
        </button>
      </form>

      <button
        onClick={handleCreateEventTest}
        className="rounded mt-10 bg-purple-600 px-10 py-2"
      >
        Event Test
      </button>
    </div>
  );
}
