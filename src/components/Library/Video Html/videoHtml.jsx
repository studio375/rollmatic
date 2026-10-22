"use client";
import { useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";

export default function VideoHtml({
  videoObj,
  poster=null,
  className = "",
  setsPageReady = false,
  ...props
}) {
  const videoRef = useRef(null);
  const loadedUrl = useRef(videoObj.url);
  const setPageIsReady = useStore((state) => state.setPageIsReady);

  useEffect(() => {
    const video = videoRef.current;
    if (!setsPageReady || !video) return;

    const markReady = () => setPageIsReady(true);
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      markReady();
      return;
    }
    video.addEventListener("canplay", markReady, { once: true });
    video.addEventListener("error", markReady, { once: true });
    return () => {
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("error", markReady);
    };
  }, [setsPageReady, setPageIsReady, videoObj.url]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    if (loadedUrl.current !== videoObj.url) {
      loadedUrl.current = videoObj.url;
      video.load();
    }

    const tryPlay = () => {
      const promise = video?.play();
      if (promise !== undefined) {
        promise.catch(() => {
          const resume = () => {
            video.play().catch(() => {});
            window.removeEventListener("touchstart", resume);
            window.removeEventListener("click", resume);
          };
          window.addEventListener("touchstart", resume, { once: true });
          window.addEventListener("click", resume, { once: true });
        });
      }
    };

    tryPlay();

    const onVisibility = () => {
      if (document.visibilityState === "visible" && video.paused) tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [videoObj.url]);

  return (
    <video
      {...props}
      ref={videoRef}
      className={`relative w-full h-full object-cover ${className}`}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      onContextMenu={(e) => e.preventDefault()}
    >
      <source src={videoObj.url} type="video/mp4" />
    </video>
  );
}
