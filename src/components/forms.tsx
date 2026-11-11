"use client";
import { useActionState } from "react";
import Link from "next/link";
import { authAction, saveProfile } from "@/app/actions";
export function AuthForm({ mode }: { mode: string }) {
  const [state, action, pending] = useActionState(authAction.bind(null, mode), {
    message: "",
  });
  return (
    <form action={action}>
      {mode !== "update" && (
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
      )}
      {mode !== "recover" && (
        <label>
          Password
          <input
            aria-label="Password"
            aria-describedby="password-help"
            name="password"
            type="password"
            autoComplete={
              mode === "signin" ? "current-password" : "new-password"
            }
            required
            minLength={8}
            maxLength={128}
          />
          <small id="password-help">At least 8 characters.</small>
        </label>
      )}
      <button className="button" disabled={pending}>
        {pending
          ? "Please wait…"
          : mode === "signin"
            ? "Sign in"
            : mode === "signup"
              ? "Create your account"
              : mode === "update"
                ? "Save new password"
                : "Send recovery email"}
      </button>
      <p role="status" className="form-status">
        {state.message}
      </p>
      {mode === "signin" && (
        <Link href="/forgot-password">Forgot your password?</Link>
      )}
    </form>
  );
}
export function ProfileForm({
  profile,
}: {
  profile?: { username: string; pen_name: string; bio: string | null };
}) {
  const [state, action, pending] = useActionState(saveProfile, { message: "" });
  return (
    <form action={action}>
      <label>
        Handle
        <input
          name="username"
          defaultValue={profile?.username}
          required
          minLength={3}
          maxLength={24}
          pattern="[a-z][a-z0-9_]*"
        />
        <small>
          3–24 lowercase letters, numbers or underscores. This becomes your
          public URL.
        </small>
      </label>
      <label>
        Pen name
        <input
          name="pen_name"
          defaultValue={profile?.pen_name}
          required
          maxLength={80}
        />
      </label>
      <label>
        Biography
        <textarea
          name="bio"
          defaultValue={profile?.bio || ""}
          maxLength={500}
          rows={5}
        />
        <small>Up to 500 characters. Your profile is public.</small>
      </label>
      <button className="button" disabled={pending}>
        {pending ? "Saving…" : "Save profile"}
      </button>
      <p role="status">{state.message}</p>
    </form>
  );
}
