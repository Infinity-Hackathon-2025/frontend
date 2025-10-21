"use client";
import React from "react";

export default function AboutSection() {
  return (
<div id="about" className="pt-0 px-6 md:px-10 max-w-7xl mx-auto space-y-10">
  <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    <div className="flex justify-center items-center">
      <img
        src="/images/asset2.png" 
        alt="About"
        className="w-full md:w-[800px] md:px-0.5 lg:w-[900px] xl:w-[1000px] max-w-none object-cover rounded-lg -ml-4" 
      />
    </div>

        <div className="space-y-6 text-right"> 
          <h1 className="text-4xl font-extrabold text-[#1A3DA7]">
            ABOUT US
          </h1>
          <p className="text-xl text-gray-700">
          <b>TRUSTIX</b> adalah platform tiket digital berbasis teknologi terdesentralisasi yang dirancang untuk menciptakan pengalaman pembelian tiket event yang aman, transparan, dan bebas calo. Kami percaya, setiap orang berhak mendapatkan akses ke acara favorit mereka tanpa khawatir akan tiket palsu atau sistem pembelian yang rumit.
          </p>
        </div>
      </section>
    </div>
  );
}
