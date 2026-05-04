import Link from "next/link";
import { auth } from "@/app/(auth)/auth";
import { SignOutForm } from "@/components/chat/sign-out-form";

export async function Navigation() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg hover:opacity-75 transition">
          <span className="text-xl">⚔️</span>
          <span className="hidden sm:inline text-foreground">D&D Master</span>
        </Link>

        {/* Center Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition">
            Home
          </Link>
          {session?.user && (
            <>
              <Link href="/campaign" className="text-sm text-muted-foreground hover:text-foreground transition">
                Campaign
              </Link>
              <Link href="/chat" className="text-sm text-muted-foreground hover:text-foreground transition">
                Chat
              </Link>
            </>
          )}
        </div>

        {/* Auth Status / User Menu */}
        <div className="flex items-center gap-4">
          {session?.user ? (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{session.user?.email}</p>
                <p className="text-xs text-muted-foreground">
                  {session.user?.type === "guest" ? "Guest" : "Account"}
                </p>
              </div>
              <SignOutForm />
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm px-4 py-2 rounded bg-amber-600 hover:bg-amber-700 text-amber-50 font-semibold transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
