"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function DashboardNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Dashboard">
      {[
        ["", "Overview"],
        ["writing", "My writing"],
        ["drafts", "Drafts"],
        ["journal", "Journal"],
        ["bookmarks", "Bookmarks"],
        ["profile", "Customize profile"],
        ["settings", "Settings"],
      ].map(([path, name]) => {
        const href = "/dashboard" + (path ? "/" + path : "");
        return (
          <Link
            key={name}
            href={href}
            aria-current={pathname === href ? "page" : undefined}
          >
            {name}
          </Link>
        );
      })}
    </nav>
  );
}
