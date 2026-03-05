"use client";

import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { gsap } from "@/lib/gsap";

export default function SmoothScroll({ children }) {
  const scrollRef = useRef(null);
  const locomotiveScrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      locomotiveScrollRef.current = new LocomotiveScroll({
        initCustomTicker: (render) => {
          gsap.ticker.add(render);
        },
        destroyCustomTicker: (render) => {
          gsap.ticker.remove(render);
        },
      });

      // Only for ScrollTrigger use
      // locomotiveScroll.lenisInstance.on("scroll", ScrollTrigger.update);
    }

    return () => {
      locomotiveScrollRef.current?.destroy();
    };
  }, []);

  return <main ref={scrollRef}>{children}</main>;
}
