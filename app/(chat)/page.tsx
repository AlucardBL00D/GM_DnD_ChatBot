"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Generate a new chat ID and redirect
    const chatId = Math.random().toString(36).substring(2, 11);
    router.replace(`/chat/${chatId}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <p className="text-muted-foreground">Starting new campaign...</p>
      </div>
    </div>
  );
}
