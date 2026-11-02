import { SearchIcon, XIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "@/components/ui/command";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function DashboardCommand(props: Props) {
  return (
    <CommandResponsiveDialog onOpenChange={props.setOpen} open={props.open}>
      <Command className="flex gap-3">
        <InputGroup>
          <InputGroupAddon align={"inline-start"}>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align={"inline-end"}>
            <XIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search conversations and agents..." />
        </InputGroup>
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
