"use client";

import React, { useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import SeatSetting from "./seat-setting";
import Image from "next/image";
import { createEvent } from "@/lib/blockchain/ticket-factory";
import { ethers } from "ethers";
import { convertEthToIdr } from "@/lib/price";
import { cn } from "@/lib/utils";

export default function Form() {
  const termsRef = useRef<HTMLInputElement | null>(null);

  const [posterFile, setPosterFile] = useState<File>();
  const [termsFile, setTermsFile] = useState<File>();

  const [form, setForm] = useState({
    eventName: "",
    description: "",
    eventDateTime: "",
    imageUrl: "",
    royaltyFee: "",
    termsUrl: "",
  });

  const refs = {
    eventName: useRef<HTMLInputElement>(null),
    description: useRef<HTMLTextAreaElement>(null),
    eventDateTime: useRef<HTMLInputElement>(null),
    imageUrl: useRef<HTMLInputElement>(null),
    royaltyFee: useRef<HTMLInputElement>(null),
  };

  const [errors, setErrors] = useState<any>({});

  const [shakeField, setShakeFiels] = useState("");

  const [posterUploading, setPosterUploading] = useState(false);
  const [termsUploading, setTermsUploading] = useState(false);

  const [zones, setZones] = useState([
    {
      name: "",
      price: "",
      maxSupply: "",
      loadingConversion: false,
      idrPrice: "",
    },
  ]);
  const [payouts, setPayouts] = useState([
    { wallet: "", share: "", shareInWei: "" },
  ]);

  const handleTermsClick = () => {
    termsRef.current?.click();
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosterFile(e.target?.files?.[0]);
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsFile(e.target?.files?.[0]);
  };

  const uploadImage = async () => {
    try {
      if (!posterFile) {
        alert("No file selected");
        return;
      }

      setPosterUploading(true);
      const data = new FormData();
      data.set("file", posterFile);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const signedUrl = await uploadRequest.json();
      setForm({ ...form, imageUrl: signedUrl });
      setPosterUploading(false);
    } catch (e) {
      console.log(e);
      setPosterUploading(false);
      alert("Trouble uploading image");
    }
  };

  const uploadTerms = async () => {
    try {
      if (!termsFile) {
        alert("No file selected");
        return;
      }

      setTermsUploading(true);
      const data = new FormData();
      data.set("file", termsFile);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const signedUrl = await uploadRequest.json();
      setForm({ ...form, termsUrl: signedUrl });
      setTermsUploading(false);
    } catch (e) {
      console.log(e);
      setTermsUploading(false);
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
        idrPrice: "",
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

  const validateForm = () => {
    const newErrors: any = {};

    if (!form.eventName.trim()) newErrors.eventName = "Nama event wajib diisi";
    if (!form.description.trim())
      newErrors.description = "Deskripsi wajib diisi";
    if (!form.eventDateTime) newErrors.eventDateTime = "Tanggal wajib diisi";
    if (!form.royaltyFee) newErrors.royaltyFee = "Royalti wajib diisi";

    newErrors.zones = zones.map((zone, i) => {
      const zoneErrors: any = {};
      if (!zone.name.trim()) zoneErrors.name = "Nama zona wajib diisi";
      if (!zone.price.trim()) zoneErrors.price = "Harga wajib diisi";
      if (!zone.maxSupply.trim()) zoneErrors.maxSupply = "Jumlah wajib diisi";
      return zoneErrors;
    });

    // Validasi Payouts
    newErrors.payouts = payouts.map((payout, i) => {
      const payoutErrors: any = {};
      if (!payout.wallet.trim()) payoutErrors.wallet = "Wallet wajib diisi";
      if (!payout.share.trim()) payoutErrors.share = "Share wajib diisi";
      return payoutErrors;
    });

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateForm();
    setErrors(validation);

    const firstErrorField =
      Object.keys(validation).find((key) => validation[key]) ||
      Object.entries(validation.zones || []).find(
        ([_, z]: any) => Object.keys(z).length > 0
      )?.[0] ||
      Object.entries(validation.payouts || []).find(
        ([_, p]: any) => Object.keys(p).length > 0
      )?.[0];

    if (firstErrorField) {
      setShakeFiels(firstErrorField);

      const ref = refs[firstErrorField as keyof typeof refs]?.current;
      if (ref) {
        ref.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        setTimeout(() => {
          ref.focus();
        }, 300);
      }

      setTimeout(() => setShakeFiels(""), 600);
      return;
    }

    console.log("submitting...");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const timestamp = Math.floor(
        new Date(form.eventDateTime).getTime() / 1000
      );

      const eventData = {
        eventName: form.eventName,
        description: form.description,
        eventDateTime: timestamp,
        image: form.imageUrl,
        termsUrl: form.termsUrl,
        royaltyFee: form.royaltyFee,
        payouts: payouts,
        zones: zones,
      };

      const tx = await createEvent(signer, eventData);
      console.log("Event deployed:", tx);

      setForm({
        eventName: "",
        description: "",
        eventDateTime: "",
        imageUrl: "",
        royaltyFee: "",
        termsUrl: "",
      });
      setPayouts([]);
      setZones([]);

      alert("Event berhasil dibuat!");
    } catch (err) {
      console.log("error: ", err);
      alert(`Pastikan kamu mengisi semua info event`);
    }
  };

  return (
    <div className="flex flex-col gap-8 font-roboto text-[#7C7C7C]">
      {/* TITLE */}
      <div className="text-left">
        <h1 className="text-[48px] md:text-[54px] font-nexa font-bold text-[#0038BD] mb-2">
          Create Your Event
        </h1>
        <p className="text-[14px] md:text-[18px] font-roboto text-[#7C7C7C]">
          Atur acara tiket NFT Anda dengan semua detailnya
        </p>
      </div>

      <div className="text-[#122B59] grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-5">
          <div className={cn("bg-white rounded-2xl shadow-md p-5")}>
            <label className="flex gap-2 flex-row font-semibold text-[#122B59] mb-2 text-[16px] md:text-[18px]">
              Nama Acara *{" "}
              {errors.eventName && form.eventName == "" && (
                <p className="text-red-500 font-normal text-lg">
                  {errors.eventName}
                </p>
              )}
            </label>
            <input
              ref={refs.eventName}
              name="eventName"
              onChange={handleFormChange}
              value={form.eventName}
              type="text"
              placeholder="Masukkan nama acara"
              className={cn(
                "w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#0038BD] font-roboto text-[#7C7C7C]",
                shakeField === "eventName" && "animate-shake"
              )}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <label className="block font-semibold text-[#122B59] mb-2 text-[16px] md:text-[18px]">
              Deskripsi *{" "}
              {errors.description && form.description == "" && (
                <p className="text-red-500 font-normal text-lg">
                  {errors.description}
                </p>
              )}
            </label>
            <textarea
              ref={refs.description}
              name="description"
              onChange={handleFormChange}
              value={form.description}
              placeholder="Masukkan deskripsi acara"
              className={cn(
                "w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#0038BD] font-roboto text-[#7C7C7C]",
                shakeField === "description" && "animate-shake"
              )}
              rows={3}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <label className="block font-semibold text-[#122B59] mb-2 text-[16px] md:text-[18px]">
              Tanggal dan Waktu *{" "}
              {errors.eventDateTime && form.eventDateTime == "" && (
                <p className="text-red-500 font-normal text-lg">
                  {errors.eventDateTime}
                </p>
              )}
            </label>
            <input
              ref={refs.eventDateTime}
              name="eventDateTime"
              onChange={handleFormChange}
              type="datetime-local"
              className={cn(
                "w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#0038BD] font-roboto text-[#7C7C7C]",
                shakeField === "eventDateTime" && "animate-shake"
              )}
            />
          </div>

          {/* UNGGAH SYARAT & KETENTUAN */}
          <div className="bg-white h-full rounded-2xl shadow-md p-5">
            <label className="block font-semibold text-[#122B59] mb-2 text-[16px] md:text-[18px]">
              Unggah Syarat & Ketentuan *
            </label>
            <div
              className="border-2 border-dashed border-blue-300 rounded-xl p-6 flex flex-col items-center justify-center text-[#7C7C7C]"
              onClick={handleTermsClick}
            >
              {termsFile ? (
                <div className="flex flex-col justify-center gap-4 items-center">
                  <span className="font-semibold">{termsFile.name}</span>
                  {form.termsUrl ? (
                    <div className="bg-[#0038BD]/70 text-white px-10 py-2 rounded-lg flex items-center gap-1 text-sm w-fit font-semibold">
                      Uploaded
                    </div>
                  ) : (
                    <button
                      onClick={uploadTerms}
                      className="bg-[#0038BD] hover:bg-blue-700 text-white px-10 py-2 rounded-lg flex items-center gap-1 text-sm w-fit font-semibold"
                    >
                      {termsUploading ? "Uploading..." : "Upload"}
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  <input
                    ref={termsRef}
                    accept=".pdf"
                    type="file"
                    className="hidden"
                    onChange={handleTermsChange}
                  />
                  <label htmlFor="terms-input" className="cursor-pointer">
                    <div className="flex flex-col items-center text-[#7C7C7C]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8 mb-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 16.5v-9m0 0-3.75 3.75M12 7.5l3.75 3.75"
                        />
                      </svg>
                      masukkan file PDF/DOC di sini atau klik{" "}
                      <span className="text-[#0038BD] font-semibold">
                        browse
                      </span>
                    </div>
                  </label>
                  <p className="text-xs mt-2 text-[#7C7C7C]">
                    Ukuran file maksimal: 10MB
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col text-[#122B59]">
          <label className="block font-semibold mb-3 text-[16px] md:text-[18px]">
            Poster Acara{" "}
          </label>

          <div className="border-2 border-dashed border-blue-300 rounded-xl h-[700px] flex flex-col items-center justify-center bg-gray-50 overflow-hidden">
            {posterFile ? (
              <div className="flex flex-col justify-center gap-4 items-center text-[#7C7C7C]">
                <span className="font-semibold">{posterFile.name}</span>
                {form.imageUrl ? (
                  <div className="bg-[#0038BD]/70 text-white px-10 py-2 rounded-lg flex items-center gap-1 text-sm w-fit font-semibold">
                    Uploaded
                  </div>
                ) : (
                  <button
                    onClick={uploadImage}
                    className="bg-[#0038BD] hover:bg-blue-700 text-white px-10 py-2 rounded-lg flex items-center gap-1 text-sm w-fit font-semibold"
                  >
                    {posterUploading ? "Uploading..." : "Upload"}
                  </button>
                )}
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePosterChange}
                  id="poster-upload"
                  className="hidden"
                />
                <label
                  htmlFor="poster-upload"
                  className="flex flex-col items-center justify-center cursor-pointer text-[#7C7C7C]"
                >
                  <div className="bg-yellow-400 rounded-full p-4 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="white"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5v-9m0 0-3.75 3.75M12 7.5l3.75 3.75"
                      />
                    </svg>
                  </div>
                  <p className="font-semibold">Klik untuk upload poster</p>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ROYALTI */}
      <div className="bg-white rounded-2xl text-[#122B59] shadow-md p-5">
        <label className="block font-semibold mb-2 text-[16px] md:text-[18px]">
          Royalti *{" "}
          {errors.royaltyFee && form.royaltyFee == "" && (
            <p className="text-red-500 font-normal text-lg">
              {errors.royaltyFee}
            </p>
          )}
        </label>
        <input
          name="royaltyFee"
          type="number"
          onChange={handleFormChange}
          placeholder="Royalti untuk penjualan kedua (Max: 10%)"
          value={form.royaltyFee}
          className={cn(
            "w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#0038BD] font-roboto text-[#7C7C7C]",
            shakeField === "royaltyFee" && "animate-shake"
          )}
        />
      </div>

      {/* PENGATURAN TEMPAT DUDUK */}
      <div className="bg-white rounded-2xl shadow-md p-6 text-[#122B59]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-[18px] md:text-[28px]">
            Pengaturan tempat duduk{" "}
          </h2>
          <button
            onClick={addZone}
            className="bg-[#0038BD] hover:bg-blue-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm font-semibold"
          >
            <Plus size={16} /> Tambah
          </button>
        </div>

        {zones.map((zone, index) => (
          <div
            key={index}
            className="relative bg-gray-50 rounded-xl p-5 mb-4 border shadow-sm transition-all duration-200"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-[16px] md:text-[18px]">
                Tipe Bangku {index + 1}
              </h3>
              {zones.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeZones(index)}
                  className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 font-semibold"
                >
                  <X size={16} />
                  Remove
                </button>
              )}
            </div>

            <div className="flex flex-col gap-4 items-center w-full text-[#7C7C7C]">
              <input
                placeholder="Nama bangku (e.g., VIP)"
                onChange={(e) =>
                  handleZoneChange(index, "name", e.target.value)
                }
                required
                value={zone.name}
                className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#0038BD] w-full"
              />

              <div className="grid grid-cols-3 gap-4 w-full">
                <input
                  placeholder="Jumlah"
                  onChange={(e) =>
                    handleZoneChange(index, "maxSupply", e.target.value)
                  }
                  required
                  value={zone.maxSupply}
                  className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#0038BD] w-full"
                />

                <input
                  placeholder="Harga dalam ETH"
                  onChange={(e) =>
                    handleZoneChange(index, "price", e.target.value)
                  }
                  type="number"
                  required
                  value={zone.price}
                  className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#0038BD] w-full"
                />

                <div className="p-3 bg-gray-200 rounded-xl w-full">
                  <span className="font-semibold">Konversi IDR:</span>{" "}
                  {zone.loadingConversion
                    ? "Sedang dikonversi..."
                    : zone.idrPrice}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAYOUTS */}
      <div className="bg-white rounded-2xl shadow-md p-6 text-[#122B59]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-[18px] md:text-[28px]">
            Pengaturan Payouts
          </h2>
          <button
            onClick={addPayout}
            className="bg-[#0038BD] hover:bg-blue-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm font-semibold"
          >
            <Plus size={16} /> Tambah
          </button>
        </div>

        {payouts.map((payout, index) => (
          <div
            key={index}
            className="relative bg-gray-50 rounded-xl p-5 mb-4 border shadow-sm transition-all duration-200"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-[16px] md:text-[18px]">
                Payout {index + 1}
              </h3>
              {payouts.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePayout(index)}
                  className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 font-semibold"
                >
                  <X size={16} />
                  Remove
                </button>
              )}
            </div>

            <div className="flex flex-row text-[#122B59] gap-4 items-center w-full">
              <input
                placeholder="Wallet address"
                onChange={(e) =>
                  handlePayoutChange(index, "wallet", e.target.value)
                }
                required
                value={payout.wallet}
                className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#0038BD] w-full text-[#7C7C7C]"
              />
              <input
                placeholder="Share (%)"
                onChange={(e) =>
                  handlePayoutChange(index, "share", e.target.value)
                }
                required
                value={payout.share}
                className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#0038BD] w-[30%] text-[#7C7C7C]"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 shadow-md"
        >
          Buat Acara
        </button>
      </div>
    </div>
  );
}
