import SearchConcerts from './components/search';

interface Concert {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export default async function TicketPage() {
  const concerts: Concert[] = Array.from({ length: 8 }).map((_, index) => ({
    id: index + 1,
    title: `Konser ${index + 1}`,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
    imageUrl: '/images/concert-placeholder.jpg',
  }));

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat flex justify-center"
      style={{
        backgroundImage: "url('/background/bg-landingpage.png')",
      }}
    >
      <div className="w-full max-w-[1440px] px-[50px] py-[100px]">
        <SearchConcerts concerts={concerts} />
      </div>
    </main>
  );
}
