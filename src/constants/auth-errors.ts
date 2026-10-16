export type AuthErrorContext = "sign-in" | "sign-up";

export type AuthErrorLike = {
  code?: string;
  message?: string;
  status?: number;
  statusText?: string;
};

const errorMessages: Record<AuthErrorContext, Record<string, string>> = {
  "sign-in": {
    ACCOUNT_NOT_FOUND:
      "Incorrect email or password. Double-check your credentials and try again.",
    EMAIL_NOT_VERIFIED:
      "Please verify your email address before signing in. Check your inbox for the verification link.",
    INVALID_EMAIL:
      "That email address doesn't look right. Please check it and try again.",
    INVALID_EMAIL_OR_PASSWORD:
      "Incorrect email or password. Double-check your credentials and try again.",
    USER_NOT_FOUND:
      "Incorrect email or password. Double-check your credentials and try again.",
  },
  "sign-up": {
    FAILED_TO_CREATE_USER:
      "We couldn't create your account right now. Please try again in a moment.",
    INVALID_EMAIL:
      "That email address doesn't look right. Please check it and try again.",
    PASSWORD_TOO_LONG:
      "Your password is too long. Please choose a shorter one.",
    PASSWORD_TOO_SHORT:
      "Your password is too short. It must be at least 8 characters.",
    USER_ALREADY_EXISTS:
      "An account with this email already exists. Try signing in instead.",
  },
};

const fallbackActions: Record<AuthErrorContext, string> = {
  "sign-in": "We couldn't sign you in.",
  "sign-up": "We couldn't create your account.",
};

export function getAuthErrorMessage(
  error: AuthErrorLike | null | undefined,
  context: AuthErrorContext
): string {
  // Known Better Auth error codes get a contextual message
  if (error?.code && errorMessages[context][error.code]) {
    return errorMessages[context][error.code];
  }

  // Network / unreachable server (no HTTP response)
  if (!error?.status || error.status === 0) {
    return `${fallbackActions[context]} Unable to reach the server — check your internet connection and try again.`;
  }

  // Rate limiting
  if (error.status === 429) {
    return "Too many attempts. Please wait a moment before trying again.";
  }

  // Server-side failures
  if (error.status >= 500) {
    return `${fallbackActions[context]} Something went wrong on our end — please try again later.`;
  }

  // Fall back to the server-provided message if there is one
  if (error.message) {
    return error.message;
  }

  return `${fallbackActions[context]} Please try again later.`;
}
