import { Brand } from "@/components/brand";
export default function Loading() {
  return (
    <main id="main" className="narrow">
      <Brand animated />
      <p role="status">Finding your quiet corner…</p>
    </main>
  );
}
