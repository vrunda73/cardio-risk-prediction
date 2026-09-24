import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

function HeartMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { mouse } = useThree();

  const heartShape = new THREE.Shape();
  heartShape.moveTo(0, 0.4);
  heartShape.bezierCurveTo(0, 0.6, -0.3, 0.8, -0.5, 0.6);
  heartShape.bezierCurveTo(-0.8, 0.4, -0.8, 0, -0.5, -0.2);
  heartShape.bezierCurveTo(-0.3, -0.4, 0, -0.5, 0, -0.7);
  heartShape.bezierCurveTo(0, -0.5, 0.3, -0.4, 0.5, -0.2);
  heartShape.bezierCurveTo(0.8, 0, 0.8, 0.4, 0.5, 0.6);
  heartShape.bezierCurveTo(0.3, 0.8, 0, 0.6, 0, 0.4);

  const geometry = new THREE.ExtrudeGeometry(heartShape, { depth: 0.3, bevelEnabled: true, bevelSegments: 8, steps: 2, bevelSize: 0.08, bevelThickness: 0.08 });
  geometry.center();

  useFrame(({ clock }) => {
    if (!meshRef.current || !glowRef.current) return;
    const time = clock.getElapsedTime();
    const beat = 1 + Math.sin(time * 2) * 0.03 + Math.sin(time * 4) * 0.01;
    meshRef.current.scale.setScalar(beat);
    glowRef.current.scale.setScalar(beat * 1.15);
    meshRef.current.rotation.y = time * 0.3 + mouse.x * 0.3;
    meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1 + mouse.y * -0.15;
    glowRef.current.rotation.copy(meshRef.current.rotation);
    (glowRef.current.material as THREE.MeshStandardMaterial).opacity = 0.08 + Math.sin(time * 2) * 0.04;
  });

  return <group>
    <mesh ref={glowRef} geometry={geometry}><meshStandardMaterial color="#22d3ee" transparent opacity={0.08} side={THREE.BackSide} /></mesh>
    <mesh ref={meshRef} geometry={geometry} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}><meshStandardMaterial color={hovered ? '#38bdf8' : '#1d4ed8'} metalness={0.3} roughness={0.2} emissive={hovered ? '#0ea5e9' : '#1e40af'} emissiveIntensity={0.4} /></mesh>
  </group>;
}

function OrbitalRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (ring1.current) { ring1.current.rotation.x = time * 0.4; ring1.current.rotation.y = time * 0.2; }
    if (ring2.current) { ring2.current.rotation.x = -time * 0.3; ring2.current.rotation.z = time * 0.25; }
  });
  return <><mesh ref={ring1}><torusGeometry args={[1.4, 0.012, 16, 100]} /><meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.5} transparent opacity={0.4} /></mesh><mesh ref={ring2}><torusGeometry args={[1.8, 0.008, 16, 100]} /><meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={0.5} transparent opacity={0.25} /></mesh></>;
}

function FloatingParticles() {
  const positions = new Float32Array(60 * 3);
  for (let index = 0; index < positions.length; index++) positions[index] = (Math.random() - 0.5) * 8;
  const pointsRef = useRef<THREE.Points>(null);
  useFrame(({ clock }) => { if (pointsRef.current) pointsRef.current.rotation.y = clock.getElapsedTime() * 0.04; });
  return <points ref={pointsRef}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color="#22d3ee" size={0.03} transparent opacity={0.5} /></points>;
}

function FallbackHeart() { return <div className="flex items-center justify-center w-full h-full"><motion.div animate={{ scale: [1, 1.08, 1, 1.05, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} className="text-[120px] drop-shadow-[0_0_30px_rgba(34,211,238,0.5)] select-none" aria-hidden="true">♥</motion.div></div>; }

interface Heart3DProps { className?: string; height?: number | string; reduced?: boolean; }

export default function Heart3D({ className = '', height = 500, reduced = false }: Heart3DProps) {
  const [webglSupported, setWebglSupported] = useState(true);
  useEffect(() => { try { const canvas = document.createElement('canvas'); if (!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))) setWebglSupported(false); } catch { setWebglSupported(false); } }, []);
  if (!webglSupported) return <div className={className} style={{ height }}><FallbackHeart /></div>;
  return <div className={className} style={{ height }}><Canvas camera={{ position: [0, 0, 4], fov: 50 }} gl={{ antialias: true, alpha: true }} aria-hidden="true"><ambientLight intensity={0.4} /><directionalLight position={[5, 5, 5]} intensity={1} color="#93c5fd" /><directionalLight position={[-5, -3, -5]} intensity={0.4} color="#5eead4" /><pointLight position={[0, 0, 3]} intensity={0.8} color="#22d3ee" /><Suspense fallback={null}><Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}><HeartMesh /></Float><OrbitalRings />{!reduced && <FloatingParticles />}{!reduced && <Stars radius={20} depth={10} count={200} factor={2} fade speed={0.5} />}</Suspense></Canvas></div>;
}
