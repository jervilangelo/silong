import Link from "next/link";
import { Brand } from "./brand";
import { MobileMenu } from "./mobile-menu";
import { getUser } from "@/lib/supabase";
export async function Header() {
  const user = await getUser();
  return (
    <header className="header">
      <Brand />
      <nav className="desktop-nav" aria-label="Main navigation">
        <Link href="/explore">Explore</Link>
        <Link href="/dashboard">Write</Link>
        <Link href="/about">Our story</Link>
      </nav>
      <div className="desktop-nav">
        {user ? (
          <Link className="button" href="/dashboard">
            Your writing room
          </Link>
        ) : (
          <>
            <Link href="/signin">Sign in</Link>
            <Link className="button" href="/signup">
              Get started <span aria-hidden>↗</span>
            </Link>
          </>
        )}
      </div>
      <MobileMenu />
    </header>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <p>
          A quiet refuge for stories,
          <br />
          and everything left unsaid.
        </p>
        <nav aria-label="Footer">
          {["About", "Community guidelines", "Privacy", "Terms"].map((x) => (
            <Link key={x} href={"/" + x.toLowerCase().replaceAll(" ", "-")}>
              {x}
            </Link>
          ))}
        </nav>
      </div>
      <Brand large />
      <div className="footer-bottom">
        <span>Made for words. Rooted in the Philippines.</span>
        <span>Silong · A place to pause</span>
      </div>
    </footer>
  );
}
