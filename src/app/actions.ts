"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { profileSchema } from "@/lib/validation";
export type FormState = { message: string; ok?: boolean };
const emailSchema = z.email().max(254);
function siteUrl() {
  return new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
    .origin;
}
export async function authAction(
  mode: string,
  _previous: FormState,
  form: FormData,
): Promise<FormState> {
  const email = emailSchema.safeParse(form.get("email"));
  const password = z
    .string()
    .min(8, "Use at least 8 characters.")
    .max(128)
    .safeParse(form.get("password"));
  if (mode !== "update" && !email.success)
    return { message: "Enter a valid email address." };
  if (mode !== "recover" && !password.success)
    return { message: "Use a password between 8 and 128 characters." };
  const db = await supabase();
  if (!db)
    return {
      message:
        "Account services are not configured yet. Please return once Silong opens registration.",
    };
  if (mode === "recover") {
    await db.auth.resetPasswordForEmail(email.data!, {
      redirectTo: `${siteUrl()}/auth/callback?next=/update-password`,
    });
    return {
      message: "If an account exists, a recovery email will arrive shortly.",
      ok: true,
    };
  }
  if (mode === "signup") {
    const { error } = await db.auth.signUp({
      email: email.data!,
      password: password.data!,
      options: { emailRedirectTo: `${siteUrl()}/auth/callback` },
    });
    return error
      ? { message: "Registration could not be completed. Try again later." }
      : {
          message: "Check your inbox to verify your email before signing in.",
          ok: true,
        };
  }
  if (mode === "update") {
    const {
      data: { user },
    } = await db.auth.getUser();
    if (!user)
      return { message: "Open the recovery link in your email first." };
    const { error } = await db.auth.updateUser({ password: password.data! });
    if (error)
      return {
        message:
          "Your password could not be updated. Request a new recovery email.",
      };
    redirect("/dashboard");
  }
  const { error } = await db.auth.signInWithPassword({
    email: email.data!,
    password: password.data!,
  });
  if (error)
    return {
      message: "Unable to sign in. Check your details and verify your email.",
    };
  redirect("/dashboard");
}
export async function signout() {
  const db = await supabase();
  await db?.auth.signOut();
  redirect("/");
}
export async function saveProfile(
  _previous: FormState,
  form: FormData,
): Promise<FormState> {
  const parsed = profileSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { message: parsed.error.issues[0].message };
  const db = await supabase();
  if (!db) return { message: "Profile services are not configured." };
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) redirect("/signin");
  const existing = await db
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();
  if (existing.error)
    return { message: "Your profile could not be loaded. Try again." };
  const { error } = existing.data
    ? await db.from("profiles").update(parsed.data).eq("id", user.id)
    : await db.from("profiles").insert({ id: user.id, ...parsed.data });
  if (error)
    return {
      message:
        error.code === "23505"
          ? "That handle is already taken."
          : "Your profile could not be saved. Please try again.",
    };
  revalidatePath("/dashboard");
  revalidatePath(`/u/${parsed.data.username}`);
  return { message: "Your profile has been saved.", ok: true };
}
