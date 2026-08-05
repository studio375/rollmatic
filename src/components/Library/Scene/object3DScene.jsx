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
        console.log(modelRefs);
        const tl = gsap.timeline({ 
            defaults: { duration: 1.1, ease: 'power3.out' },
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 0',
                end: '+=1700px',
                scrub: true,
                pin: true,
                invalidateOnRefresh: true, 
                refreshPriority: 1
            }
        });
        const degToRad = (deg) => deg * (Math.PI / 180);
        const firstBlockStartingY = modelRefs.divisori_int.position['y'];
        gsap.set(modelRefs.divisori_int.position, { y: '-300px' });
        tl.to(mainGroup.rotation, {y:degToRad(-330), ease: 'none', duration: 4,})
          .to(modelRefs.divisori_int.position, { y: firstBlockStartingY}, '<')              

        var modelsArray = Object.entries(modelRefs)
        .map(([key, el], i) => {
            if(el.orderIndex && el.orderIndex>7){
                if(el.children.length){
                    el.traverse(child => {
                        if (child.isMesh && child.material) {
                            child.material = child.material.clone();
                            child.material.transparent = true;
                            gsap.set(child.material, { opacity: 0 });
                            child.material.needsUpdate = true;
                        }
                    });
                }else{
                    el.material = el.material.clone();
                    el.material.transparent = true;
                    gsap.set(el.material, { opacity: 0 });
                    el.material.needsUpdate = true;
                }
            }
            return { key, el, i };
        }) //per ogni modello mi salvo un oggetto con chiave e elemento
        .filter(({ key, el }) => key !== 'main' && key !== 'divisori_int' && el) // filtro qui, non nel forEach
        .sort((a, b) => {
            //ordino tutti elementi in base all'index salvato (se è salvato)
            const orderA = a.el.orderIndex ?? 1; 
            const orderB = b.el.orderIndex ?? 1;
            return orderA !== orderB ? orderA - orderB : a.i - b.i;
        });
        
        modelsArray.forEach((elem, i) => {
            var key = elem.key;
            var el = elem.el;
            if (originalPositions.current[key] === undefined) {  // salvo la posizione originale solo se non l'ho già salvata
                var axis = 'x';
                var val = '+=600px';
                switch(key){
                    case 'tappoz': 
                    axis = 'z'; break;
                    case 'fermapane':
                    axis = 'y'; val='-=500px'; break;
                    case 'ruote':
                    case 'pannello_post':
                    case 'tappo':
                    case 'interruttore':
                    case 'bullone':
                    val = '-=600px'; break;
                }
                originalPositions.current[key] = {
                    axis: axis,
                    position: el.position[axis],
                    value: val
                };
            }
            gsap.set(el.position, { [originalPositions.current[key].axis]: originalPositions.current[key].value });
            tl.to(el.position, { [originalPositions.current[key].axis]: originalPositions.current[key].position, delay: 0.02*i}, '<+=0.11') //15*(1/modelsArray.length*(i+1))
            if (el.children.length > 0) {
                el.traverse(child => {
                    if (child.isMesh && child.material) {
                        tl.to(child.material, { opacity: 1, ease: 'none', duration: 0.5 }, '<');
                    }
                });
            } else if (el.material) {
                tl.to(el.material, { opacity: 1, ease: 'none', duration: 0.5 }, '<');
            }
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