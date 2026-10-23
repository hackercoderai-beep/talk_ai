import { z } from "zod";

export const agentsInsertSchema = z.object({
  instructions: z.string().min(1, { message: "Instructions field required" }),
  name: z.string().min(1, { message: "Name field required" }),
});
