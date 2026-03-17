"use client";

import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePathname } from "next/navigation";
import { useStore } from "@/store/useStore";

export default function SmoothScroll({ children }) {
  const scrollRef = useRef(null);
  const locomotiveScrollRef = useRef(null);
  const pathname = usePathname();
  const setLenis = useStore((state) => state.setLenis);

  useEffect(() => {
    if (!scrollRef.current) return;

    locomotiveScrollRef.current = new LocomotiveScroll({
      initCustomTicker: (render) => {
        gsap.ticker.add(render);
      },
      destroyCustomTicker: (render) => {
        gsap.ticker.remove(render);
      },
    });

    const lenis = locomotiveScrollRef.current.lenisInstance;

    setLenis(lenis);
    lenis.scrollTo(0, { immediate: true });
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      setLenis(null);
      locomotiveScrollRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (!locomotiveScrollRef.current || !scrollRef.current) return;

    const scroll = locomotiveScrollRef.current;
    const container = scrollRef.current;

    scroll.lenisInstance.scrollTo(0, { immediate: true });
    scroll.removeScrollElements(container);

    const timeout = setTimeout(() => {
      scroll.addScrollElements(container);
      scroll.resize();
      ScrollTrigger.refresh();
    }, 150);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return <main ref={scrollRef}>{children}</main>;
}
