export default function FAQ() {
    const faqs = [
      "Bagaimana cara membeli tiket di Trustix?",
      "Bagaimana cara menyambungkan wallet?",
      "Apa yang terjadi jika event dibatalkan?",
      "Apakah tiket bisa dijual kembali atau ditransfer?",
      "Bagaimana proses refund?",
    ];
  
    return (
      <section className="mx-auto max-w-6xl px-4 mt-10">
        <div className="grid md:grid-cols-[2fr_1fr] gap-10">
          <div>
            <h3 className="font-[Nexa] text-2xl text-[#0038BD] font-semibold mb-4">FAQ’S</h3>
            <div className="space-y-2">
              {faqs.map((text, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 px-4 text-sm text-gray-500 hover:bg-[#E3F2FD] cursor-pointer border-b border-solid border-gray-500"
                >
                  {text}
                  <span className="text-[#0038BD] text-xl font-bold">›</span>
                </div>
              ))}
            </div>
  
            <a
              href="#"
              className="block mt-7 text-sm font-medium underline text-[#0038BD] hover:text-[#3F78FF]"
            >
              Lihat lainnya
            </a>
          </div>
  
          <div className="rounded-2xl bg-white/60 backdrop-blur-lg p-4 shadow border border-white/40 w-[400px] h-[220px]">
            <h4 className="font-[Nexa] text-[#1F2B6C] text-2xl font-semibold">Masih Bingung?</h4>
            <p className="text-sm text-[#171717]/70 mt-5 leading-relaxed">
              Butuh bantuan lebih lanjut? Ketik di bawah untuk hubungi customer service kami.
            </p>
            <button className="mt-10 rounded-full bg-[#153E9C] text-white text-sm px-4 py-2 shadow hover:bg-[#2F54EB] transition">
              Hubungi Kami
            </button>
          </div>
        </div>
      </section>
    );
  }
  