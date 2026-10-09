"use client";
import dynamic from "next/dynamic";

export default dynamic(() => import("./object3DScene"), {
  ssr: false,
  loading: () => <div className="w-full h-screen" />,
});
