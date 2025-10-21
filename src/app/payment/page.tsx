'use client';

import CountdownTimer from './components/countdown-timer';
import PaymentCard from './components/payment-card';
import EventInfo from './components/event-info';
import StepIndicator from './components/step-indicator';

export default function PaymentPage(props: PageProps<"/payment">) {
  return (
    <div className="relative min-h-screen grid grid-cols-12 gap-[96px] px-[50px] py-[100px]">
      <StepIndicator currentStep={2} totalSteps={2} />

      <div className="col-span-12 lg:col-span-8 flex flex-col space-y-6 mt-[226px]">
        <CountdownTimer />
        <div className="bg-[#1E2B59] w-[702px] h-[397px] rounded-lg shadow-lg" />
        <EventInfo />
      </div>

      <div className="col-span-12 lg:col-span-4 flex justify-end">
        <PaymentCard />
      </div>
    </div>
  );
}
