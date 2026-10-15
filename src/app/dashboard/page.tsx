"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
  };

  if (isPending) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Spinner />
      </main>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-4xl px-6">
        <header className="flex h-16 items-center justify-between border-b">
          <span className="font-medium text-sm">Talk AI</span>
          <Button onClick={handleSignOut} size="sm" variant="ghost">
            Sign out
          </Button>
        </header>

        <section className="py-16">
          <h1 className="font-semibold text-3xl tracking-tight">
            Welcome, {session.user.name}
          </h1>
        </section>
      </div>
    </main>
  );
}
