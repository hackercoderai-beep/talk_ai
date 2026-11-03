import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { HOME_PAGE_PATH } from "@/constants";
import { auth } from "@/lib/auth";

export async function unauthenticated() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect(HOME_PAGE_PATH);
  }

  return session;
}
