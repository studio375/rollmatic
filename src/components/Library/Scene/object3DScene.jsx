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
        tl.to(mainGroup.rotation, {y:degToRad(-330), ease: 'none', duration: 3});

        var modelsArray = Object.entries(modelRefs)
        .map(([key, el], i) => ({ key, el })) //per ogni modello mi salvo un oggetto con chiave e elemento
        .filter(({ key, el }) => key !== 'main' && el) // filtro qui, non nel forEach
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
                var val = '+=600';
                switch(key){
                    case 'tappo': 
                    axis = 'z'; break;
                    case 'interruttore':
                    //case 'sportello':
                    case 'ruote':
                    case 'pannello_post':
                    case 'divisori_int':
                    case 'fermapane':
                    axis = 'y'; val='-=600'; break;
                }
                originalPositions.current[key] = {
                    axis: axis,
                    position: el.position[axis],
                    value: val
                };
            }
            gsap.set(el.position, { [originalPositions.current[key].axis]: originalPositions.current[key].value });
            // if(el.children.length){
            //     el.children.forEach(child => {
            //         if (child.isMesh && child.material) {
            //             child.material.transparent = true;
            //             gsap.set(child.material, { opacity: 0 }); // stato iniziale
            //             child.material.needsUpdate = true;
            //         }
            //     });
            // }else{
            //     el.material.transparent = true;
            //     gsap.set(el.material, { opacity: 0 });
            //     el.material.needsUpdate = true;
            // }
            tl.to(el.position, { [originalPositions.current[key].axis]: originalPositions.current[key].position, duration: 3, delay: 0.1*i}, '<+=0.2') //15*(1/modelsArray.length*(i+1))
            // .to((el.children.length > 0?el.children.material:el.material), {opacity: 1, duration: 5}, '<')
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