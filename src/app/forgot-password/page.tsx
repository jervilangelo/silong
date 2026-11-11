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
        <h1>Find your way back.</h1>
        <p>We will send a secure password recovery link.</p>
        <AuthForm mode="recover" />
        <p>
          <Link href="/signin">Already have an account? Sign in</Link>
        </p>
      </section>
    </main>
  );
}
