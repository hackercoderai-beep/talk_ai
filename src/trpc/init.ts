import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { cache } from "react";
import superjson from "superjson";
import { auth } from "@/lib/auth";

export const createTRPCContext = cache(async () => ({ userId: "user_123" }));

const t = initTRPC.create({
  transformer: superjson,
});

const {
  router: createTRPCRouter,
  createCallerFactory,
  procedure: baseProcedure,
} = t;

export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You're unauthorized to access this resource",
    });
  }

  return next({
    ctx: { ...ctx, auth: session },
  });
});

export { baseProcedure, createCallerFactory, createTRPCRouter };
