import React, { useRef, useMemo, Suspense, useEffect, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
    OrbitControls,
    Environment, 
    ContactShadows, 
    Float, 
    useTexture,
    Center,
    AdaptiveDpr,
    AdaptiveEvents,
    Preload
} from '@react-three/drei';
import * as THREE from 'three';

// ── which food type? ──────────────────────────────────────────────────────────
function getModelKey(name = '') {
    const n = name.toLowerCase();
    if (n.includes('burger'))                                                return 'burger';
    if (n.includes('pizza'))                                                 return 'pizza';
    if (n.includes('sushi'))                                                 return 'sushi';
    if (n.includes('drink') || n.includes('nectar') || n.includes('soda'))  return 'drink';
    if (n.includes('cake') || n.includes('dessert') || n.includes('parfait')) return 'cake';
    return 'generic';
}

// ── Error boundary ─────────────────────────────────────────────────────────────
class CanvasBoundary extends Component {
    state = { err: false };
    static getDerivedStateFromError() { return { err: true }; }
    render() { return this.state.err ? null : this.props.children; }
}

// ─── Main export ───────────────────────────────────────────────────────────────
const Product3D = ({ product }) => {
    const modelKey = useMemo(() => getModelKey(product?.name), [product?.name]);

    return (
        <div className="w-full h-full min-h-[420px] relative overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(0,243,255,0.06) 0%, transparent 70%)' }}
            />
            <Canvas
                shadows
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 5], fov: 32 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2,
                }}
                onCreated={({ gl }) => { gl.outputColorSpace = THREE.SRGBColorSpace; }}
            >
                <AdaptiveDpr pixelated={false} />
                <AdaptiveEvents />

                {/* Lighting */}
                <ambientLight intensity={1.2} />
                <directionalLight position={[4, 8, 4]}   intensity={2.5} castShadow />
                <pointLight      position={[-5, 3, -3]}  intensity={1.5} color="#00f3ff" />
                <pointLight      position={[5, -2, 5]}   intensity={0.7} color="#bc00ff" />

                <CanvasBoundary>
                    <Suspense fallback={<WireSpinner />}>
                        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
                            <Center>
                                <FoodItem modelKey={modelKey} product={product} />
                            </Center>
                        </Float>
                    </Suspense>
                </CanvasBoundary>

                <OrbitControls
                    enableDamping dampingFactor={0.06}
                    enablePan={false}
                    minDistance={2} maxDistance={10}
                    makeDefault
                />
                <ContactShadows position={[0, -2.2, 0]} opacity={0.45} scale={14} blur={2} far={4} />
                <Environment preset="city" />
                <Preload all />
            </Canvas>
        </div>
    );
};

// ── wireframe spinner while textures load ─────────────────────────────────────
const WireSpinner = () => {
    const ref = useRef();
    useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 2; });
    return (
        <mesh ref={ref}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={2} wireframe />
        </mesh>
    );
};

