"use client";

import { useRef } from "react";
import { TransitionRouter } from "next-transition-router";
import { useStore } from "@/store/useStore";
import { gsap } from "@/lib/gsap";
import Image from "next/image";


export default function Providers({ children }) {
  const firstLayer = useRef(null);
  const secondLayer = useRef(null);
  const logo = useRef(null);
  const imageWall = useRef(null);
  const thirdLayer = useRef(null);

  const dur = 1;
  const overlap = "<0.18";

  return (
    <TransitionRouter
      auto={true}
      leave={(next, from, to) => {
        gsap.set([firstLayer.current, secondLayer.current], {y:"100%"});
        var tml = gsap.timeline({
            onComplete: next,
        });
        tml.to(firstLayer.current, {y:0, duration:0.5})
           .to(secondLayer.current, {y:0, duration: 0.5})
           .fromTo(imageWall.current,{x:"-50%"}, {x:"100%", duration: 1});
        return () => {
          tml.kill();
        };
      }}
      enter={(next) => {
        var tml = gsap.timeline({
            onComplete: next,
        });
        tml.to(firstLayer.current, {y:"-100%", duration:0.3, ease: 'none'})
           .to(secondLayer.current, {y:"-100%", duration:0.3, ease: 'none'}, '<');
        return () => {
          tml.kill();
        };
      }}
    >
      {children}

    <div ref={firstLayer} className="fixed top-0 left-0 w-screen h-screen translate-y-full bg-white z-99999" />
    <div ref={secondLayer} className="fixed top-0 left-0 w-screen h-screen translate-y-full bg-[var(--color-primary)] z-99999">
        <div ref={imageWall} className="w-35 h-35 absolute left-1/2 top-1/2 -translate-y-1/2 bg-[var(--color-primary)] z-1" />
        <Image ref={logo} src={'/logo_light.svg'} width={200} height={100} alt="logo" className="w-30 h-auto absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2" />
    </div>
      {/* <div ref={secondLayer} className="overlay v2" />
      <div ref={thirdLayer} className="overlay v3" /> */}
    </TransitionRouter>
  );
}