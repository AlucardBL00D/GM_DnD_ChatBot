"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useActionState, useEffect, useState } from "react";

import { AuthForm } from "@/components/chat/auth-form";
import { SubmitButton } from "@/components/chat/submit-button";
import { toast } from "@/components/chat/toast";
import { type LoginActionState, login, type GuestLoginActionState, loginAsGuest } from "../actions";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoggingInAsGuest, setIsLoggingInAsGuest] = useState(false);

  const [state, formAction] = useActionState<LoginActionState, FormData>(
    login,
    { status: "idle" }
  );

  const { update: updateSession } = useSession();

  // biome-ignore lint/correctness/useExhaustiveDependencies: router and updateSession are stable refs
  useEffect(() => {
    if (state.status === "failed") {
      toast({ type: "error", description: "Invalid credentials!" });
    } else if (state.status === "invalid_data") {
      toast({
        type: "error",
        description: "Failed validating your submission!",
      });
    } else if (state.status === "success") {
      setIsSuccessful(true);
      updateSession();
      router.push("/campaign");
    }
  }, [state.status]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get("email") as string);
    formAction(formData);
  };

  const handleGuestLogin = async () => {
    setIsLoggingInAsGuest(true);
    try {
      const result = await loginAsGuest();
      if (result.status === "success") {
        updateSession();
        router.push("/campaign");
      } else {
        toast({ type: "error", description: "Failed to login as guest" });
      }
    } finally {
      setIsLoggingInAsGuest(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">⚔️ D&D Campaign Master</h1>
      <p className="text-sm text-muted-foreground">
        Choose your journey
      </p>

      {/* Guest Option */}
      <div className="space-y-3 border-b pb-6">
        <p className="text-xs text-muted-foreground font-semibold uppercase">Quick Start</p>
        <button
          onClick={handleGuestLogin}
          disabled={isLoggingInAsGuest}
          className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-amber-50 font-semibold py-2 px-4 rounded-lg transition"
        >
          {isLoggingInAsGuest ? "Loading..." : "🎲 Play as Guest"}
        </button>
        <p className="text-xs text-muted-foreground text-center">
          Start playing immediately. Your campaign won't be saved.
        </p>
      </div>

      {/* Sign In Option */}
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground font-semibold uppercase">With Account</p>
        <AuthForm action={handleSubmit} defaultEmail={email}>
          <SubmitButton isSuccessful={isSuccessful}>🔐 Sign in</SubmitButton>
        </AuthForm>
        <p className="text-center text-[13px] text-muted-foreground">
          {"No account? "}
          <Link
            className="text-foreground underline-offset-4 hover:underline"
            href="/register"
          >
            Create one
          </Link>
        </p>
      </div>
    </>
  );
}
