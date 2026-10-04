import { updateSession } from "@/lib/supabase/proxy";
import { supabaseEnabled } from "@/lib/supabase/env";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  if (!supabaseEnabled) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/protected")) {
    return await updateSession(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/protected/:path*"],
};
