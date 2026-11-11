import { AuthForm } from "@/components/forms";
import { Brand } from "@/components/brand";
import Link from "next/link";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main id="main" className="auth-layout">
      <aside>
        <Brand large />
        <p>A quiet refuge for stories, poetry, and everything left unsaid.</p>
      </aside>
      <section>
        <h1>Welcome back.</h1>
        <p>Your quiet corner is waiting.</p>
        {error === "verification" && (
          <p role="alert">
            That verification or recovery link could not be confirmed. Please
            request a new link.
          </p>
        )}
        <AuthForm mode="signin" />
        <p>
          <Link href="/signup">New here? Create an account</Link>
        </p>
      </section>
    </main>
  );
}
