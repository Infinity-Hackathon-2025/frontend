import Image from "next/image";
import Section from "./components/section";

export default function TicketPage() {
  const location = "Jakarta Convention Center";
  const date = "20 Agustus 2025";

  return (
    <div className="min-h-screen bg-gray-50 px-[60px] md:px-[80px] py-[100px]">
      <div className="flex flex-col md:flex-row items-start gap-8 mb-10">
        <div className="w-[702px] h-[397px] bg-gray-200 rounded-[12px] overflow-hidden relative">
          <Image
            src="/images/concert-placeholder.jpg"
            alt="Concert placeholder"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex-1">
          <h2 className="text-4xl font-bold text-[#1E3A8A] mb-3">KONSER</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            Tiket konser seru dan penuh energi menunggu kamu!
          </p>
        </div>
      </div>

      <Section location={location} date={date} />
    </div>
  );
}
