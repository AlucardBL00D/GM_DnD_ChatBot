"use client";

import { useState } from "react";
import { Session } from "next-auth";
import Link from "next/link";
import { signIn } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CharacterCreationDialogProps {
  session: Session | null;
}

export function CharacterCreationDialog({
  session,
}: CharacterCreationDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGuestLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signIn("guest", { 
        redirect: false,
      });
      if (result?.ok) {
        // Attendre un peu pour que la session soit mise à jour
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsOpen(false);
        window.location.href = "/campaign";
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Guest login failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-amber-50 font-bold transition transform hover:scale-105 px-6 py-3 rounded-lg border border-amber-600 h-11"
      >
        🛡️ Create Character
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-slate-800 border-amber-700/50 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-amber-100">
              Begin Your Adventure
            </DialogTitle>
            <DialogDescription className="text-amber-100/70">
              Choose how you want to start your D&D journey
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Guest Option */}
            <div className="space-y-2">
              <h3 className="font-semibold text-amber-100 flex items-center gap-2">
                <span className="text-2xl">🌍</span>
                Quick Start - Guest
              </h3>
              <p className="text-sm text-amber-100/70 mb-3">
                Play as a guest. Your campaign won't be saved, but you can experience the adventure immediately.
              </p>
              <Button
                onClick={handleGuestLogin}
                disabled={isLoading}
                variant="outline"
                className="w-full border-amber-700/50 text-amber-100 hover:bg-amber-900/20"
              >
                {isLoading ? "Loading..." : "Continue as Guest"}
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-amber-700/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800 text-amber-100/60">or</span>
              </div>
            </div>

            {/* Email Option */}
            <div className="space-y-2">
              <h3 className="font-semibold text-amber-100 flex items-center gap-2">
                <span className="text-2xl">📧</span>
                Full Experience - Sign In/Up
              </h3>
              <p className="text-sm text-amber-100/70 mb-3">
                Create an account to save your campaigns, track your characters, and continue your adventures across sessions.
              </p>

              {session?.user ? (
                <Link 
                  href="/campaign"
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-amber-50 font-bold">
                    Go to Campaign
                  </Button>
                </Link>
              ) : (
                <div className="flex gap-2">
                  <Link 
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-amber-600 text-amber-100 hover:bg-amber-900/20"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link 
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex-1"
                  >
                    <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-amber-50 font-bold">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <p className="text-xs text-amber-100/50 text-center mt-4">
            Guest accounts are temporary. Sign up to unlock the full experience.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
