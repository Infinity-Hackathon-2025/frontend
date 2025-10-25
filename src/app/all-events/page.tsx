import Events from "./components/events";

interface Concert {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export default async function page() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat flex justify-center"
      style={{
        backgroundImage: "url('/background/bg-desktop.png')",
      }}
    >
      <div className="w-full max-w-[1440px] px-5 md:px-[50px] py-[60px] md:py-[100px]">
        <Events />
      </div>
    </main>
  );
}
