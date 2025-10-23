import EventCard from "./components/event-card";
import FinancialReport from "./components/financial-report";
import RoyaltyReport from "./components/royalty-report";
import WeeklyTicketSales from "./components/weekly-ticketsales";
import QuickAction from "./components/quick-action";
import EventSummary from "./components/summary";

import Events from "./components/events";

const MyEvents = (props: PageProps<"/my-events">) => {
  return (
    <div
      className="min-h-screen bg-gray-100 px-6 md:px-12 lg:px-20 py-10 md:py-16 bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: "url('/background/bg-landingpage.png')",
      }}
    >
      <div className="max-w-7xl mx-auto space-y-10">
        <EventSummary />

        <Events />

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

export default MyEvents;
