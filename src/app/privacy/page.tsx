import Link from "next/link";
export default function Page() {
  return (
    <main id="main" className="narrow">
      <h1>Your words. Your privacy.</h1>
      <p>
        Prelaunch notice: configured accounts use Supabase for authentication
        and profile storage. Your pen name, handle, biography, and profile
        timestamps are public; account email and credentials are not public
        profile fields. A complete privacy policy and contact channel are
        required before public launch.
      </p>
      <Link href="/">Back to Silong ?</Link>
    </main>
  );
}
