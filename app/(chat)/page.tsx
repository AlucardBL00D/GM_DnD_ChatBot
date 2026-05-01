"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Generate a new chat ID and redirect
    const chatId = Math.random().toString(36).substring(2, 11);
    router.push(`/chat/${chatId}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-dvh w-full">
      <div className="text-center space-y-4">
        <p className="text-muted-foreground text-lg">⚔️ Starting your adventure...</p>
        <div className="animate-spin">
          <div className="h-8 w-8 border-4 border-amber-600 border-t-amber-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
