import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="narrow">
      <h1>A page still unwritten.</h1>
      <p>We couldn’t find that page or public profile.</p>
      <Link className="button" href="/">
        Return home
      </Link>
    </main>
  );
}
