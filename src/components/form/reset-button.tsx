import type { ReactNode } from "react";
import { useFormContext } from "@/components/form/form-context";
import { Button } from "@/components/ui/button";

type ResetButtonProps = {
  children: ReactNode;
  className?: string;
};

export function ResetButton({ children, className }: ResetButtonProps) {
  const form = useFormContext();

  return (
    <Button
      className={className}
      onClick={() => form.reset()}
      type="button"
      variant="outline"
    >
      {children}
    </Button>
  );
}
