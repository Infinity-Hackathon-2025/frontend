export default function HelpCenter() {
    return (
      <section className="mx-auto max-w-6xl px-4">
        <h3 className="font-[Mont] text-3xl text-[#0038BD] font-semibold mb-4">Help Center</h3>
  
        <div className="relative">
          <input
            type="text"
            placeholder="Ketik topik yang Anda ingin cari (misal: Refund)"
            className="w-full rounded-full border border-white/60 bg-white/60 backdrop-blur px-5 py-2 text-sm text-black shadow focus:outline-none"
          />
          <button className="absolute right-0 top-1/2 -translate-y-1/2">
            <img src="/images/search.png" alt="Search" className="w-13 h-13" />
          </button>
        </div>
      </section>
    );
  }
  