"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Card from "./card";

interface Concert {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface ConcertCategory {
  id: number;
  title: string;
  imageUrl: string;
}

export default function Events({ concerts }: { concerts: Concert[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const categories: ConcertCategory[] = [
    { id: 1, title: "Musik", imageUrl: "/images/concert2.jpg" },
    { id: 2, title: "Workshop", imageUrl: "/images/concert2.jpg" },
    { id: 3, title: "Festival", imageUrl: "/images/concert2.jpg" },
    { id: 4, title: "Pameran", imageUrl: "/images/concert2.jpg" },
    { id: 5, title: "Olahraga", imageUrl: "/images/concert2.jpg" },
    { id: 6, title: "Teater", imageUrl: "/images/concert2.jpg" },
    { id: 7, title: "Komedi", imageUrl: "/images/concert2.jpg" },
    { id: 8, title: "Kuliner", imageUrl: "/images/concert2.jpg" },
    { id: 9, title: "Seminar", imageUrl: "/images/concert2.jpg" },
  ];

  const filteredConcerts = concerts.filter(
    (concert) =>
      concert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concert.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCardClick = (id: number) => router.push(`/concerts/${id}`);
  const handleCategoryClick = (title: string) => setSearchQuery(title);

  return (
    <section className="w-full">
      <h1 className="font-mont text-[28px] md:text-[40px] font-bold text-[#0038BD] text-center mb-[40px]">
        Resale Ticket
      </h1>

      <div className="col-span-12 flex justify-center mb-[60px]">
        <div className="relative w-full max-w-[800px]">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="font-roboto w-full h-[52px] rounded-full border border-gray-300 px-5 pr-12 text-[#122B59] text-[14px] md:text-[16px] focus:ring-2 focus:ring-[#0038BD] outline-none shadow-sm bg-white"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0038BD] cursor-pointer">
            🔍
          </span>
        </div>
      </div>
      <div className="col-span-12 mb-20 flex justify-center mt-10">
        <div
          className="overflow-x-auto"
          style={{
            width: "85%",
          }}
        >
          <div
            className="flex flex-nowrap gap-4 px-[50px] pb-4"
            style={{
              width: "max-content",
            }}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.title)}
                className="flex items-center justify-start shrink-0 
                     bg-white/30 backdrop-blur-md border border-white/40 
                     rounded-[20px] shadow-md hover:shadow-xl transition-all 
                     cursor-pointer hover:scale-[1.03]"
                style={{
                  width: "215.17px",
                  height: "110.44px",
                  padding: "10px 16px",
                }}
              >
                <div className="relative w-[72px] h-[72px] shrink-0 overflow-hidden rounded-2xl mr-4">
                  <Image
                    src={category.imageUrl}
                    alt={category.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <p className="font-nexa text-[16px] md:text-[18px] font-semibold text-[#122B59] whitespace-nowrap">
                  {category.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 justify-items-center w-full ">
        <p className="w-full text-center font-roboto text-lg">
          Sedang Dalam Perbaikan
        </p>
        {/* {filteredConcerts.length > 0 ? (
          filteredConcerts.map((concert) => (
            <div
              key={concert.id}
              className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 flex justify-center"
            >
              <Card
                title={concert.title}
                description={concert.description}
                imageUrl={concert.imageUrl}
                onClick={() => handleCardClick(concert.id)}
              />
            </div>
          ))
        ) : (
          <p className="col-span-12 font-roboto text-[#122B59] text-[14px] md:text-[18px] text-center mt-10 opacity-80">
            Tidak ada konser yang sesuai.
          </p>
        )} */}
      </div>
    </section>
  );
}
