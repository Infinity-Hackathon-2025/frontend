import React, { use } from "react";
import Section from "./components/section";

export default function page({
  params,
}: {
  params: Promise<{ eventAddress: string }>;
}) {
  const eventAddress = use(params);
  return (
    <div
      className="min-h-screen bg-gray-50 px-[60px] md:px-[80px] py-[100px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background/bg-desktop.png')" }}
    >
      <Section />
    </div>
  );
}
