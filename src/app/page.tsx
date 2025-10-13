import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen flex justify-center">
      <Link href={"/merch"} className="bg-blue-500">
        merch
      </Link>
    </div>
  );
}
