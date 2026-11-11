import Link from "next/link";
export default function Settings() {
  return (
    <>
      <h1>Account settings</h1>
      <p>Keep your writing room yours.</p>
      <Link href="/forgot-password">Request a password reset email ?</Link>
      <p>Additional account settings will arrive in a future phase.</p>
    </>
  );
}
