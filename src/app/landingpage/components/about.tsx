"use client";
import React from "react";

export default function AboutSection() {
  return (
<div className="pt-28 px-6 md:px-10 max-w-7xl mx-auto space-y-10">
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
            Lorem Ipsum Dolor Sit Tagline 2
          </h1>
          <p className="text-xl text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </section>
    </div>
  );
}
