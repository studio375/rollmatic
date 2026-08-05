"use client";
import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';

export function Model({onRefsReady, ...props}) {
  const { nodes, materials } = useGLTF('/S50.opt.glb')
  const refs = useRef({});
  useEffect(() => {
    onRefsReady(refs.current); //passo tutti i ref
  }, []);
  return (
    <group ref={(el) => refs.current.main=el} {...props} dispose={null} scale={0.015} position={[0, -0.9, 0]}  rotation={[0, -Math.PI * 1.2, 0]}>
      <group ref={(el) => { if(el) { el.orderIndex = 15; refs.current.sportello = el; } }} position={[34.322, 52.331, 26.066]}> //sportello
        <mesh
          geometry={nodes['sportello-paint_gray_2'].geometry}
          material={nodes['sportello-paint_gray_2'].material}
          position={[-0.376, -7.552, -5]}
          scale={32.286}
        />
        <mesh
          geometry={nodes['sportello-Mat53'].geometry}
          material={nodes['sportello-Mat53'].material}
          position={[-4.629, -22.773, -3.9]}
          scale={14.5}
        />
        <mesh
          geometry={nodes['sportello-Plastica'].geometry}
          material={nodes['sportello-Plastica'].material}
          position={[1.891, 22.616, -5]}
          scale={1.4}
        />
        <mesh
          geometry={nodes['sportello-Plastica_1'].geometry}
          material={nodes['sportello-Plastica_1'].material}
          position={[0.842, 20.982, 5]}
          scale={5}
        />
      </group>
      <group ref={(el) => refs.current.tappo=el} position={[-36.729, 79.648, 42.066]}> //tappo
        <mesh
          geometry={nodes['input-Plastica'].geometry}
          material={nodes['input-Plastica'].material}
          position={[-1.053, 0.169, 0]}
          scale={1.869}
        />
      </group>
      <mesh //bullone
        geometry={nodes.NAUO286.geometry}
        material={nodes.NAUO286.material}
        position={[-38.241, 86.948, 44.066]}
        scale={1.585}
        ref={(el) => refs.current.bullone=el}
      />
      <group ref={(el) => refs.current.interruttore=el} position={[-36.779, 94.948, 44.066]}> //interruttore
        <mesh
          geometry={nodes['interruttore-_PLASTICA_bianco'].geometry}
          material={nodes['interruttore-_PLASTICA_bianco'].material}
          position={[-1.81, 0, 0]}
          scale={2.25}
        />
        <mesh
          geometry={nodes['interruttore-Chrome'].geometry}
          material={nodes['interruttore-Chrome'].material}
          position={[-0.65, 0, 0]}
          scale={2.3}
        />
        <mesh
          geometry={nodes['interruttore-Plastica'].geometry}
          material={nodes['interruttore-Plastica'].material}
          position={[-1.41, 0, 0]}
          scale={2.4}
        />
      </group>
      <group ref={(el) => { if(el) { el.orderIndex = 17; refs.current.touch = el; } }} position={[32.325, 89.672, -38.684]}> //touchscreen
        <mesh
          geometry={nodes.touchscreen_1.geometry}
          material={nodes.touchscreen_1.material}
          position={[-0.058, -0.058, 0]}
          scale={4.787}
        />
        <mesh
          geometry={nodes['touchscreen-_PLASTICA_bianco'].geometry}
          material={nodes['touchscreen-_PLASTICA_bianco'].material}
          position={[2.867, -2.912, 0]}
          scale={1.181}
        />
        <mesh
          geometry={nodes['touchscreen-_PLASTICA_rosso'].geometry}
          material={nodes['touchscreen-_PLASTICA_rosso'].material}
          position={[-2.855, 2.809, 2.51]}
          scale={0.133}
        />
        <mesh
          geometry={nodes['touchscreen-plastica_trasp1'].geometry}
          material={nodes['touchscreen-plastica_trasp1'].material}
          position={[-0.058, -0.058, 0]}
          scale={4.787}
        />
        <mesh
          geometry={nodes['touchscreen-Plastica'].geometry}
          material={nodes['touchscreen-Plastica'].material}
          position={[-0.023, -0.023, 0]}
          scale={6.197}
        />
        <mesh
          geometry={nodes['touchscreen-Plastica_1'].geometry}
          material={nodes['touchscreen-Plastica_1'].material}
          position={[-0.265, -0.265, 0]}
          scale={6.4}
        />
      </group>
      <mesh //vaschetta (interna)
        geometry={nodes.vaschetta.geometry}
        material={nodes.vaschetta.material}
        position={[7.371, 18.398, 17.866]}
        scale={24.85}
        ref={(el) => { if(el) { el.orderIndex = 12; refs.current.vaschetta_int = el; } }}
   
      />
      <mesh //pala
        geometry={nodes.NAUO246.geometry}
        material={nodes.NAUO246.material}
        position={[34.881, 91.236, 19.818]}
        scale={28.148}
        ref={(el) => { if(el) { el.orderIndex = 15; refs.current.pala = el; } }}
      />
      <group ref={(el) => { if(el) { el.orderIndex = -1; refs.current.pannello_post = el; } }} position={[-38.529, 52.148, -24.884]}> //pannello posteriore
        <mesh
          geometry={nodes['pannello_posteriore-paint_gray_2'].geometry}
          material={nodes['pannello_posteriore-paint_gray_2'].material}
          position={[2.137, 5.154, 24.75]}
          scale={48}
        />
        <mesh
          geometry={nodes['pannello_posteriore-Plastica'].geometry}
          material={nodes['pannello_posteriore-Plastica'].material}
          position={[-0.833, 41.849, 21.038]}
          scale={41.949}
        />
        <mesh
          geometry={nodes['pannello_posteriore-Mat53'].geometry}
          material={nodes['pannello_posteriore-Mat53'].material}
          position={[1.347, 4.925, 24.75]}
          scale={47.025}
        />
      </group>
      <group ref={(el) => { if(el) { el.orderIndex = -1; refs.current.ruote = el; } }} position={[-2.579, 10.648, -0.134]}> //ruote
        <mesh
          geometry={nodes['ruote-Synthetic_-_ABS_Matte_RAL2001'].geometry}
          material={nodes['ruote-Synthetic_-_ABS_Matte_RAL2001'].material}
          position={[3.735, -6.7, 0]}
          scale={42.675}
        />
        <mesh
          geometry={nodes['ruote-paint_gray_2'].geometry}
          material={nodes['ruote-paint_gray_2'].material}
          position={[0, 1, 0]}
          scale={42.7}
        />
        <mesh
          geometry={nodes['ruote-Mat53'].geometry}
          material={nodes['ruote-Mat53'].material}
          position={[4.93, -3.95, 0]}
          scale={44.55}
        />
      </group>
      <group ref={(el) => { if(el) { el.orderIndex = -3; refs.current.divisori_int = el; } }} position={[-1.091, 59.198, -5.459]}> //divisori interni
        <mesh
          geometry={nodes['divisori_interni-Mat53'].geometry}
          material={nodes['divisori_interni-Mat53'].material}
          position={[1.039, -3.542, 5.325]}
          scale={49.2}
        />
        <mesh
          geometry={nodes['divisori_interni-paint_gray_2'].geometry}
          material={nodes['divisori_interni-paint_gray_2'].material}
          position={[-18.766, 30.02, 5.325]}
          scale={49.2}
        />
      </group>
      <group position={[-4.091, 56.698, -12.509]} ref={(el) => { if(el) { el.orderIndex = 14; refs.current.scocca = el; } }}> //contenitore esterno
        <mesh
          geometry={nodes['contenitore-Plastica'].geometry}
          material={nodes['contenitore-Plastica'].material}
          position={[15.563, 46.25, 12.375]}
          scale={49.2}
        />
        <mesh
          geometry={nodes['contenitore-Mat53'].geometry}
          material={nodes['contenitore-Mat53'].material}
          position={[15.562, 46.25, 12.375]}
          scale={49.52}
        />
        <mesh
          geometry={nodes['contenitore-paint_gray_2'].geometry}
          material={nodes['contenitore-paint_gray_2'].material}
          position={[4.103, 2.4, 12.375]}
          scale={49.5}
        />
      </group>
      <group ref={(el) => { if(el) { el.orderIndex = 13; refs.current.anta_sup = el; } }} position={[9.081, 99.033, -0.134]}> //anta superiore
        <mesh
          geometry={nodes['Anta-gomma'].geometry}
          material={nodes['Anta-gomma'].material}
          position={[15.9, -5.625, 0]}
          scale={47.9}
        />
        <mesh
          geometry={nodes['Anta-Chrome'].geometry}
          material={nodes['Anta-Chrome'].material}
          position={[-0.49, 0.762, 0]}
          scale={50.33}
        />
        <mesh
          geometry={nodes['Anta-Mat53'].geometry}
          material={nodes['Anta-Mat53'].material}
          position={[0.394, -0.555, 0]}
          scale={50}
        />
        <mesh
          geometry={nodes['Anta-glass_fake_falloff'].geometry}
          material={nodes['Anta-glass_fake_falloff'].material}
          position={[0.001, 1.007, 0]}
          scale={48.9}
        />
        <mesh
          geometry={nodes['Anta-paint_gray_2'].geometry}
          material={nodes['Anta-paint_gray_2'].material}
          position={[-0.196, -0.41, 0]}
          scale={48.9}
        />
      </group>
      <group ref={(el) =>{if(el){el.orderIndex=9; refs.current.fermapane=el;}}} position={[2.119, 88.307, -45.865]}> //fermapane
        <mesh
          geometry={nodes['fermapane-Chrome'].geometry}
          material={nodes['fermapane-Chrome'].material}
          position={[7.298, -2.613, -1.819]}
          scale={10.943}
        />
        <mesh
          geometry={nodes['fermapane-Mat53'].geometry}
          material={nodes['fermapane-Mat53'].material}
          position={[-2.443, -0.276, 8.856]}
          scale={21.105}
        />
      </group>
      <group ref={(el) => {if(el){el.orderIndex=8;refs.current.vassoio=el;}}} position={[4.817, 83.137, -0.596]}> //vassoio taglio
        <mesh
          geometry={nodes['vassoio_taglio-Mat53'].geometry}
          material={nodes['vassoio_taglio-Mat53'].material}
          position={[1.465, -2.289, 0.065]}
          scale={48.742}
        />
        <mesh
          geometry={nodes['vassoio_taglio-Chrome'].geometry}
          material={nodes['vassoio_taglio-Chrome'].material}
          position={[4.571, 11.994, 0.39]}
          scale={47.71}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/S50.opt.glb')