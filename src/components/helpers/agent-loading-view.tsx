import { Spinner } from "@/components/ui/spinner";

type Props = {
  title: string;
  description: string;
};

export function AgentLoadingView(props: Props) {
  return (
    <div className="flex flex-1 items-center justify-center px-8 py-4">
      <div className="flex flex-col items-center justify-center gap-y-6 rounded-lg bg-background p-10 shadow-sm">
        <Spinner className="text-primary" />
        <div className="flex flex-col gap-y-2 text-center">
          <h6 className="font-medium text-lg">{props.title}</h6>
          <p className="text-sm">{props.description}</p>
        </div>
      </div>
    </div>
  );
}
