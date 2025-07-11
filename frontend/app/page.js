"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  }, [router]);

  return (
    <main className="h-[100vh] flex items-center justify-center">
      <p>Redirecting to homepage...</p>
    </main>
  );
}
