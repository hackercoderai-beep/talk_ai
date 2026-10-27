import Image from "next/image";

export function EmptyAgentsList({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mt-42 flex flex-col items-center justify-center">
      <Image
        alt="Empty Agents List"
        height={240}
        src={"/empty.svg"}
        width={240}
      />
      <div className="mx-auto flex max-w-md flex-col gap-y-4 text-center">
        <h6 className="font-medium text-lg">{title}</h6>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}
