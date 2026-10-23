"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useStore } from "@/store/useStore";

export default function PageReadyChatScript() {
  const pageIsReady = useStore((state) => state.pageIsReady);
  const [delayElapsed, setDelayElapsed] = useState(false);

  useEffect(() => {
    if (!pageIsReady) return;

    const timeout = window.setTimeout(() => setDelayElapsed(true), 10000);
    return () => window.clearTimeout(timeout);
  }, [pageIsReady]);

  if (!pageIsReady || !delayElapsed) return null;

  return (
    <Script
      src="https://chat.daliatechnologies.ai/embed.min.js?chatbotId=698d0c4bfaab1933e7aba0c2"
      strategy="lazyOnload"
    />
  );
}