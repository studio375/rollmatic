"use client"
import { useEffect, useRef } from "react";
import WorldSvg from "./worldSvg";
import { gsap } from "@/lib/gsap";

export default function WorldParticles({...props}){
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const paths = gsap.utils.toArray(container.querySelectorAll("path"));

        // disattiva l'hit-test nativo, costoso su migliaia di elementi
        paths.forEach(p => p.style.pointerEvents = "none");

        // cache posizioni una volta sola (non ricalcolare ad ogni frame/hover)
        const items = paths.map(elem => {
            const bbox = elem.getBBox();
            const quickX = gsap.quickTo(elem, "x", { duration: 0.6, ease: "power3.out" });
            const quickY = gsap.quickTo(elem, "y", { duration: 0.6, ease: "power3.out" });
            return {
                elem,
                cx: bbox.x + bbox.width / 2,
                cy: bbox.y + bbox.height / 2,
                quickX,
                quickY,
            };
        });

        const RADIUS = 40; // raggio d'influenza in coordinate SVG
        const svg = container.querySelector("svg");
        let rafId;
        let mouse = { x: -9999, y: -9999 };

        function toSvgPoint(clientX, clientY) {
            const rect = svg.getBoundingClientRect();
            const vb = svg.viewBox.baseVal;
            const x = ((clientX - rect.left) / rect.width) * vb.width;
            const y = ((clientY - rect.top) / rect.height) * vb.height;
            return { x, y };
        }

        function onMouseMove(e) {
            mouse = toSvgPoint(e.clientX, e.clientY);
        }

        function loop() {
            for (const item of items) {
                const dx = item.cx - mouse.x;
                const dy = item.cy - mouse.y;
                const dist = Math.hypot(dx, dy);
                if (dist < RADIUS) {
                    const force = (1 - dist / RADIUS) * 20;
                    item.quickX(dx / dist * force || 0);
                    item.quickY(dy / dist * force || 0);
                } else {
                    item.quickX(0);
                    item.quickY(0);
                }
            }
            rafId = requestAnimationFrame(loop);
        }

        window.addEventListener("mousemove", onMouseMove);
        rafId = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return <div ref={containerRef} {...props}><WorldSvg /></div>;
}