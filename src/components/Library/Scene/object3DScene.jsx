"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { Model } from "./model";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Environment } from '@react-three/drei'
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useControls } from "leva";

export default function Object3DScene({...props}){
    const containerRef = useRef(null);
    const [modelRefs, setModelRefs] = useState(null);
    const originalPositions = useRef({});
    const cameraRef = useRef();
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        setIsMobile(window.innerWidth < 550);
        window.addEventListener("resize", () => {setIsMobile(window.innerWidth <= 550);});
    }, []);
    useGSAP(() => {
        if (!modelRefs || !containerRef.current) return;  
        const mainGroup = modelRefs.main;
        var distance = window.innerHeight*2;
        var triggerPin = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 0px",
            end: `+=${distance}px`,
            pin: true,
        }); 
        const tl = gsap.timeline({ 
            defaults: { duration: 1.1, ease: 'power3.out' },
            scrollTrigger: {
                trigger: containerRef.current,
                start: `top ${window.innerWidth > 1680?70:70}%`,
                end: `+=${distance+(window.innerHeight*0.4)}px`,
                scrub: true,
                invalidateOnRefresh: true, 
                refreshPriority: 1,
            }
        });
        const degToRad = (deg) => deg * (Math.PI / 180);
        const firstBlockStartingY = modelRefs.divisori_int.position['y'];
        gsap.set(modelRefs.divisori_int.position, { y: '-300px' });
        //gsap.set(cameraRef.current.position, {x:5, y:-1.4});
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
                var adjAx = null;
                var adjVal = null;
                switch(key){
                    case 'ruote': 
                    axis = 'y'; val = '-=400px'; break;
                    case 'tappo':
                    case 'interruttore':
                    case 'bullone':
                        val = '-=600px'; break;
                    case 'pannello_post':
                        val = '-=600px'; 
                        adjAx = 'y';
                        adjVal = '-100px'; 
                        break;
                }
                originalPositions.current[key] = {
                    axis: axis,
                    position: el.position[axis],
                    value: val,
                    adjAx: adjAx,
                    adjVal: adjVal,
                    adjPos: (adjAx)?el.position[adjAx]:null
                };
            }
            var setObject = {
                [originalPositions.current[key].axis]: originalPositions.current[key].value
            };
            var toObject = {
                [originalPositions.current[key].axis]: originalPositions.current[key].position, 
                delay: 0.015*i
            };
            if(originalPositions.current[key].adjAx){
                setObject = {
                    ...setObject,
                    [originalPositions.current[key].adjAx]: originalPositions.current[key].adjVal
                }
                toObject = {
                    ...toObject,
                    [originalPositions.current[key].adjAx]: originalPositions.current[key].adjPos
                }
            };
            gsap.set(el.position, setObject);
            tl.to(el.position, toObject, '<+=0.05') //15*(1/modelsArray.length*(i+1))
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

        tl.from(cameraRef.current.position, {x:5, y:-1.4, ease: 'none', duration:3, onComplete: () => {console.log('finish')}},'0.5')   
        .to(cameraRef.current, {zoom: isMobile?1.2:1.8, ease: 'none', duration: 3, onUpdate: () => cameraRef.current.updateProjectionMatrix()}, '0.8')         
    },{dependencies: [modelRefs, isMobile], scope: containerRef, revertOnUpdate: true});
    // const env = useControls("Environment", {
    //     intensity: { value: 1.04, min: 0, max: 5, step: 0.01 },
    //     rotX: { value: 0.58, min: -Math.PI, max: Math.PI, step: 0.001 },
    //     rotY: { value: -0.7, min: -Math.PI, max: Math.PI, step: 0.001 },
    //     rotZ: {
    //       value: -6.2,
    //       min: -Math.PI * 2,
    //       max: Math.PI * 2,
    //       step: 0.001,
    //     },
    // });
    return <div ref={containerRef} id="scene-container" {...props}>
        <Canvas className="w-full !h-screen" shadows>
            <PerspectiveCamera ref={cameraRef} makeDefault position={[5.6, 1.5, 0.1]} rotation={[-82, 80, 82]} fov={50} zoom={1.2} />
            <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} target={[0, 0, 0]} />
            <Environment 
                files={["/hdr/hdr-front.webp","/hdr/hdr-front-gainmap.webp","/hdr/hdr-front.json"]} 
                environmentIntensity={1.04} 
                environmentRotation={[-0.2, -0.7, -6.2]} 
                // environmentRotation={[env.rotX, env.rotY, env.rotZ]}
                // environmentIntensity={env.intensity}
                resolution={256}
            />
            <Model onRefsReady={setModelRefs} isMobile={isMobile}  />
            <directionalLight
                position={[5, 10, 5]}
                intensity={1}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-near={0.1}
                shadow-camera-far={50}
                shadow-radius={8}
            />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, isMobile?-0.7:-0.9, 0]} receiveShadow>
                <planeGeometry args={[20, 20]} />
                <shadowMaterial opacity={0.3} transparent  depthWrite={false} />
            </mesh>
        </Canvas>
    </div>
}