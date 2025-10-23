import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="mx-auto max-w-7xl px-4 mt-[200px] mb-[100px] grid gap-[16px] md:grid-cols-12"
    >
      <div className="flex flex-col gap-4 col-span-12 md:col-span-6 bg-white/40 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/40">
        <h1 className="font-[Mont-Bold] text-4xl md:text-5xl text-[#1F2B6C] mt-[33px]">
          TRUSTIX.
        </h1>
        <p className="mt-4 text-2xl md:text-3xl text-[#171717] font-[Nexa] leading-relaxed">
          Transparent Access to <br /> Unforgettable Moments. <br />
        </p>
        <Link
          className="mt-20 sm:mt-0 px-8 py-3 w-fit bg-[#153E9C] hover:bg-[#2F54EB] rounded-xl text-white font-nexa font-semibold text-lg shadow-md "
          href={"/all-events"}
        >
          Beli Tiket
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
