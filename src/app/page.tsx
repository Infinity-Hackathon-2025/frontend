import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen flex justify-center py-20">
      <ConnectButton />
    </div>
  );
}
