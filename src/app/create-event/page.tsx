"use client";

import { useState } from "react";
import { useWriteContract } from "wagmi";
import factoryAbi from "@/constants/abi/ticket-factory.json";

export default function CreateEventPage() {
  const { writeContract, isPending } = useWriteContract();

  const [form, setForm] = useState({
    eventId: "",
    eventName: "",
    description: "",
    image: "",
    zone: "",
    price: "",
    maxSupply: "",
    royaltyFee: "",
  });

  // 🧩 Wallets & Shares array
  const [payouts, setPayouts] = useState([{ wallet: "", share: "" }]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

    try {
      const wallets = payouts.map((p) => p.wallet);
      const shares = payouts.map((p) => parseInt(p.share));

      const tx = await writeContract({
        address: process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}`,
        abi: factoryAbi.abi,
        functionName: "createEvent",
        args: [
          form.eventId,
          form.eventName,
          form.description,
          form.image,
          form.zone,
          BigInt(parseFloat(form.price) * 1e18),
          BigInt(form.maxSupply),
          BigInt(form.royaltyFee),
          wallets,
          shares,
        ],
      });

      console.log("tx sent:", tx);
      alert("🎉 Event creation submitted! Check your wallet.");
    } catch (err) {
      console.error(err);
      alert("❌ Gagal membuat event. Coba periksa input atau koneksi wallet.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6 text-white">
        🎟️ Create New Event
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 text-gray-200">
        <input
          name="eventId"
          placeholder="Event ID (unik)"
          value={form.eventId}
          onChange={handleChange}
          className="w-full bg-gray-800 p-2 rounded-md"
          required
        />
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
        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full bg-gray-800 p-2 rounded-md"
          required
        />
        <input
          name="zone"
          placeholder="Zone (e.g., VIP, Regular)"
          value={form.zone}
          onChange={handleChange}
          className="w-full bg-gray-800 p-2 rounded-md"
          required
        />

        <div className="flex gap-2">
          <input
            name="price"
            placeholder="Price (ETH)"
            value={form.price}
            onChange={handleChange}
            className="w-1/2 bg-gray-800 p-2 rounded-md"
            required
          />
          <input
            name="maxSupply"
            placeholder="Max Supply"
            value={form.maxSupply}
            onChange={handleChange}
            className="w-1/2 bg-gray-800 p-2 rounded-md"
            required
          />
        </div>

        <input
          name="royaltyFee"
          placeholder="Royalty (e.g., 500 = 5%)"
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

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
        >
          {isPending ? "Deploying..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
