import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function BackgroundCastle(props) {
  const { scene } = useGLTF("/models/GLB_FILES/white_mesh.glb");
  return <primitive object={scene} {...props} />;
}

function BackgroundPoslopje(props) {
  const { scene } = useGLTF("/models/GLB_FILES/poslopje.glb");
  return <primitive object={scene} {...props} />;
}

export default function BackgroundScene() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#000",
      }}
    >
      <Canvas camera={{ position: [0,0, 5], fov: 45 }}>
        <color attach="background" args={["#111"]} />

        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 10]} intensity={1.0} />

        {/* premakni in skaliraj modela narazen */}
        <BackgroundCastle scale={1} position={[0, 0, 0]} />
        <BackgroundPoslopje scale={0.05} position={[0, -0.2, -2]} rotation={[0.2, 0, 0]} />

        <OrbitControls enableDamping={true} enableRotate={false} enableZoom={false}/>
      </Canvas>
    </div>
  );
}

// preload
useGLTF.preload("/models/GLB_FILES/white_mesh.glb");
useGLTF.preload("/models/GLB_FILES/poslopje.glb");
