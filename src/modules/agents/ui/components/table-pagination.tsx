import { useCallback } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function DataPagination(props: Props) {
  const handlePrevious = useCallback(
    () => props.onPageChange(Math.max(1, props.page - 1)),
    [props.onPageChange, props.page],
  );
  const handleNext = useCallback(
    () => props.onPageChange(Math.min(props.totalPages, props.page + 1)),
    [props.onPageChange, props.page, props.totalPages],
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 text-muted-foreground text-sm">
        Page {props.page} of {props.totalPages || 1}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          disabled={props.page === 1}
          onClick={handlePrevious}
          size={"sm"}
          variant={"outline"}
        >
          Previous
        </Button>
        <Button
          disabled={props.page === props.totalPages || props.totalPages === 0}
          onClick={handleNext}
          size={"sm"}
          variant={"outline"}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
