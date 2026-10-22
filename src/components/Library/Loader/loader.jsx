"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import { usePathname } from "@/i18n/navigation";
import { useStore } from "@/store/useStore";

const MIN_LOADER_DURATION = 2000;
// evita che il loader resti bloccato se il video della home non arriva mai a caricarsi
const HOME_FALLBACK_DELAY = 8000;

export default function Loader() {
  const firstLayer = useRef(null);
  const secondLayer = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [minDurationElapsed, setMinDurationElapsed] = useState(false);
  const pathname = usePathname();
  const isHome = useRef(pathname === "/");
  const pageIsReady = useStore((state) => state.pageIsReady);
  const setPageIsReady = useStore((state) => state.setPageIsReady);

  useEffect(() => {
    const minTimeout = setTimeout(
      () => setMinDurationElapsed(true),
      MIN_LOADER_DURATION,
    );
    const readyTimeout = setTimeout(
      () => setPageIsReady(true),
      isHome.current ? HOME_FALLBACK_DELAY : MIN_LOADER_DURATION,
    );
    return () => {
      clearTimeout(minTimeout);
      clearTimeout(readyTimeout);
    };
  }, [setPageIsReady]);

  useEffect(() => {
    if (!pageIsReady || !minDurationElapsed) return;
    const timeline = gsap.timeline({ onComplete: () => setIsVisible(false) });
    timeline
      .to(firstLayer.current, { y: "-100%", duration: 0.7, ease: "power4.inOut" })
      .to(secondLayer.current, { y: "-100%", duration: 0.7, ease: "power4.inOut" }, "<");
    return () => timeline.kill();
  }, [pageIsReady, minDurationElapsed]);

  if (!isVisible) return null;

  return (
    <div aria-hidden="true">
      <div
        ref={firstLayer}
        className="fixed top-0 left-0 w-screen h-[100dvh] bg-[var(--background)] z-999999999999999"
      />
      <div
        ref={secondLayer}
        className="fixed top-0 left-0 w-screen h-[100dvh] bg-[var(--color-primary)] z-999999999999999"
      >
        <Image
          src="/logo_light.svg"
          width={200}
          height={100}
          alt=""
          priority
          className="w-30 h-auto absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
        />
      </div>
    </div>
  );
}
