"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export default function DashboardView() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: "Ezzeldin" }));

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full px-6">
        <section className="space-y-6 py-16">
          <h1 className="text-muted-foreground">
            {data ? data.greeting : "Loading..."}
          </h1>
        </section>
      </div>
    </main>
  );
}
