import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Brand } from "@/components/brand";
export default async function Profile({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const db = await supabase();
  if (!db) notFound();
  const { data, error } = await db
    .from("profiles")
    .select("username,pen_name,bio,created_at")
    .eq("username", handle)
    .maybeSingle();
  if (error) throw new Error("Unable to load profile");
  if (!data) notFound();
  return (
    <main id="main" className="public-profile">
      <Brand />
      <div className="profile-initial" aria-hidden="true">
        {data.pen_name.slice(0, 1)}
      </div>
      <h1>{data.pen_name}</h1>
      <p>@{data.username}</p>
      <p className="biography">
        {data.bio || "A writer finding a little shelter in words."}
      </p>
      <section className="empty-state">
        <h2>Words will find their way here.</h2>
        <p>Public writing is coming in a future chapter of Silong.</p>
      </section>
    </main>
  );
}
