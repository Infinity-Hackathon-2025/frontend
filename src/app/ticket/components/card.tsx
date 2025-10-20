'use client';

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
      className="cursor-pointer flex flex-col items-start transition-all hover:scale-[1.02] mb-[48px]"
      style={{ width: '313px' }}
    >
      <div className="rounded-[70px] overflow-hidden shadow-md hover:shadow-xl transition-all">
        <img
          src={imageUrl}
          alt={title}
          className="w-[313px] h-[385px] object-cover"
        />
      </div>

      <div className="mt-3 text-left px-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600 leading-snug line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
