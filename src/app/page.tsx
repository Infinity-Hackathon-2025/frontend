import Hero from "./components/hero";
import About from "./components/about";
import ConcertHighlight from "./components/concert-highlight";
import TrendingEvents from "./components/trending-events";
import BestsellingMerch from "./components/bestselling-merch";
import Resale from "./components/resale";
import HelpCenter from "./components/help-center";
import FAQ from "./components/faq";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="gap-24 pb-20 flex flex-col items-center justify-center">
      <Hero />
      <About />
      <Link
        className="sm:mt-0 px-8 py-3 w-fit bg-linear-to-r from-[#FFB444] to-[#FF9E42] hover:from-[#FF9E42] hover:to-[#E88400] rounded-xl text-white font-nexa font-semibold text-lg shadow-md "
        href={"/create-event"}
      >
        Buat Acara
      </Link>
      <div className="flex flex-col gap-20">
        <ConcertHighlight />
        <TrendingEvents />
        <BestsellingMerch />
        <Resale />
      </div>
      <HelpCenter />
      <FAQ />
    </div>
  );
}
