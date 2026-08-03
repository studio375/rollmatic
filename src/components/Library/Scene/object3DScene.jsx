"use client";
import { Canvas } from "@react-three/fiber";
import { Model } from "./model";
import { OrbitControls } from "@react-three/drei";
import { Environment } from '@react-three/drei'
import { useRef } from "react";

export default function Object3DScene({...props}){
    const ref = useRef(null);
    return <div ref={ref} id="scene-container" {...props}>
        <Canvas className="w-full !h-screen" camera={{ position: [5.6,1.5,0.1], rotation:[-82, 80, 82], fov: 50, zoom: 1.5 }}>
            {/* <axesHelper /> */}
            <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} target={[0, 0, 0]} />
            <Environment preset="sunset" />
            <Model containerRef={ref}  />
        </Canvas>
    </div>
}