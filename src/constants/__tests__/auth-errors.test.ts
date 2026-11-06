import { describe, expect, test } from "bun:test";
import { getAuthErrorMessage } from "@/constants/auth-errors";

describe("getAuthErrorMessage", () => {
  test("maps a known sign-in error code to its contextual message", () => {
    expect(
      getAuthErrorMessage({ code: "ACCOUNT_NOT_FOUND" }, "sign-in")
    ).toBe(
      "Incorrect email or password. Double-check your credentials and try again."
    );
  });

  test("maps a known sign-up error code to its contextual message", () => {
    expect(
      getAuthErrorMessage({ code: "USER_ALREADY_EXISTS" }, "sign-up")
    ).toBe(
      "An account with this email already exists. Try signing in instead."
    );
  });

  test("a sign-up-only code does not match in the sign-in context", () => {
    const message = getAuthErrorMessage(
      { code: "USER_ALREADY_EXISTS", status: 400, message: "raw message" },
      "sign-in"
    );

    expect(message).toBe("raw message");
  });

  test("treats a missing status as a network failure", () => {
    expect(getAuthErrorMessage({}, "sign-in")).toBe(
      "We couldn't sign you in. Unable to reach the server — check your internet connection and try again."
    );
  });

  test("treats status 0 as a network failure", () => {
    expect(getAuthErrorMessage({ status: 0 }, "sign-up")).toBe(
      "We couldn't create your account. Unable to reach the server — check your internet connection and try again."
    );
  });

  test("returns a rate-limit message for status 429", () => {
    expect(getAuthErrorMessage({ status: 429 }, "sign-in")).toBe(
      "Too many attempts. Please wait a moment before trying again."
    );
  });

  test("returns a server-error message for 5xx statuses", () => {
    expect(getAuthErrorMessage({ status: 503 }, "sign-up")).toBe(
      "We couldn't create your account. Something went wrong on our end — please try again later."
    );
  });

  test("falls back to the server-provided message for other statuses", () => {
    expect(
      getAuthErrorMessage(
        { status: 400, message: "Custom server message" },
        "sign-in"
      )
    ).toBe("Custom server message");
  });

  test("falls back to a generic message when nothing else matches", () => {
    expect(getAuthErrorMessage({ status: 400 }, "sign-up")).toBe(
      "We couldn't create your account. Please try again later."
    );
  });

  test("handles a null error", () => {
    expect(getAuthErrorMessage(null, "sign-in")).toBe(
      "We couldn't sign you in. Unable to reach the server — check your internet connection and try again."
    );
  });
});