// ─── Dispatcher ───────────────────────────────────────────────────────────────
const FoodItem = ({ modelKey, product }) => {
    const imageUrl = product?.image ||
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=512&auto=format';

    const texture = useTexture(imageUrl);
    useEffect(() => {
        if (texture) {
            texture.colorSpace  = THREE.SRGBColorSpace;
            texture.needsUpdate = true;
        }
    }, [texture]);

    // Every shape gets a slow auto-rotation that OrbitControls can override
    const groupRef = useRef();
    useFrame((_, dt) => {
        if (groupRef.current) groupRef.current.rotation.y += dt * 0.35;
    });

    return (
        <group ref={groupRef}>
            {modelKey === 'burger' && <BurgerModel  texture={texture} />}
            {modelKey === 'pizza'  && <PizzaModel   texture={texture} />}
            {modelKey === 'sushi'  && <SushiModel   texture={texture} />}
            {modelKey === 'drink'  && <DrinkModel   texture={texture} />}
            {modelKey === 'cake'   && <CakeModel    texture={texture} />}
            {modelKey === 'generic' && <GenericModel texture={texture} />}

            {/* Glowing ring at base */}
            <mesh position={[0, -2.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[1.8, 2.1, 64]} />
                <meshBasicMaterial color="#00f3ff" transparent opacity={0.12} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
};

// ─── Burger ───────────────────────────────────────────────────────────────────
// Top bun + real food photo panel on top + coloured layers below
const BurgerModel = ({ texture }) => (
    <group position={[0, -0.4, 0]}>
        {/* Top bun dome – product photo wraps on top face */}
        <mesh castShadow position={[0, 1.4, 0]}>
            <sphereGeometry args={[1.2, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial 
                map={texture} 
                roughness={0.5} 
                metalness={0.05} 
                envMapIntensity={1.5}
            />
        </mesh>
        {/* Sesame seed flat disc on top of dome */}
        <mesh position={[0, 1.65, 0]}>
            <cylinderGeometry args={[0.5, 0.7, 0.05, 32]} />
            <meshStandardMaterial map={texture} roughness={0.4} />
        </mesh>

        {/* lettuce */}
        <mesh castShadow position={[0, 0.78, 0]}>
            <cylinderGeometry args={[1.28, 1.28, 0.2, 48]} />
            <meshStandardMaterial color="#56b356" roughness={0.9} />
        </mesh>
        {/* tomato */}
        <mesh castShadow position={[0, 0.55, 0]}>
            <cylinderGeometry args={[1.15, 1.15, 0.16, 48]} />
            <meshStandardMaterial color="#e53935" roughness={0.7} />
        </mesh>
        {/* cheese */}
        <mesh castShadow position={[0, 0.38, 0]}>
            <cylinderGeometry args={[1.2, 1.2, 0.07, 48]} />
            <meshStandardMaterial color="#f5d27a" roughness={0.6} />
        </mesh>
        {/* patty */}
        <mesh castShadow position={[0, 0.18, 0]}>
            <cylinderGeometry args={[1.08, 1.08, 0.3, 48]} />
            <meshStandardMaterial color="#5d3a1a" roughness={0.85} />
        </mesh>
        {/* bottom bun */}
        <mesh castShadow position={[0, -0.22, 0]}>
            <cylinderGeometry args={[1.15, 1.15, 0.35, 48]} />
            <meshStandardMaterial color="#d4a56a" roughness={0.55} />
        </mesh>
    </group>
);

// ─── Pizza ─────────────────────────────────────────────────────────────────────
// Top face uses real photo, crust ring, cheese layer underneath
const PizzaModel = ({ texture }) => (
    <group position={[0, -0.2, 0]}>
        {/* main pizza disc – TOP face mapped with real photo */}
        <mesh castShadow receiveShadow>
            <cylinderGeometry args={[2, 2, 0.18, 64]} />
            <meshStandardMaterial
                map={texture}
                roughness={0.3}
                metalness={0.0}
                envMapIntensity={1.2}
            />
        </mesh>
        {/* crust ring */}
        <mesh castShadow>
            <torusGeometry args={[2, 0.2, 12, 64]} />
            <meshStandardMaterial color="#c8a26b" roughness={0.65} />
        </mesh>
        {/* cheese highlight */}
        <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[1.75, 1.75, 0.05, 64]} />
            <meshStandardMaterial color="#f5d67a" roughness={0.3} transparent opacity={0.6} />
        </mesh>
    </group>
);

// ─── Sushi ─────────────────────────────────────────────────────────────────────
// Horizontal roll – real image on the round end-cap faces
const SushiModel = ({ texture }) => (
    <group position={[0, -0.2, 0]}>
        {/* rice body */}
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 3.0, 48]} />
            <meshStandardMaterial color="#f0ece0" roughness={0.6} />
        </mesh>
        {/* nori (seaweed) band */}
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.82, 0.82, 1.6, 48]} />
            <meshStandardMaterial color="#1c1c1c" roughness={0.7} />
        </mesh>
        {/* topping disc – front face shows product image */}
        <mesh castShadow position={[0, 0, 1.52]}>
            <cylinderGeometry args={[0.78, 0.78, 0.06, 48]} />
            <meshStandardMaterial map={texture} roughness={0.3} envMapIntensity={1.5} />
        </mesh>
        {/* back face */}
        <mesh castShadow position={[0, 0, -1.52]}>
            <cylinderGeometry args={[0.78, 0.78, 0.06, 48]} />
            <meshStandardMaterial map={texture} roughness={0.3} envMapIntensity={1.5} />
        </mesh>
    </group>
);

