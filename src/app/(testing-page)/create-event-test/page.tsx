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

export default function CreateEventPage() {
  const { address, isConnected } = useAccount();
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    console.log("isPending:", isPending);
  }, [isPending]);

  const [form, setForm] = useState({
    eventName: "",
    description: "",
    image: "",
    zone: "",
    royaltyFee: 0,
    terms: "",
  });

  const [imageFile, setImageFile] = useState<File>();
  const [termsFile, setTermsFile] = useState<File>();

  const [uploading, setUploading] = useState(false);

  const [zones, setZones] = useState([{ name: "", price: "", maxSupply: "" }]);
  const [payouts, setPayouts] = useState([{ wallet: "", share: "" }]);

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

  const handleZoneChange = (
    index: number,
    field: "name" | "price" | "maxSupply",
    value: string
  ) => {
    const newZones = [...zones];
    newZones[index][field] = value;
    setZones(newZones);
  };

  const addZone = () => {
    setZones([...zones, { name: "", price: "", maxSupply: "" }]);
  };

  const removeZones = (index: number) => {
    const newZones = zones.filter((_, i) => i !== index);
    setZones(newZones);
  };

  const handlePayoutChange = (
    index: number,
    field: "wallet" | "share",
    value: string
  ) => {
    const newPayouts = [...payouts];
    newPayouts[index][field] = value;
    setPayouts(newPayouts);
  };

  const addPayout = () => {
    setPayouts([...payouts, { wallet: "", share: "" }]);
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
        royaltyFee: form.royaltyFee * 100,
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

  if (!isConnected) {
    return <p>⚠️ Please connect your wallet first.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6 text-white">
        🎟️ Create New Event
      </h1>

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
    </div>
  );
}
