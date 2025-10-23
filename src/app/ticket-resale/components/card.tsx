'use client';

import React from 'react';
import Image from 'next/image';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-col items-start transition-all hover:scale-[1.02] mb-12"
      style={{ width: '313px' }}
    >
      <div className="rounded-[70px] overflow-hidden shadow-md hover:shadow-xl transition-all">
        <Image
          src="/images/concert1.jpg"
          alt="Konser Musik"
          width={313}
          height={450} 
          className="object-cover"
        />
      </div>

      <div className="mt-4 text-left px-1">
        <h3 className="font-nexa text-[#0038BD] text-[18px] md:text-[20px] font-semibold mb-1">
          {title}
        </h3>
        <p className="font-roboto text-[#122B59] text-[14px] md:text-[16px] leading-snug line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
