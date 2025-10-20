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
    <div className="bg-[#D6E4F0] rounded-[15px] p-5 shadow-sm mb-4">
      <h3 className="font-bold text-lg text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-gray-900">
          {price.toFixed(3)} ETH
        </span>
        <div className="flex items-center">
          <label className="mr-2 text-gray-700">Qty</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 0)}
            min={0}
            className="w-16 p-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default TicketOption;
