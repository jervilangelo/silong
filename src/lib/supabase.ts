import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { z } from "zod";
export function config() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url && !key) return null;
  return z
    .object({ url: z.url(), key: z.string().min(20) })
    .parse({ url, key });
}
export async function supabase() {
  const env = config();
  if (!env) return null;
  const jar = await cookies();
  return createServerClient(env.url, env.key, {
    cookies: {
      getAll: () => jar.getAll(),
      setAll(values) {
        try {
          values.forEach(({ name, value, options }) =>
            jar.set(name, value, options),
          );
        } catch {
          /* Server Components cannot write cookies; proxy refreshes them. */
        }
      },
    },
  });
}
export async function getUser() {
  const db = await supabase();
  if (!db) return null;
  const {
    data: { user },
  } = await db.auth.getUser();
  return user;
}
