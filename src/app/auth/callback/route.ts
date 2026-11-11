import { NextResponse, type NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const next =
    request.nextUrl.searchParams.get("next") === "/update-password"
      ? "/update-password"
      : "/dashboard";
  const db = await supabase();
  if (code && db) {
    const { error } = await db.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, request.url));
  }
  return NextResponse.redirect(
    new URL("/signin?error=verification", request.url),
  );
}
