"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";
import { useDashboardWelcome } from "@/modules/dashboard/ui/components/dashboard-welcome-context";

type Props = {
  initiallyOpen: boolean;
  userId: string;
  userName: string;
};

export function DashboardWelcomeDialog({
  initiallyOpen,
  userId,
  userName,
}: Props) {
  const { open, setOpen } = useDashboardWelcome();

  useEffect(() => {
    if (!initiallyOpen) {
      return;
    }

    const seenKey = `talk-ai:welcome-seen:${userId}`;

    try {
      if (window.localStorage.getItem(seenKey) === "1") {
        return;
      }
      window.localStorage.setItem(seenKey, "1");
    } catch (error) {
      toast.add({
        description:
          error instanceof Error
            ? error.message
            : "The welcome dialog could not be saved as seen.",
        title: "Welcome dialog storage unavailable",
        type: "error",
      });
    }

    setOpen(true);
  }, [initiallyOpen, setOpen, userId]);

  const handleGetStarted = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent
        className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2.5rem)] gap-4 overflow-y-auto p-4 sm:max-h-none sm:w-full sm:gap-5 sm:overflow-visible sm:p-8"
        showCloseButton={false}
      >
        <div className="overflow-hidden rounded-t-lg bg-muted">
          <Image
            alt="The Office celebrating with a party"
            className="aspect-2/1 w-full object-cover sm:aspect-video"
            height={270}
            src="/welcome-office-party-v1.gif"
            width={480}
          />
        </div>

        <DialogHeader className="text-center">
          <DialogTitle className="font-semibold text-xl sm:text-2xl">
            You made it, {userName}!
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Welcome to Talk AI. Your account is ready, and we’re excited to help
            you turn your ideas into great conversations.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="w-full" onClick={handleGetStarted} type="button">
            Let's get started
          </Button>
        </DialogFooter>
        <p className="-my-3 mt-1 text-center text-[10px] text-muted-foreground">
          Gif via{" "}
          <a
            className="underline underline-offset-2 hover:text-foreground"
            href="https://giphy.com/gifs/party-the-office-hard-l0MYt5jPR6QX5pnqM"
            rel="noreferrer"
            target="_blank"
          >
            GIPHY
          </a>
        </p>
      </DialogContent>
    </Dialog>
  );
}
