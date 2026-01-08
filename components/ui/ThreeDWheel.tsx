import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeDWheelProps {
  depth: string; // e.g., "52mm"
  name: string;
}

// Procedural Wheel Component
const WheelModel: React.FC<{ depthVal: number }> = ({ depthVal }) => {
  const wheelGroup = useRef<THREE.Group>(null);
  
  // Slow rotation animation
  useFrame((state, delta) => {
    if (wheelGroup.current) {
      wheelGroup.current.rotation.y += delta * 0.2;
    }
  });

  // Generate Spokes
  const spokes = useMemo(() => {
    const count = 24;
    const items = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      items.push(
        <mesh 
          key={i} 
          rotation={[0, 0, angle]} 
          position={[0, 0, 0]}
        >
          <cylinderGeometry args={[0.02, 0.02, 2.8, 8]} />
          <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
        </mesh>
      );
    }
    return items;
  }, []);

  // Calculate rim visual thickness based on depth prop (e.g. 52mm -> deeper rim)
  // Base tube radius 0.2, add scaled depth
  const rimTube = 0.2 + (depthVal / 150); 

  return (
    <group ref={wheelGroup}>
      {/* RIM */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, rimTube, 32, 100]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          roughness={0.2} 
          metalness={0.8}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* TIRE */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5 + rimTube + 0.1, 0.12, 16, 100]} />
        <meshStandardMaterial color="#050505" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* HUB */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 32]} />
        <meshStandardMaterial color="#333" metalness={1} roughness={0.3} />
      </mesh>
      
      {/* SPOKES */}
      <group rotation={[0, 0, 0]}>
        {spokes}
      </group>

      {/* VALVE ACCENT */}
      <mesh position={[0, 1.3, 0]} rotation={[0, 0, 0]}>
         <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
         <meshStandardMaterial color="#8b0000" emissive="#8b0000" emissiveIntensity={2} />
      </mesh>
    </group>
  );
};

export const ThreeDWheel: React.FC<ThreeDWheelProps> = ({ depth, name }) => {
  // Extract number from string (e.g., "52mm" -> 52)
  const depthValue = parseInt(depth) || 50;

  return (
    <div className="w-full h-[500px] relative cursor-grab active:cursor-grabbing">
      {/* 3D Label Overlay */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-orbitron text-green-400 tracking-widest">3D LIVE RENDER</span>
        </div>
      </div>

      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <fog attach="fog" args={['#000000', 5, 15]} />
        
        <Environment preset="city" />
        
        <group position={[0, -0.2, 0]}>
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
            <WheelModel depthVal={depthValue} />
          </Float>
          
          {/* Floor Shadow */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry args={[10, 10]} />
            <meshBasicMaterial color="#000" transparent opacity={0.8} />
          </mesh>
          
          {/* Tech Grid Floor */}
          <gridHelper args={[20, 20, 0x8b0000, 0x111111]} position={[0, -2, 0]} />
          
          {/* In-Scene Label */}
          <Html position={[2, 1.5, 0]} distanceFactor={6} transform>
             <div className="bg-black/80 backdrop-blur-md border border-red-900/50 p-3 rounded text-xs font-rajdhani text-white w-40 select-none pointer-events-none transform skew-x-[-10deg]">
                <div className="font-bold text-red-500 border-b border-white/10 mb-1 pb-1 flex justify-between">
                    <span>ANALYSE</span>
                    <span className="animate-pulse">●</span>
                </div>
                <div className="flex justify-between text-gray-400">
                    <span>Depth:</span>
                    <span className="text-white">{depth}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                    <span>Material:</span>
                    <span className="text-white">T1100</span>
                </div>
             </div>
          </Html>
        </group>

        <OrbitControls 
            enablePan={false} 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 1.5}
            minDistance={3}
            maxDistance={8}
            autoRotate
            autoRotateSpeed={1.5}
        />
      </Canvas>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-gray-600 font-orbitron tracking-[0.2em] pointer-events-none">
        DRAG TO ROTATE
      </div>
    </div>
  );
};