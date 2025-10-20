import SuccessMessage from "./components/success-message";
import ActionButtons from "./components/action-buttons";

export default function ResellDonePage(props: PageProps<"/ticket-done">) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#E6EBF6] to-[#D7DBE8] flex justify-center">
      <div className="w-full max-w-[1440px] px-[50px] py-[100px] flex items-center justify-center">
        <div className="w-full max-w-[600px] text-center space-y-8">
          <SuccessMessage />
          <ActionButtons />
        </div>
      </div>
    </main>
  );
}
