import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Environment, OrbitControls } from "@react-three/drei";

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function Island() {
  const gltf = useLoader(GLTFLoader, "/assets/island/island.gltf");
  return (
    <Suspense fallback={null}>
      <mesh
        castShadow
        receiveShadow
        position={[0, -30, 200]}
        onClick={() => console.log("click")}
      >
        <primitive object={gltf.scene} />
      </mesh>
    </Suspense>
  );
}

function Landing() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <OrbitControls />
        <directionalLight
          color="white"
          position={[10, 10, 0]}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        {/* <Environment preset="sunset" background /> */}
        <Island />
      </Suspense>
    </Canvas>
  );
}

export default Landing;
