import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen flex justify-center py-20">
      <ConnectButton />
    </div>
  );
}
