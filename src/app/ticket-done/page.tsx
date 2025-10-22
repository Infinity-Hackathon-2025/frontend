import SuccessMessage from "./components/success-message";
import ActionButtons from "./components/action-buttons";

export default function TicketDonePage(props: PageProps<"/ticket-done">) {
  return (
    <main
      className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background/bg-desktop.png')" }}
    >
      <div className="w-full max-w-[1440px] px-[50px] py-[100px] flex items-center justify-center text-center space-y-10">
        <div className="w-full max-w-[600px] space-y-10">
          <SuccessMessage />
          <ActionButtons />
        </div>
      </div>
    </main>
  );
}
