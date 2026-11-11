import Link from "next/link";
export default function Page() {
  return (
    <main id="main" className="narrow">
      <h1>A little shelter in words.</h1>
      <p>
        Silong is a Filipino-centered literary platform for poetry, stories,
        essays, and personal reflections. Writing is the core product.
        Atmosphere is the experience that surrounds it.
      </p>
      <Link href="/">Back to Silong ?</Link>
    </main>
  );
}
