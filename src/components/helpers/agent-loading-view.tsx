import { Spinner } from "@/components/ui/spinner";

export function AgentLoadingView() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-1 items-center justify-center px-8 py-4">
        <div className="flex flex-col items-center justify-center gap-y-6 rounded-lg bg-background p-10 shadow-sm">
          <Spinner className="text-primary" />
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="font-medium text-lg">
              Please wait while we load the agent information.
            </h6>
            <p className="text-sm">Loading Agents</p>
          </div>
        </div>
      </div>
    </main>
  );
}
