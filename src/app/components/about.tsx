"use client";
import React from "react";

export default function AboutSection() {
  return (
    <div
      id="about"
      className="pt-28 px-6 md:px-10 max-w-7xl mx-auto space-y-10"
    >
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex justify-center items-center">
          <img
            src="/images/asset2.png"
            alt="About"
            className="w-full md:w-[2000px] max-w-full object-cover rounded-lg"
          />
        </div>

        <div className="space-y-6 text-right">
          <h1 className="text-4xl font-extrabold text-[#1A3DA7]">
            What is Trustix?
          </h1>
          <p className="text-xl text-gray-700">
            Trustix merupakan platform pengelolaan multi-event dan manajemen
            aset digital terdesentralisasi untuk industri kreatif, termasuk
            event, musik, seni, hingga merchandise. Dengan menciptakan ekosistem
            tertutup, tiket yang dijual di Trustix tidak bisa ditransaksikan di
            platform lain, tapi metadata didalamnya masih bersifat transparan.
          </p>
        </div>
      </section>
    </div>
  );
}
