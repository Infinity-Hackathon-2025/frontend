import Image from "next/image";
import PaymentCard from "./components/payment-card";
import EventInfo from "./components/event-info";
import StepIndicator from "./components/step-indicator";

export default function PaymentPage(props: PageProps<"/ticket-payment">) {
  return (
    <div className="relative min-h-screen px-[50px] py-[100px] bg-gradient-to-b from-[#F4F6FA] to-[#E5E9F2]">
      <StepIndicator currentStep={2} totalSteps={2} />
      <div className="grid grid-cols-12 gap-4 lg:gap-6 mt-[80px]">
        <div className="col-span-12 lg:col-span-8 flex flex-col items-start space-y-8">
          <div className="w-full relative rounded-xl shadow-md overflow-hidden aspect-[16/9]">
            <Image
              src="/images/concert-placeholder.jpg"
              alt="Event Placeholder"
              fill
              className="object-cover"
              priority
            />
          </div>

          <EventInfo />
        </div>

        <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end mt-10 lg:mt-0">
          <PaymentCard />
        </div>
      </div>
    </div>
  );
}
