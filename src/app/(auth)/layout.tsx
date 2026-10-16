import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { unauthenticated } from "@/hooks/use-unauthenticated";

async function AuthLayoutContent({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await unauthenticated();

  if (session) {
    redirect("/sign-in");
  }

  return children;
}

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Suspense fallback={<Spinner />}>
        <AuthLayoutContent>{children}</AuthLayoutContent>
      </Suspense>
    </div>
  );
}
