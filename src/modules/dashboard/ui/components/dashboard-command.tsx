import { SearchIcon, XIcon } from "lucide-react";
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useState,
} from "react";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "@/components/ui/command";
import { InputGroupButton } from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function DashboardCommand(props: Props) {
  const [search, setSearch] = useState("");
  const clearSearch = useCallback(() => setSearch(""), []);

  return (
    <CommandResponsiveDialog onOpenChange={props.setOpen} open={props.open}>
      <Command className="flex gap-3" label="Search conversations and agents">
        <div className="flex items-center gap-1">
          <CommandInput
            onValueChange={setSearch}
            placeholder="Search conversations and agents..."
            value={search}
          />
          <InputGroupButton
            aria-label="Clear search"
            onClick={clearSearch}
            size="icon-xs"
          >
            <XIcon />
          </InputGroupButton>
        </div>
        <CommandList>
          <CommandEmpty className="flex flex-col items-center gap-2 px-6 py-12">
            <SearchIcon className="size-5 text-muted-foreground/60" />
            <p className="text-muted-foreground text-sm">
              Try a name, topic, or phrase to get started
            </p>
          </CommandEmpty>
          {/* TODO: Populate with actual user created data*/}
          <CommandItem className="my-1 cursor-pointer">
            Placeholder Agent Entry
          </CommandItem>
        </CommandList>
        <div className="flex items-center justify-end border-t px-3 py-2">
          <span className="mr-2 text-muted-foreground text-xs">to close</span>
          <Kbd>Esc</Kbd>
        </div>
      </Command>
    </CommandResponsiveDialog>
  );
}
