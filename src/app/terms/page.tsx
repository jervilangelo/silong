import Link from "next/link";
export default function Page() {
  return (
    <main id="main" className="narrow">
      <h1>A thoughtful beginning.</h1>
      <p>
        Silong is in development. Publishing and other future features are not
        yet available. These are preliminary product terms, not final launch
        terms. Full terms, content licensing rules, and a support contact must
        be reviewed before public launch.
      </p>
      <Link href="/">Back to Silong ?</Link>
    </main>
  );
}
