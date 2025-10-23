export default function HelpCenter() {
  return (
    <section id="help" className="mx-auto max-w-6xl px-4">
      <h3 className="font-[Mont] text-2xl text-[#1F2B6C] font-semibold mb-4">
        Help Center
      </h3>

      <div className="relative">
        <input
          type="text"
          placeholder="Ketik topik yang Anda ingin cari (misal: Refund)"
          className="w-full rounded-full border border-white/60 bg-white/60 backdrop-blur px-5 py-2 text-sm shadow focus:outline-none"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1F2B6C]">
          🔍
        </button>
      </div>
    </section>
  );
}
