"use client";

import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DashboardCommand } from "@/modules/dashboard/ui/components/dashboard-command";

export function DashboardNavbar() {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState<boolean>(false);
  const keyboardCommandKey = "k";
  const toggleCommand = useCallback(() => setCommandOpen((prev) => !prev), []);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === keyboardCommandKey && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        toggleCommand();
      }
    };

    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [toggleCommand]);

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="item-center flex gap-x-2 border-b bg-sidebar px-4 py-4">
        <Button onClick={toggleSidebar} size="icon-sm" variant="outline">
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>

        <ButtonGroup onClick={toggleCommand}>
          <InputGroup>
            <InputGroupInput placeholder="Apple Interview Simulation" />
            <Tooltip>
              <TooltipTrigger
                render={
                  <>
                    <InputGroupAddon align="inline-start">
                      <SearchIcon className="size-3.5" />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                      <Kbd
                        className={
                          "pointer-events-none inline-flex h-5 select-none items-center gap-1 bg-muted font-medium text-muted-foreground"
                        }
                      >
                        <span>&#8984;</span> {keyboardCommandKey.toUpperCase()}
                      </Kbd>
                    </InputGroupAddon>
                  </>
                }
              />
              <TooltipContent>Command Palette</TooltipContent>
            </Tooltip>
          </InputGroup>
        </ButtonGroup>
      </nav>
    </>
  );
}
