import SuccessMessage from './components/success-message';
import ActionButtons from './components/action-buttons';

export default function DonePage(props: PageProps<"/done">) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E6EBF6] to-[#D7DBE8] flex flex-col items-center justify-center text-center px-6">
      <div className="space-y-6">
        <SuccessMessage />
        <ActionButtons />
      </div>
    </div>
  );
}
