import Buttons from "./components/Buttons";
import Landing from "./components/Landing";
import SplineButtons from "./components/SplineButtons";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Suspense fallback={null}>
        <Canvas shadows flat linear>
          <SplineButtons />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
