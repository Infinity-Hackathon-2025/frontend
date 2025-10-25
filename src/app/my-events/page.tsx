import EventCard from "./components/event-card";
import FinancialReport from "./components/financial-report";
import RoyaltyReport from "./components/royalty-report";
import WeeklyTicketSales from "./components/weekly-ticketsales";
import QuickAction from "./components/quick-action";
import EventSummary from "./components/summary";

import Content from "./components/content";

const MyEvents = (props: PageProps<"/my-events">) => {
  return (
    <div
      className="min-h-screen bg-gray-100 px-6 md:px-12 lg:px-20 py-10 md:py-16 bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: "url('/background/bg-landingpage.png')",
      }}
    >
      <Content />
    </div>
  );
};

export default MyEvents;
