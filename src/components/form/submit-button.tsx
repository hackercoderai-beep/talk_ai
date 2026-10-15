import type { ReactNode } from "react";
import { useFormContext } from "@/components/form/form-context";
import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  children: ReactNode;
  className?: string;
  submittingChildren?: ReactNode;
};

export function SubmitButton({
  children,
  className,
  submittingChildren,
}: SubmitButtonProps) {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting] as const}
    >
      {([canSubmit, isSubmitting]) => (
        <Button
          aria-disabled={!canSubmit || isSubmitting}
          className={className}
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? (submittingChildren ?? children) : children}
        </Button>
      )}
    </form.Subscribe>
  );
}
