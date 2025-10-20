'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Card from './card';

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

export default function SearchConcerts({ concerts }: { concerts: Concert[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const categories: ConcertCategory[] = [
    { id: 1, title: 'K-POP', imageUrl: '/images/concert-placeholder.jpg' },
    { id: 2, title: 'POP', imageUrl: '/images/concert-placeholder.jpg' },
    { id: 3, title: 'JAZZ', imageUrl: '/images/concert-placeholder.jpg' },
    { id: 4, title: 'ROCK', imageUrl: '/images/concert-placeholder.jpg' },
    { id: 5, title: 'INDIE', imageUrl: '/images/concert-placeholder.jpg' },
    { id: 6, title: 'CLASSICAL', imageUrl: '/images/concert-placeholder.jpg' },
    { id: 7, title: 'HIP-HOP', imageUrl: '/images/concert-placeholder.jpg' },
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
      <h1 className="col-span-12 text-center text-[36px] font-bold text-[#15357A] mb-[40px]">
      Temukan Acara Favoritmu di Sini!
      </h1>

      <div className="col-span-12 flex justify-center mb-[60px]">
        <div className="relative w-full max-w-[800px]">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[52px] rounded-full border border-gray-300 px-5 pr-12 text-gray-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm bg-white"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 cursor-pointer">
            🔍
          </span>
        </div>
      </div>

      <div className="col-span-12 overflow-x-auto scrollbar-hide mb-[80px]">
        <div className="flex flex-nowrap gap-[16px] px-[50px]">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.title)}
              className="flex items-center justify-start flex-shrink-0 bg-white rounded-[20px] shadow-md hover:shadow-xl transition-all cursor-pointer hover:scale-[1.03]"
              style={{
                width: '215.17px',
                height: '110.44px',
                padding: '10px 16px',
              }}
            >
              <div className="w-[72px] h-[72px] flex-shrink-0 overflow-hidden rounded-[16px] mr-4">
                <Image
                  src={category.imageUrl}
                  alt={category.title}
                  width={72}
                  height={72}
                  className="object-cover"
                />
              </div>
              <p className="text-[18px] font-semibold text-[#15357A] whitespace-nowrap">
                {category.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[16px] justify-items-center">
        {filteredConcerts.length > 0 ? (
          filteredConcerts.map((concert) => (
            <div key={concert.id} className="col-span-3 flex justify-center">
              <Card
                title={concert.title}
                description={concert.description}
                imageUrl={concert.imageUrl}
                onClick={() => handleCardClick(concert.id)}
              />
            </div>
          ))
        ) : (
          <p className="col-span-12 text-gray-600 text-lg text-center mt-10">
            Tidak ada konser yang sesuai.
          </p>
        )}
      </div>
    </section>
  );
}
