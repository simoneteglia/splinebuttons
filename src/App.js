import Buttons from "./components/Buttons";
import Landing from "./components/Landing";
import SplineButtons from "./components/SplineButtons";

import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function App() {
  const controlsRef = useRef();
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Suspense fallback={null}>
        <Canvas shadows flat linear>
          <OrbitControls ref={controlsRef} />
          <SplineButtons controlsRef={controlsRef} />
          {/* <Landing /> */}
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
