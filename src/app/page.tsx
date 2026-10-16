"use client";

import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending) {
      if (session) {
        router.push("/dashboard");
      } else {
        router.push("/sign-in");
      }
    }
  }, [session, isPending, router]);

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-background">
      <Spinner />
    </main>
  );
}
