// import { TRPCError } from "@trpc/server";
import { agents } from "@/db/schema";
import { db } from "@/lib/db";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const agentsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);

    await new Promise((resolve) => setTimeout(resolve, 250));
    // throw new TRPCError({ code: "BAD_REQUEST" });

    return data;
  }),
});
