interface MerchCardProps {
  merch: {
    title: string;
    date: string;
    venue: string;
  };
}

export default function MerchCard({ merch }: MerchCardProps) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 text-center hover:scale-[1.02] transition-all cursor-pointer border border-gray-100">
      <div className="w-full h-[200px] bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
        <p className="text-gray-500 font-medium">Poster</p>
      </div>
      <h3 className="text-lg font-semibold text-[#1e2843]">{merch.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{merch.venue}</p>
      <p className="text-sm text-gray-600">{merch.date}</p>
    </div>
  );
}
