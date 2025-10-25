import Events from "./components/events";

interface Concert {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export default async function ResellTiketPage() {
  const concerts: Concert[] = Array.from({ length: 8 }).map((_, index) => ({
    id: index + 1,
    title: `Event ${index + 1}`,
    description:
      "Rasakan keseruan konser yang penuh dengan kejutan dan penampilan spesial.",
    imageUrl: "/images/concert-placeholder.jpg",
  }));

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat flex justify-center"
      style={{
        backgroundImage: "url('/background/bg-desktop.png')",
      }}
    >
      <div className="w-full max-w-[1440px] px-5 md:px-[50px] py-[60px] md:py-[100px]">
        <Events concerts={concerts} />
      </div>
    </main>
  );
}
