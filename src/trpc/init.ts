import { initTRPC } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";

export const createTRPCContext = cache(async () => ({ userId: "user_123" }));

const t = initTRPC.create({
  transformer: superjson,
});

const {
  router: createTRPCRouter,
  createCallerFactory,
  procedure: baseProcedure,
} = t;

export { baseProcedure, createCallerFactory, createTRPCRouter };
