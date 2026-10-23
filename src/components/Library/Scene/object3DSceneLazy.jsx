"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTransitionState } from "next-transition-router";

const Object3DScene = dynamic(() => import("./object3DScene"), {
  ssr: false,
  loading: () => <div className="w-full h-screen" />,
});

export default function Object3DSceneLazy({ ...props }) {
  const [shouldMount, setShouldMount] = useState(false);
  const { stage } = useTransitionState();

  useEffect(() => {
    if (shouldMount || stage !== "none") return;

    const mount = () => setShouldMount(true);

    if (typeof window.requestIdleCallback === "function") {
      const handle = window.requestIdleCallback(mount, { timeout: 2000 });
      return () => window.cancelIdleCallback(handle);
    }
    const handle = window.setTimeout(mount, 200);
    return () => window.clearTimeout(handle);
  }, [shouldMount, stage]);

  if (shouldMount) return <Object3DScene {...props} />;

  return <div className="w-full h-screen" />;
}
