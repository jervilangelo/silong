import { AuthForm } from "@/components/forms";
import { Brand } from "@/components/brand";
import Link from "next/link";
export default function Page() {
  return (
    <main id="main" className="auth-layout">
      <aside>
        <Brand large />
        <p>A quiet refuge for stories, poetry, and everything left unsaid.</p>
      </aside>
      <section>
        <h1>Make room for your words.</h1>
        <p>Create an account. Find your voice at your own pace.</p>
        <AuthForm mode="signup" />
        <p>
          <Link href="/signin">Already have an account? Sign in</Link>
        </p>
      </section>
    </main>
  );
}
