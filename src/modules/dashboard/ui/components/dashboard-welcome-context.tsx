"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

type DashboardWelcomeContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DashboardWelcomeContext =
  createContext<DashboardWelcomeContextValue | null>(null);

export function DashboardWelcomeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <DashboardWelcomeContext.Provider value={{ open, setOpen }}>
      {children}
    </DashboardWelcomeContext.Provider>
  );
}

export function useDashboardWelcome() {
  const context = useContext(DashboardWelcomeContext);

  if (!context) {
    throw new Error(
      "useDashboardWelcome must be used within DashboardWelcomeProvider"
    );
  }

  return context;
}
