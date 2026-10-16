import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { account, session, user, verification } from "@/db/schema";
import { db } from "@/lib/db";

function getRequiredSocialProviderCredentials(
  provider: string,
  clientIdName: string,
  clientId: string | undefined,
  clientSecretName: string,
  clientSecret: string | undefined
) {
  if (!(clientId && clientSecret)) {
    const missingCredentials = [
      !clientId && clientIdName,
      !clientSecret && clientSecretName,
    ].filter(Boolean);
    throw new Error(
      `Missing required ${provider} OAuth credentials: ${missingCredentials.join(", ")}`
    );
  }

  return { clientId, clientSecret };
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { account, session, user, verification },
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()], // make sure this is the last plugin in the array
  socialProviders: {
    github: {
      ...getRequiredSocialProviderCredentials(
        "GitHub",
        "GITHUB_CLIENT_ID",
        process.env.GITHUB_CLIENT_ID,
        "GITHUB_CLIENT_SECRET",
        process.env.GITHUB_CLIENT_SECRET
      ),
    },
    google: {
      ...getRequiredSocialProviderCredentials(
        "Google",
        "GOOGLE_CLIENT_ID",
        process.env.GOOGLE_CLIENT_ID,
        "GOOGLE_CLIENT_SECRET",
        process.env.GOOGLE_CLIENT_SECRET
      ),
    },
  },
});
