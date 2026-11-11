"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mobile-menu">
      <button
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <nav aria-label="Mobile navigation" onClick={() => setOpen(false)}>
          <Link href="/explore">Explore</Link>
          <Link href="/dashboard">Write</Link>
          <Link href="/signin">Sign in</Link>
          <Link href="/signup">Get started</Link>
        </nav>
      )}
    </div>
  );
}
