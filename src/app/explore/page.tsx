import Link from "next/link";
export default function Page() {
  return (
    <main id="main" className="narrow">
      <h1>The reading room.</h1>
      <p>
        The shelves are still being built. The homepage contains original,
        clearly labeled editorial samples. Public publishing and discovery will
        arrive in a later phase.
      </p>
      <Link href="/">Back to Silong ?</Link>
    </main>
  );
}
