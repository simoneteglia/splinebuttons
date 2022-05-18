import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Center,
  Environment,
  OrbitControls,
  OrthographicCamera,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";

const TWEEN = require("@tweenjs/tween.js");

var buttonPosition = { x: 0, y: 0.5, z: 0 };

function Buttons() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas>
        <OrbitControls enabled={true} />
        <OrthographicCamera
          makeDefault
          position={new THREE.Vector3(-30, 30, 30)}
          zoom={70}
        />
        <Suspense fallback={null}>
          <color args={["#0609aa"]} attach="background" />
          <ambientLight intensity={0.2} />
          <directionalLight position={[-10, 10, 0]} />
          <Center>
            <RoundedBox args={[5, 1, 5]} radius={0.4} smoothness={10}>
              <meshPhongMaterial color="darkSlateGrey" />
            </RoundedBox>
            <RoundedBox
              args={[3, 1, 3]}
              radius={0.5}
              smoothness={10}
              position={[buttonPosition.x, buttonPosition.y, buttonPosition.z]}
              onClick={() => {
                console.log("click");
                const tween = new TWEEN.Tween(buttonPosition)
                  .to(
                    {
                      x: 0,
                      y: 0.3,
                      z: 0,
                    },
                    1000
                  )
                  .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                  .onUpdate(() => {})
                  .onComplete(() => console.log("end"))
                  .start();
              }}
            >
              <meshPhongMaterial color="red" />
            </RoundedBox>
          </Center>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Buttons;
