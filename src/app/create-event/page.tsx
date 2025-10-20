"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Form from "./components/form";

export default function CreateEventPage(props: PageProps<"/create-event">) {
  const router = useRouter();

  useEffect(() => {
    const hasCreatedEvent = localStorage.getItem("hasCreatedEvent");
    if (hasCreatedEvent === "true") router.push("/my-events");
  }, [router]);

  return (
    <main className="pt-28 px-6 md:px-10 max-w-6xl mx-auto">
      <Form />
    </main>
  );
}
