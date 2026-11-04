import { describe, expect, test } from "bun:test";
import { formSchema } from "@/constants/schemas/form/sign-up";

const base = {
  name: "Tim Cook",
  email: "tim.cook@apple.com",
  password: "supersecret",
  confirmPassword: "supersecret",
};

describe("sign-up formSchema", () => {
  test("accepts matching passwords and a valid name/email", () => {
    expect(formSchema.safeParse(base).success).toBe(true);
  });

  test("rejects a name shorter than 2 characters", () => {
    const result = formSchema.safeParse({ ...base, name: "T" });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(["name"]);
    }
  });

  test("rejects mismatched passwords", () => {
    const result = formSchema.safeParse({
      ...base,
      confirmPassword: "somethingElse",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(["confirmPassword"]);
      expect(result.error.issues[0]?.message).toBe("Passwords do not match");
    }
  });

  test("rejects an invalid email", () => {
    const result = formSchema.safeParse({ ...base, email: "not-an-email" });

    expect(result.success).toBe(false);
  });
});
