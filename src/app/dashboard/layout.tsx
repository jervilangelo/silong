import { DashboardNav } from "@/components/dashboard-nav";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase";
import { Brand } from "@/components/brand";
import { signout } from "@/app/actions";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await getUser())) redirect("/signin");
  return (
    <main id="main" className="dashboard">
      <aside>
        <Brand />
        <p>Your writing room</p>
        <DashboardNav />
        <form action={signout}>
          <button>Sign out</button>
        </form>
      </aside>
      <section>{children}</section>
    </main>
  );
}
