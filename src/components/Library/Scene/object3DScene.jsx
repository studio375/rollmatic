"use client";
import { Canvas } from "@react-three/fiber";
import { Model } from "./model";
import { OrbitControls } from "@react-three/drei";
import { Environment } from '@react-three/drei'
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export default function Object3DScene({...props}){
    const containerRef = useRef(null);
    const [modelRefs, setModelRefs] = useState(null);
    const originalPositions = useRef({});
    useGSAP(() => {
        if (!modelRefs || !containerRef.current) return;  
        const mainGroup = modelRefs.main;
        const tl = gsap.timeline({ 
            defaults: { duration: 1.1, ease: 'power3.out' },
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 0',
                end: '+=2000px',
                scrub: true,
                pin: true,
                invalidateOnRefresh: true, 
                refreshPriority: 1
            }
        });
        const degToRad = (deg) => deg * (Math.PI / 180);
        tl.to(mainGroup.rotation, {y:degToRad(-330), duration: 3, ease: 'none'});
        
        Object.entries(modelRefs).forEach(([key, el], i) => {
            if (!el) return;
            if(key == 'main') return;
        
            // salvo la posizione originale solo se non l'ho già salvata
            if (originalPositions.current[key] === undefined) {
            var axis = 'x';
            var val = '+=600';
            switch(key){
                case 'tappo': 
                axis = 'z'; break;
                case 'interruttore':
                case 'sportello':
                axis = 'y'; val='-=600'; break;
            }
            originalPositions.current[key] = {
                axis: axis,
                position: el.position[axis],
                value: val
            };
            }
            gsap.set(el.position, { [originalPositions.current[key].axis]: originalPositions.current[key].value });
            tl.to(el.position, { [originalPositions.current[key].axis]: originalPositions.current[key].position, duration: 3, delay: 0.1*i }, '<');
        });
    },{dependencies: [modelRefs], scope: containerRef, revertOnUpdate: true});
    return <div ref={containerRef} id="scene-container" {...props}>
        <Canvas className="w-full !h-screen" camera={{ position: [5.6,1.5,0.1], rotation:[-82, 80, 82], fov: 50, zoom: 1.5 }}>
            {/* <axesHelper /> */}
            <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} target={[0, 0, 0]} />
            <Environment preset="sunset" />
            <Model onRefsReady={setModelRefs}  />
        </Canvas>
    </div>
}