import EventCard from "./components/event-card";
import FinancialReport from "./components/financial-report";
import RoyaltyReport from "./components/royalty-report";
import WeeklyTicketSales from "./components/weekly-ticketsales";
import QuickAction from "./components/quick-action";
import EventSummary from "./components/event-summary";

const Home = (props: PageProps<"/event">) => {
  return (
    <div
      className="min-h-screen bg-gray-100 px-6 md:px-12 lg:px-20 py-10 md:py-16 bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: "url('/background/bg-landingpage.png')",
      }}
    >
      <div className="max-w-7xl mx-auto space-y-10">
        <EventSummary />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <EventCard
            title="Pasar Seni"
            ticketsSold={450}
            totalTickets={500}
            ticketAmount={4.5}
            merchSold={246}
            merchAmount={3.2}
            status="Berjalan"
            imageUrl="/images/event1.png"
          />
          <EventCard
            title="Gala Merah"
            ticketsSold={300}
            totalTickets={300}
            ticketAmount={3.0} 
            merchSold={86}
            merchAmount={2.1}
            status="Selesai"
            imageUrl="/images/event2.png"
          />
          <EventCard
            title="Konferensi Blockchain"
            ticketsSold={0}
            totalTickets={400}
            ticketAmount={0} 
            merchSold={0}
            merchAmount={0}
            status="Dibatalkan"
            imageUrl="/images/event3.png"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FinancialReport />
          </div>
          <div>
            <RoyaltyReport />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WeeklyTicketSales />
          </div>
          <div>
            <QuickAction />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
