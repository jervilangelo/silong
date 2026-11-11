import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/forms";
import { supabase, getUser } from "@/lib/supabase";
export default async function Profile() {
  const db = await supabase();
  const user = await getUser();
  if (!db || !user) redirect("/signin");
  const { data, error } = await db
    .from("profiles")
    .select("username,pen_name,bio")
    .eq("id", user!.id)
    .maybeSingle();
  if (error) throw new Error("Unable to load profile");
  return (
    <>
      <h1>Your public profile</h1>
      <p>
        Choose the name your words will live under. Avatars are reserved for a
        later storage integration.
      </p>
      <ProfileForm profile={data || undefined} />
    </>
  );
}
