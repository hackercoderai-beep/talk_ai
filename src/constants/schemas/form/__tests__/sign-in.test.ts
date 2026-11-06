import { describe, expect, test } from "bun:test";
import { formSchema } from "@/constants/schemas/form/sign-in";

describe("sign-in formSchema", () => {
  test("accepts a valid email and an 8+ character password", () => {
    const result = formSchema.safeParse({
      email: "tim.cook@apple.com",
      password: "supersecret",
    });

    expect(result.success).toBe(true);
  });

  test("rejects an invalid email", () => {
    const result = formSchema.safeParse({
      email: "not-an-email",
      password: "supersecret",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(["email"]);
    }
  });

  test("rejects a password shorter than 8 characters", () => {
    const result = formSchema.safeParse({
      email: "tim.cook@apple.com",
      password: "short1",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(["password"]);
    }
  });
});
