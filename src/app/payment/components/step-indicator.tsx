'use client';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="absolute top-[100px] right-[100px] flex gap-3">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const stepNumber = i + 1;
        const isActive = stepNumber === currentStep;

        return (
          <div
            key={i}
            className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold shadow-md ${
              isActive
                ? 'bg-[#1E2B59] text-white'
                : 'bg-[#E5E7EB] text-[#1E2B59]'
            }`}
          >
            {String(stepNumber).padStart(2, '0')}
          </div>
        );
      })}
    </div>
  );
}
