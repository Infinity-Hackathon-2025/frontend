'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Card from './components/card';

const TicketConcerts = (props: PageProps<"/ticket">) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const concerts = Array.from({ length: 8 }).map((_, index) => ({
    id: index + 1,
    title: `Konser ${index + 1}`,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
    imageUrl: '/images/concert-placeholder.jpg',
  }));

  const filteredConcerts = concerts.filter(
    (concert) =>
      concert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concert.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCardClick = () => {
    router.push('/concerts');
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center px-[60px] md:px-[80px] pt-[177px] pb-[90px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/background/bg-landingpage.png')",
      }}
    >
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search concerts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[1114px] h-[52px] rounded-[26px] border border-gray-300 px-5 text-gray-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm bg-white/90 backdrop-blur-sm"
        />
      </div>
      {filteredConcerts.length > 0 ? (
        <div className="max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[15px] justify-items-center">
          {filteredConcerts.map((concert) => (
            <Card
              key={concert.id}
              title={concert.title}
              description={concert.description}
              imageUrl={concert.imageUrl}
              onClick={handleCardClick} 
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-lg mt-10">Tidak ada konser yang cocok.</p>
      )}
    </div>
  );
};

export default TicketConcerts;
