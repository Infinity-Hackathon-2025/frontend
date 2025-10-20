"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Resells = () => {
  const items = [
    {
      id: 1,
      title: "Enhypen: Fate in Jakarta",
      venue: "M Bloc Space, Jakarta",
      date: "14 Des 2025",
      time: "18.30 WIB",
      img: "/images/enha.jpg",
    },
    {
      id: 2,
      title: "CAS in Jakarta",
      venue: "Bandung Creative Park",
      date: "17 Jan 2025",
      time: "19.00 WIB",
      img: "/images/cas.jpg",
      soldOut: true,
    },
    {
      id: 3,
      title: "Bangkit! Orchestra",
      venue: "Gedung Sariwangi, Jakarta",
      date: "21 Jul 2025",
      time: "20.00 WIB",
      img: "/images/orche.jpg",
    },
    {
      id: 4,
      title: "Enhypen: Fate in Jakarta",
      venue: "Jakarta",
      date: "11 Feb 2025",
      time: "20.00 WIB",
      img: "/images/enha.jpg",
    },
  ];

  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleDotClick = (dotIndex: number) => {
    setIndex(dotIndex);
  };

  return (
    <section className="mx-auto w-full max-w-screen-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-[#0038BD]">Resells</h2>
        <button className="bg-[#1E3A8A] text-white px-4 py-2 rounded-full shadow-md hover:opacity-90 transition">
          Lihat lebih banyak
        </button>
      </div>

      <div className="relative flex items-center">
        <button
          onClick={handlePrev}
          className="absolute left-[-25px] bg-[#1E3A8A] text-white p-2 rounded-full shadow-md -ml-8"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex gap-8 overflow-hidden justify-center w-full">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${index * (100 / 3)}%)`,
              width: `${(items.length / 3) * 100}%`,
            }}
          >
            {items.map((item) => (
              <div key={item.id} className="w-1/3 flex-shrink-0 flex justify-center">
                <div className="bg-[#FFF6F6] rounded-[40px] p-4 shadow-lg w-[270px] flex flex-col items-start text-left relative">
                  {item.soldOut && (
                    <span className="absolute top-3 right-4 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      SOLD OUT
                    </span>
                  )}
                  <img
                    src={item.img}
                    alt={item.title}
                    className="rounded-[40px] w-full h-[280px] object-cover"
                  />
                  <h3 className="text-[#1E3A8A] text-lg font-bold mt-3">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.venue}</p>
                  <p className="text-[11px] text-gray-500">
                    {item.date} | {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-[-25px] bg-[#1E3A8A] text-white p-2 rounded-full shadow-md -mr-8"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* dots navigation */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <span
            key={i}
            onClick={() => handleDotClick(i)}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all ${
              i === index
                ? "h-4 w-4 bg-[#1E3A8A] backdrop-blur-lg shadow-xl"
                : "bg-gray-300 opacity-50"
            }`}
            style={{
              backdropFilter: "blur(10px)",
              backgroundColor:
                i === index
                  ? "rgba(30, 58, 138, 0.3)"
                  : "rgba(255, 255, 255, 0.2)",
              boxShadow:
                i === index
                  ? "0 4px 10px rgba(0, 0, 0, 0.2), 0 0 15px rgba(30, 58, 138, 0.6)"
                  : "none",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Resells;
