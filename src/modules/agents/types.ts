import type { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

export type AgentType = inferRouterOutputs<AppRouter>["agents"]["getOne"];
