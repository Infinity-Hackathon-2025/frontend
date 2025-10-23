import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 mt-[200px] mb-[100px] grid gap-[16px] md:grid-cols-12">
      <div className="col-span-12 md:col-span-6 bg-white/40 backdrop-blur-xl rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-white/40">
        <h1 className="font-[Mont-Bold] text-4xl md:text-5xl text-[#1F2B6C] mt-[33px]">
          TRUSTIX.
        </h1>
        <p className="mt-4 text-2xl md:text-3xl text-[#171717] font-[Nexa] leading-relaxed">
          Transparent Access to <br /> Unforgettable Moments. <br />
        </p>
        <Link
          className=" mt-[54px] rounded-full bg-[#153E9C] text-white px-5 py-2 text-sm shadow hover:bg-[#2F54EB] transition"
          href={"/create-event"}
        >
          Create Event
        </Link>
      </div>

      <div className="col-span-12 md:col-span-6 flex justify-end items-center relative">
        <img
          src="/images/asset1.png"
          alt="Trustix illustration"
          className="w-full md:w-[900px] max-w-full drop-shadow-xl object-contain md:object-cover"
        />
      </div>
    </section>
  );
}
