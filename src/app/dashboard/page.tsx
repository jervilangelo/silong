import { redirect } from "next/navigation";
import Link from "next/link";
import { supabase, getUser } from "@/lib/supabase";
export default async function Dashboard() {
  const user = await getUser();
  const db = await supabase();
  if (!db || !user) redirect("/signin");
  const result = await db
    .from("profiles")
    .select("pen_name,username")
    .eq("id", user!.id)
    .maybeSingle();
  return (
    <>
      <h1>
        {result.data
          ? `Welcome, ${result.data.pen_name}.`
          : "Your story begins here."}
      </h1>
      <p>Settle in. Your first step is making this space your own.</p>
      <Link className="button" href="/dashboard/profile">
        {result.data ? "Edit your profile" : "Set up your profile"} ?
      </Link>
      {result.data && (
        <p>
          <Link href={"/u/" + result.data.username}>
            View your public profile ?
          </Link>
        </p>
      )}
      <div className="empty-state">
        <h2>A place for your next chapter.</h2>
        <p>
          Publishing, drafts, and private journals are coming in future phases.
          Your profile is ready to make your own today.
        </p>
      </div>
    </>
  );
}