// ─── Drink ─────────────────────────────────────────────────────────────────────
// Can with real image wrapped around the side
const DrinkModel = ({ texture }) => (
    <group position={[0, -0.5, 0]}>
        <mesh castShadow>
            <cylinderGeometry args={[0.72, 0.72, 3.0, 64]} />
            <meshStandardMaterial map={texture} roughness={0.12} metalness={0.8} envMapIntensity={2} />
        </mesh>
        {/* top lid */}
        <mesh castShadow position={[0, 1.56, 0]}>
            <cylinderGeometry args={[0.68, 0.72, 0.12, 32]} />
            <meshStandardMaterial color="#b0b0b0" metalness={0.9} roughness={0.08} />
        </mesh>
        {/* pull tab */}
        <mesh castShadow position={[0.28, 1.66, 0]}>
            <boxGeometry args={[0.25, 0.07, 0.45]} />
            <meshStandardMaterial color="#aaaaaa" metalness={0.9} roughness={0.08} />
        </mesh>
    </group>
);

// ─── Cake ──────────────────────────────────────────────────────────────────────
// Layered cake – top surface shows real product photo
const CakeModel = ({ texture }) => (
    <group position={[0, -0.7, 0]}>
        {/* base layer */}
        <mesh castShadow>
            <cylinderGeometry args={[1.5, 1.5, 0.6, 48]} />
            <meshStandardMaterial map={texture} roughness={0.45} />
        </mesh>
        {/* frosting 1 */}
        <mesh position={[0, 0.34, 0]}>
            <cylinderGeometry args={[1.52, 1.52, 0.1, 48]} />
            <meshStandardMaterial color="#fff0f3" roughness={0.2} />
        </mesh>
        {/* mid layer */}
        <mesh castShadow position={[0, 0.76, 0]}>
            <cylinderGeometry args={[1.35, 1.35, 0.52, 48]} />
            <meshStandardMaterial color="#f8d7da" roughness={0.4} />
        </mesh>
        {/* frosting 2 */}
        <mesh position={[0, 1.06, 0]}>
            <cylinderGeometry args={[1.37, 1.37, 0.1, 48]} />
            <meshStandardMaterial color="#ffe4e1" roughness={0.2} />
        </mesh>
        {/* top layer – real image on top face */}
        <mesh castShadow position={[0, 1.42, 0]}>
            <cylinderGeometry args={[1.18, 1.18, 0.44, 48]} />
            <meshStandardMaterial map={texture} roughness={0.3} envMapIntensity={1.5} />
        </mesh>
        {/* cherry */}
        <mesh castShadow position={[0, 1.74, 0]}>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshStandardMaterial color="#c0392b" roughness={0.35} metalness={0.1} />
        </mesh>
    </group>
);

// ─── Generic Plate ─────────────────────────────────────────────────────────────
// The real product photo wraps around the top of the food portion
const GenericModel = ({ texture }) => (
    <group position={[0, -0.3, 0]}>
        {/* main food body – real image on side + top */}
        <mesh castShadow>
            <cylinderGeometry args={[1.55, 1.35, 0.65, 48]} />
            <meshStandardMaterial map={texture} roughness={0.4} metalness={0.05} envMapIntensity={1.5} />
        </mesh>
        {/* plate rim */}
        <mesh receiveShadow position={[0, -0.4, 0]}>
            <cylinderGeometry args={[1.85, 1.85, 0.1, 48]} />
            <meshStandardMaterial color="#e8e8e8" roughness={0.2} metalness={0.35} />
        </mesh>
    </group>
);

export default Product3D;
