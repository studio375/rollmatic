"use client";
import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';

export function Model({onRefsReady, isMobile, ...props}) {
  const { nodes, materials, scene } = useGLTF('/S50-def.opt.glb');
  scene.traverse((child) => {
      if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
      }
  });
  const refs = useRef({});
  useEffect(() => {
    onRefsReady(refs.current); //passo tutti i ref
  }, []);
  return (
    <group ref={(el) => refs.current.main=el} {...props} dispose={null} scale={0.015} position={[0, isMobile?-0.7:-0.9, 0]} rotation={[0, -Math.PI * 1.2, 0]}>

      <group ref={(el) => { if(el) { el.orderIndex = 15; refs.current.sportello = el; } }} position={[34.322, 52.331, 26.066]}> {/* sportello */}
        <mesh castShadow receiveShadow geometry={nodes['sportello-paint_gray_2'].geometry} material={materials['Paint Gray']} position={[-2.976, -7.552, -5]} scale={32.286} />
        <mesh castShadow receiveShadow geometry={nodes['sportello-Chrome'].geometry} material={materials.Chrome} position={[1.891, 22.616, -5]} scale={1.4} />
        <mesh castShadow receiveShadow geometry={nodes['sportello-Plastica_nero'].geometry} material={materials['Plastic Black']} position={[0.842, 20.982, 5]} scale={5} />
      </group>

      <mesh ref={(el) => { if(el) { el.orderIndex = 16; refs.current.etichetta = el; } }} castShadow receiveShadow geometry={nodes.etichetta.geometry} material={materials['etichetta ']} position={[36.548, 80.596, 38.598]} rotation={[0, 0, -0.067]} scale={6.885} /> {/* etichetta - nuova */}

      <mesh ref={(el) => refs.current.tappo=el} castShadow receiveShadow geometry={nodes.input.geometry} material={materials['Plastic Black']} position={[-37.773, 79.814, 42.066]} scale={1.866} /> {/* tappo */}

      <group ref={(el) => refs.current.interruttore=el} position={[-36.779, 94.948, 44.066]}> {/* interruttore */}
        <mesh castShadow receiveShadow geometry={nodes['interruttore-PLASTICA_bianco'].geometry} material={materials['Plastic White']} position={[-1.81, 0, 0]} scale={2.25} />
        <mesh castShadow receiveShadow geometry={nodes['interruttore-Chrome'].geometry} material={materials['Synthetic White']} position={[-0.65, 0, 0]} scale={2.3} />
        <mesh castShadow receiveShadow geometry={nodes['interruttore-Plastica_nero'].geometry} material={materials['Plastic Black']} position={[-1.41, 0, 0]} scale={2.4} />
      </group>

      <mesh
        ref={(el) => refs.current.bullone=el}
        castShadow
        receiveShadow
        geometry={nodes.NAUO286.geometry}
        material={materials['Plastic Black']}
        position={[-38.277, 86.948, 44.066]} /* -36.779 + -1.498 = -38.277 | 94.948 + -8 = 86.948 | 44.066 + 0 */
        scale={1.549}
      /> {/* bullone - riportato top-level (Opzione A), posizione assoluta ricalcolata */}

      <group ref={(el) => { if(el) { el.orderIndex = 17; refs.current.touch = el; } }} position={[32.406, 89.724, -38.684]}> {/* touchscreen */}
        <mesh castShadow receiveShadow geometry={nodes['Touchscreen-PLASTICA_bianco'].geometry} material={materials['Plastic White']} position={[2.883, -2.888, 0]} scale={1.182} />
        <mesh castShadow receiveShadow geometry={nodes['Touchscreen-_PLASTICA_rosso'].geometry} material={materials['Plastic Red']} position={[-2.841, 2.836, 2.511]} scale={0.133} />
        <mesh castShadow receiveShadow geometry={nodes['Touchscreen-Plastica_grigio'].geometry} material={materials['Plastic Gray']} position={[0.003, -0.008, 0]} scale={6.206} />
        <mesh castShadow receiveShadow geometry={nodes['Touchscreen-plastica_trasp_touch'].geometry} material={materials.Plexiglass} position={[0.003, -0.008, 0]} scale={4.794} />
        <mesh castShadow receiveShadow geometry={nodes['Touchscreen-Plastica_nero'].geometry} material={materials['Plastic Black']} position={[-0.266, -0.266, 0]} scale={6.4} />
      </group>

      <mesh ref={(el) => { if(el) { el.orderIndex = 12; refs.current.vaschetta_int = el; } }} castShadow receiveShadow geometry={nodes.vaschetta.geometry} material={materials['Plastic White']} position={[7.371, 18.398, 19.713]} scale={24.85} /> {/* vaschetta interna */}

      <mesh ref={(el) => { if(el) { el.orderIndex = 15; refs.current.pala = el; } }} castShadow receiveShadow geometry={nodes.NAUO246.geometry} material={materials['Inox Brushed']} position={[34.881, 91.236, 19.818]} scale={28.148} /> {/* pala */}

      <group ref={(el) => { if(el) { el.orderIndex = -1; refs.current.pannello_post = el; } }} position={[-38.529, 52.148, -24.884]}> {/* pannello posteriore */}
        <mesh castShadow receiveShadow geometry={nodes['pannello_posteriore-paint_gray_2'].geometry} material={materials['Paint Gray']} position={[2.14, 5.152, 24.75]} scale={48} />
        <mesh castShadow receiveShadow geometry={nodes['pannello_posteriore-Plastica_nero'].geometry} material={materials['Plastic Black']} position={[-0.833, 41.849, 21.038]} scale={41.949} />
        <mesh castShadow receiveShadow geometry={nodes['pannello_posteriore-Mat53'].geometry} material={materials.Chrome} position={[1.347, 4.925, 24.75]} scale={47.025} />
      </group>

      <group ref={(el) => { if(el) { el.orderIndex = 0; refs.current.ruote = el; } }} position={[-2.579, 10.648, -0.134]}> {/* ruote */}
        <mesh castShadow receiveShadow geometry={nodes['ruote-Synthetic_-_ruote'].geometry} material={nodes['ruote-Synthetic_-_ruote'].material} position={[3.749, -6.7, 0.067]} scale={42.275} />
        <mesh castShadow receiveShadow geometry={nodes['ruote-Mat53'].geometry} material={materials.Chrome} position={[4.93, -3.95, 0]} scale={44.55} />
        <mesh castShadow receiveShadow geometry={nodes['ruote-paint_gray_2'].geometry} material={materials['Paint Gray']} position={[0, 1.05, 0]} scale={42.7} />
      </group>

      <group ref={(el) => { if(el) { el.orderIndex = -3; refs.current.divisori_int = el; } }} position={[-1.091, 59.198, -5.459]}> {/* divisori interni */}
        <mesh castShadow receiveShadow geometry={nodes['divisori_interni-Mat53'].geometry} material={materials['Inox Brushed']} position={[1.039, -3.542, 5.325]} scale={49.2} />
        <mesh castShadow receiveShadow geometry={nodes['divisori_interni-paint_gray_2'].geometry} material={materials['Paint Gray']} position={[-18.766, 30.02, 5.325]} scale={49.2} />
      </group>

      <mesh ref={(el) => { if(el) { el.orderIndex = 14; refs.current.scocca = el; } }} castShadow receiveShadow geometry={nodes.contenitore.geometry} material={materials['Paint Gray']} position={[0.012, 59.098, -0.134]} scale={49.5} /> {/* contenitore esterno */}

      <group ref={(el) => { if(el) { el.orderIndex = 14; refs.current.perni = el; } }} position={[-4.091, 56.698, -12.509]}> {/* perni - nuovo, ref aggiunto */}
        <mesh castShadow receiveShadow geometry={nodes.perni_1.geometry} material={materials.Chrome} position={[15.563, 46.25, 12.375]} scale={49.2} />
        <mesh castShadow receiveShadow geometry={nodes['perni-Mat53'].geometry} material={materials['Inox Brushed']} position={[15.562, 46.25, 12.375]} scale={49.52} />
      </group>

      <mesh castShadow receiveShadow geometry={nodes.fondo_contenitore.geometry} material={materials['Paint Gray']} position={[-2.596, 11.698, -0.134]} scale={49.2} ref={(el) => { if(el) { el.orderIndex = -1; refs.current.fondo_contenitore = el; } }} /> {/* fondo contenitore - nuovo, ref aggiunto */}

      <group ref={(el) => { if(el) { el.orderIndex = 13; refs.current.anta_sup = el; } }} position={[9.341, 99.938, -0.134]}> {/* anta superiore */}
        <mesh castShadow receiveShadow geometry={nodes.Anta_1.geometry} material={nodes.Anta_1.material} position={[14.164, -6.479, 0]} scale={48.9} />
        <mesh castShadow receiveShadow geometry={nodes['Anta-glass_'].geometry} material={materials.Plexiglass} position={[-0.26, 0.102, 0]} scale={48.9} />
        <mesh castShadow receiveShadow geometry={nodes['Anta-gomma'].geometry} material={nodes['Anta-gomma'].material} position={[15.64, -6.531, 0]} scale={47.9} />
        <mesh castShadow receiveShadow geometry={nodes['Anta-Chrome'].geometry} material={materials.Chrome} position={[-0.75, -0.144, 0]} scale={50.33} />
        <mesh castShadow receiveShadow geometry={nodes['Anta-Mat53'].geometry} material={materials['Inox Brushed']} position={[0.133, -1.461, 0]} scale={50} />
        <mesh castShadow receiveShadow geometry={nodes['Anta-paint_gray_2'].geometry} material={materials['Paint Gray']} position={[-0.456, -1.316, 0]} scale={48.9} />
      </group>

      <group ref={(el) =>{if(el){el.orderIndex=9; refs.current.fermapane=el;}}} position={[2.119, 88.307, -45.865]}> {/* fermapane */}
        <mesh castShadow receiveShadow geometry={nodes['fermapane-Chrome'].geometry} material={materials.Chrome} position={[7.298, -2.613, -1.819]} scale={10.943} />
        <mesh castShadow receiveShadow geometry={nodes['fermapane-Mat53'].geometry} material={materials['Inox Brushed']} position={[-2.443, -0.276, 8.856]} scale={21.105} />
      </group>

      <mesh castShadow receiveShadow geometry={nodes.lama_circolare.geometry} material={materials.Chrome} position={[1.068, 70.716, 1.993]} scale={21} ref={(el) => { if(el) { el.orderIndex = 12; refs.current.lama_circolare = el; } }} /> {/* lama circolare - nuova, ref aggiunto */}

      <group ref={(el) => {if(el){el.orderIndex=8;refs.current.vassoio=el;}}} position={[4.817, 83.137, -0.596]}> {/* vassoio taglio */}
        <mesh castShadow receiveShadow geometry={nodes['vassoio_taglio-Mat53'].geometry} material={materials['Inox Brushed']} position={[1.465, -2.289, 0.065]} scale={48.742} />
        <mesh castShadow receiveShadow geometry={nodes['vassoio_taglio-Chrome'].geometry} material={materials.Chrome} position={[4.571, 11.994, 0.39]} scale={47.71} />
      </group>

    </group>
    
  )
}

useGLTF.preload('/S50-def.opt.glb')