import Hero from "./components/hero";
import About from "./components/about";
import ConcertHighlight from "./components/concert-highlight";
import TrendingConcerts from "./components/trending-concerts";
import BestsellingMerch from "./components/bestselling-merch";
import Resells from "./components/resells";
import HelpCenter from "./components/help-center";
import FAQ from "./components/faq";

export default function HomePage() {
  return (
    <div className="space-y-24 pb-20">
      <Hero />
      <About />
      <ConcertHighlight />
      <TrendingConcerts />
      <BestsellingMerch />
      <Resells />
      <HelpCenter />
      <FAQ />
    </div>
  );
}
