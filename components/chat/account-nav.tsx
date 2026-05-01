"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface AccountNavProps {
  session: Session | null;
}

export function AccountNav({ session }: AccountNavProps) {
  if (!session?.user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/login">
          <Button
            variant="ghost"
            className="text-amber-100 hover:text-amber-50 hover:bg-amber-900/20"
          >
            Sign In
          </Button>
        </Link>
        <Link href="/register">
          <Button className="bg-amber-600 hover:bg-amber-700 text-amber-50">
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-amber-100 hover:text-amber-50 hover:bg-amber-900/20"
        >
          👤 {session.user.email || session.user.name || "Account"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
        <DropdownMenuItem className="text-amber-100 focus:bg-slate-700 focus:text-amber-100">
          <Link href="/campaign">Campaign Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-slate-700" />
        <DropdownMenuItem
          className="text-red-400 focus:bg-slate-700 focus:text-red-300 cursor-pointer"
          onClick={() =>
            signOut({
              redirect: true,
            })
          }
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
