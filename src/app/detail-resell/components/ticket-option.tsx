'use client';

import { useState } from 'react';

interface TicketOptionProps {
  title: string;
  description: string;
  price: number;
  quantity?: number;
  onQuantityChange?: (quantity: number) => void;
}

const TicketOption: React.FC<TicketOptionProps> = ({
  title,
  description,
  price,
  quantity: initialQuantity = 0,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleQuantityChange = (newQuantity: number) => {
    const validQuantity = Math.max(0, newQuantity);
    setQuantity(validQuantity);
    onQuantityChange?.(validQuantity);
  };

  return (
    <div className="bg-white rounded-[15px] p-6 shadow-sm mb-5">
      <h3 className="font-mont text-[20px] lg:text-[22px] text-[#0038BD] font-semibold">
        {title}
      </h3>
      <p className="font-nexa text-[15px] text-[#122B59] mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="font-nexa text-[18px] font-semibold text-[#122B59]">
          {price.toFixed(3)} ETH
        </span>
        <div className="flex items-center">
          <label className="mr-2 text-[15px] font-roboto text-[#122B59]">Qty</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 0)}
            min={0}
            className="w-16 p-2 border border-[#0038BD] rounded-md text-center focus:ring-2 focus:ring-[#0038BD] outline-none text-[15px]"
          />
        </div>
      </div>
    </div>
  );
};

export default TicketOption;
