import React, { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import useSpline from "@splinetool/r3f-spline";
import {
  OrthographicCamera,
  Html,
  Plane,
  useGLTF,
  ContactShadows,
  useTexture,
} from "@react-three/drei";

import "../App.css";
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";

const TWEEN = require("@tweenjs/tween.js");

export default function SplineButtons({ controlsRef, ...props }) {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [square, setSquare] = useState(false);
  const [triangle, setTriangle] = useState(false);
  const [circle, setCircle] = useState(false);
  const [cross, setCross] = useState(false);
  const [mouseX, setMouseX] = useState(window.innerHeight / 2);
  const [mouseY, setMouseY] = useState(window.innerWidth / 2);
  const [displayWhoAmI, setDisplayWhoAmI] = useState(false);
  const [displayContactMe, setDisplayContactMe] = useState(false);

  const { nodes, materials } = useSpline(
    "https://prod.spline.design/M0UU4nLHTsR9z4CY/scene.splinecode"
  );

  useEffect(() => {
    window.addEventListener("resize", (e) => handleResize(e));
    window.addEventListener("mousemove", (e) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    });
  }, []);

  function handleResize(e) {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    cameraRef.current.updateProjectionMatrix();
  }

  useFrame((e) => {
    TWEEN.update();
    coinRef.current.position.y = 50 + Math.sin(e.clock.elapsedTime * 2) * 4;
    heartRef.current.position.y = 50 - Math.sin(e.clock.elapsedTime * 3) * 5;
    starRef.current.position.y = 50 - Math.sin(e.clock.elapsedTime * 3) * 6;
    ballRef.current.position.y = 50 + Math.sin(e.clock.elapsedTime * 2) * 4;
    heartRef.current.rotation.y += 0.01;
    starRef.current.rotation.y += 0.01;
    coinRef.current.rotation.y += 0.01;
    coinRef.current.rotation.x += 0.01;
    ballRef.current.rotation.y += 0.005;
    ballRef.current.rotation.x += 0.005;
  });

  const squareMeshRef = useRef();
  const triangleMeshRef = useRef();
  const circleMeshref = useRef();

  const squareRef = useRef();
  const triangleRef = useRef();
  const circleRef = useRef();
  const crossRef = useRef();

  const buttonsRef = useRef();
  const planeMaterialRef = useRef();
  const cameraRef = useRef();
  const coinRef = useRef();
  const heartRef = useRef();
  const starRef = useRef();
  const ballRef = useRef();

  function handleOnClickSquare() {
    setSquare(!square);
    setTriangle(false);
    setCircle(false);
    setCross(false);

    const tweenDown = new TWEEN.Tween(squareMeshRef.current.position)
      .to({ y: -15.0 }, 500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onComplete(() => {
        const tweenUp = new TWEEN.Tween(squareMeshRef.current.position)
          .to({ y: -8.85 }, 500)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start();
      })
      .start();

    // const tweenDownIcon = new TWEEN.Tween(squareRef.current.position)
    //   .to({ y: 11.2 }, 500)
    //   .easing(TWEEN.Easing.Quadratic.InOut)
    //   .onComplete(() => {
    //     const tweenUpIcon = new TWEEN.Tween(squareRef.current.position)
    //       .to({ y: 17.35 }, 500)
    //       .easing(TWEEN.Easing.Quadratic.InOut)
    //       .start();
    //   })
    //   .start();

    const tweenRotation = new TWEEN.Tween(buttonsRef.current.rotation)
      .to({ y: !square ? Math.PI / 2 : 0 }, 500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();

    var zoom = {
      value: cameraRef.current.zoom,
    };
    var zoomTarget = {
      value: zoom.value === 5.5 ? 2 : 5.5,
    };

    const tweenZoom = new TWEEN.Tween(zoom)
      .to({ value: zoomTarget.value }, 500)
      .onUpdate(function () {
        cameraRef.current.zoom = zoom.value;
        cameraRef.current.updateProjectionMatrix();
      })
      .easing(TWEEN.Easing.Quadratic.InOut);

    if (circle || triangle || cross) {
    } else tweenZoom.start();

    const tweenPosition = new TWEEN.Tween(buttonsRef.current.position)
      .to(
        {
          x: !square ? -90 : 0,
          z: !square ? 120 : 0,
        },
        500
      )
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
  }

  function handleOnClickTriangle() {
    setTriangle(!triangle);
    setSquare(false);
    setCircle(false);
    setCross(false);

    const tweenDown = new TWEEN.Tween(triangleMeshRef.current.position)
      .to({ y: -15.0 }, 500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onComplete(() => {
        const tweenUp = new TWEEN.Tween(triangleMeshRef.current.position)
          .to({ y: -8.85 }, 500)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start();
      })
      .start();

    // const tweenDownIcon = new TWEEN.Tween(triangleRef.current.position)
    //   .to({ y: 11.2 }, 500)
    //   .easing(TWEEN.Easing.Quadratic.InOut)
    //   .onComplete(() => {
    //     const tweenUpIcon = new TWEEN.Tween(triangleRef.current.position)
    //       .to({ y: 17.35 }, 500)
    //       .easing(TWEEN.Easing.Quadratic.InOut)
    //       .start();
    //   })
    //   .start();

    const tweenRotation = new TWEEN.Tween(buttonsRef.current.rotation)
      .to({ y: !triangle ? -Math.PI : 0 }, 500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();

    var zoom = {
      value: cameraRef.current.zoom,
    };
    var zoomTarget = {
      value: zoom.value === 5.5 ? 2 : 5.5,
    };

    const tweenZoom = new TWEEN.Tween(zoom)
      .to({ value: zoomTarget.value }, 500)
      .onUpdate(function () {
        cameraRef.current.zoom = zoom.value;
        cameraRef.current.updateProjectionMatrix();
      })
      .easing(TWEEN.Easing.Quadratic.InOut);

    if (square || circle || cross) {
    } else tweenZoom.start();

    const tweenPosition = new TWEEN.Tween(buttonsRef.current.position)
      .to(
        {
          x: !triangle ? -100 : 0,
          z: !triangle ? 100 : 0,
        },
        500
      )
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
  }

  function handleOnClickCross() {
    setCross(!cross);
    setTriangle(false);
    setSquare(false);
    setCircle(false);
    const tweenDown = new TWEEN.Tween(crossRef.current.position)
      .to({ y: 1.84 }, 500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onComplete(() => {
        const tweenUp = new TWEEN.Tween(crossRef.current.position)
          .to({ y: 7.99 }, 500)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start();
      })
      .start();

    const tweenRotation = new TWEEN.Tween(buttonsRef.current.rotation)
      .to({ y: 0 }, 500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();

    var zoom = {
      value: cameraRef.current.zoom,
    };
    var zoomTarget = {
      value: zoom.value === 5.5 ? 2 : 5.5,
    };

    const tweenZoom = new TWEEN.Tween(zoom)
      .to({ value: zoomTarget.value }, 500)
      .onUpdate(function () {
        cameraRef.current.zoom = zoom.value;
        cameraRef.current.updateProjectionMatrix();
      })
      .easing(TWEEN.Easing.Quadratic.InOut);

    if (circle || triangle || square) {
    } else tweenZoom.start();

    const tweenPosition = new TWEEN.Tween(buttonsRef.current.position)
      .to(
        {
          x: !cross ? -100 : 0,
          z: !cross ? 100 : 0,
        },
        500
      )
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
  }

  function handleOnClickCircle() {
    console.log("circle");
    setCircle(!circle);
    setSquare(false);
    setTriangle(false);
    setCross(false);

    const tweenDown = new TWEEN.Tween(circleMeshref.current.position)
      .to({ y: -15.0 }, 500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onComplete(() => {
        const tweenUp = new TWEEN.Tween(circleMeshref.current.position)
          .to({ y: -8.85 }, 500)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start();
      })
      .start();

    // const tweenDownIcon = new TWEEN.Tween(circleRef.current.position)
    //   .to({ y: 11.2 }, 500)
    //   .easing(TWEEN.Easing.Quadratic.InOut)
    //   .onComplete(() => {
    //     const tweenUpIcon = new TWEEN.Tween(circleRef.current.position)
    //       .to({ y: 17.35 }, 500)
    //       .easing(TWEEN.Easing.Quadratic.InOut)
    //       .start();
    //   })
    //   .start();

    const tweenAnimateRotationCoin = new TWEEN.Tween(coinRef.current.rotation)
      .to(
        {
          y: coinRef.current.rotation.y === 0 ? 5 * Math.PI : 0,
        },
        500
      )
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();

    const tweenAnimatePositionCoin = new TWEEN.Tween(coinRef.current.position)
      .to({ y: 60 }, 500)

      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();

    const tweenRotation = new TWEEN.Tween(buttonsRef.current.rotation)
      .to({ y: !circle ? -Math.PI / 2 : 0 }, 500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();

    var zoom = {
      value: cameraRef.current.zoom,
    };
    var zoomTarget = {
      value: zoom.value === 5.5 ? 2 : 5.5,
    };

    const tweenZoom = new TWEEN.Tween(zoom)
      .to({ value: zoomTarget.value }, 500)
      .onUpdate(function () {
        cameraRef.current.zoom = zoom.value;
        cameraRef.current.updateProjectionMatrix();
      })
      .easing(TWEEN.Easing.Quadratic.InOut);

    if (square || triangle || cross) {
    } else tweenZoom.start();

    const tweenPosition = new TWEEN.Tween(buttonsRef.current.position)
      .to(
        {
          x: !circle ? -90 : 0,
          z: !circle ? 120 : 0,
        },
        500
      )
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
  }

  function handleOnPointerEnterSquare() {
    setDisplayWhoAmI(true);
  }

  function handleOnPointerLeaveSquare() {
    setDisplayWhoAmI(false);
  }
  function handleOnPointerEnterTriangle() {
    setDisplayContactMe(true);
  }

  function handleOnPointerLeaveTriangle() {
    setDisplayContactMe(false);
  }

  function Coin(props) {
    const { scene } = useGLTF(
      "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/coin/model.gltf"
    );
    return <primitive object={scene} {...props} ref={coinRef} />;
  }

  function Heart(props) {
    const gltf = useGLTF(
      "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/heart/model.gltf"
    );
    return <primitive object={gltf.scene} {...props} ref={heartRef} />;
  }

  function Star(props) {
    const { scene } = useGLTF(
      "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/star/model.gltf"
    );
    return <primitive object={scene} {...props} ref={starRef} />;
  }

  function Ball(props) {
    const { scene } = useGLTF(
      "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/beach-ball/model.gltf"
    );
    return <primitive object={scene} {...props} ref={ballRef} />;
  }

  return (
    <>
      <Html fullscreen style={{ position: "relative" }}>
        <div
          className="whoami-panel"
          style={{
            fontFamily: "Bugaki",
            fontSize: "30px",
            position: "absolute",
            right: square ? 50 : -2000,
            top: 20,
            transition: "all 0.5s ease-in-out",
            maxWidth: "25ch",
            color: "cornsilk",
          }}
        >
          <h1>SIMONE TEGLIA</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
            labore obcaecati blanditiis similique iste odio exercitationem sunt
            eligendi incidunt, dicta harum nisi rerum, aliquid tempora.
          </p>
        </div>
        <div
          className="contact-panel"
          style={{
            fontFamily: "Bugaki",
            fontSize: "30px",
            position: "absolute",
            right: triangle ? 50 : -2000,
            top: 20,
            transition: "all 0.5s ease-in-out",
            maxWidth: "25ch",
            color: "cornsilk",
          }}
        >
          <h1>CONTACT ME</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
            labore obcaecati blanditiis similique iste odio exercitationem sunt
            eligendi incidunt, dicta harum nisi rerum, aliquid tempora.
          </p>
        </div>
        <div
          style={{
            fontSize: "50px",
            color: "cornsilk",
            fontFamily: "Bugaki",
            position: "absolute",
            opacity: displayWhoAmI && !square ? "1" : "0",
            top: mouseY - 50,
            left: mouseX,
            pointerEvents: "none",
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <h1>WHOAMI</h1>
        </div>
        <div
          style={{
            fontSize: "50px",
            color: "cornsilk",
            fontFamily: "Bugaki",
            position: "absolute",
            opacity: displayContactMe && !triangle ? "1" : "0",
            top: mouseY - 50,
            left: mouseX,
            pointerEvents: "none",
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <h1>CONTACT ME</h1>
        </div>
      </Html>
      <group {...props} dispose={null}>
        <Plane
          args={[1500, 1500]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -50, 0]}
          receiveShadow
        >
          <meshPhongMaterial
            ref={planeMaterialRef}
            color={"rgb(101, 105, 152)"}
          />
        </Plane>
        <pointLight
          name="Point Light 2"
          castShadow
          intensity={1.4}
          distance={2000}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={100}
          shadow-camera-far={2500}
          color="#00bdfe"
          position={[0, 257.06, 303.73]}
        />
        <pointLight
          name="Point Light"
          castShadow
          intensity={2.3}
          distance={2000}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={100}
          shadow-camera-far={2500}
          color="#fe0000"
          position={[211.14, 196.91, -271.35]}
        />
        <directionalLight
          name="Directional Light 2"
          castShadow
          intensity={0.3}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={1}
          shadow-camera-far={3806.911}
          shadow-camera-left={-1434.683}
          shadow-camera-right={1434.683}
          shadow-camera-top={1434.683}
          shadow-camera-bottom={-1434.683}
          position={[-198.2, 531.64, 251.2]}
          scale={[1.9, 1, 1]}
        />
        <group name="Buttons" ref={buttonsRef} position={[0, 0, 0]}>
          <mesh
            name="Cube 2"
            geometry={nodes["Cube 2"].geometry}
            material={materials.Key}
            castShadow
            receiveShadow
            position={[0, -24.62, 0]}
          />
          <mesh
            name="Cube"
            geometry={nodes.Cube.geometry}
            material={materials.Key}
            castShadow
            receiveShadow
            position={[0, -39.03, 0]}
          />
          <group
            name="Square"
            position={[50, 0.65, 50]}
            onClick={handleOnClickSquare}
            onPointerEnter={handleOnPointerEnterSquare}
            onPointerLeave={handleOnPointerLeaveSquare}
          >
            {/* <mesh
              ref={squareRef}
              name="Ellipse 3"
              geometry={nodes["Ellipse 3"].geometry}
              material={materials["Ellipse 3 Material"]}
              castShadow
              receiveShadow
              position={[0, 17.35, 0]}
              rotation={[-Math.PI / 2, 0, Math.PI / 4]}
            /> */}
            <Star scale={40} />
            <mesh
              ref={squareMeshRef}
              name="Cube 21"
              geometry={nodes["Cube 21"].geometry}
              material={materials.Key}
              castShadow
              receiveShadow
              position={[0, -8.85, 0]}
            />
          </group>
          <group
            ref={crossRef}
            name="Cross"
            position={[50, 7.99, -50]}
            onClick={handleOnClickCross}
          >
            {/* <group
              name="Group 2"
              position={[0, 9.85, 0]}
              rotation={[0, Math.PI / 4, 0]}
            >
              <mesh
                name="Rectangle 2"
                geometry={nodes["Rectangle 2"].geometry}
                material={materials["Rectangle 2 Material"]}
                castShadow
                receiveShadow
                rotation={[-Math.PI / 2, 0, Math.PI / 2]}
              />
              <mesh
                name="Rectangle"
                geometry={nodes.Rectangle.geometry}
                material={materials["Rectangle Material"]}
                castShadow
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
              />
            </group> */}
            <Ball scale={20} />
            <mesh
              name="Cube 3"
              geometry={nodes["Cube 3"].geometry}
              material={materials.Key}
              castShadow
              receiveShadow
              position={[0, -16.35, 0]}
            />
          </group>
          <group
            name="Circle"
            position={[-50, 0.65, -50]}
            onClick={handleOnClickCircle}
          >
            {/* <mesh
              ref={circleRef}
              name="Ellipse"
              geometry={nodes.Ellipse.geometry}
              material={materials["Ellipse Material"]}
              castShadow
              receiveShadow
              position={[0, 17.35, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            /> */}
            <Coin scale={40} />
            <mesh
              ref={circleMeshref}
              name="Cube 31"
              geometry={nodes["Cube 31"].geometry}
              material={materials.Key}
              castShadow
              receiveShadow
              position={[0, -8.85, 0]}
            />
          </group>
          <group
            name="Triangle"
            position={[-50, 0.65, 50]}
            onClick={handleOnClickTriangle}
            onPointerEnter={handleOnPointerEnterTriangle}
            onPointerLeave={handleOnPointerLeaveTriangle}
          >
            <mesh
              ref={triangleMeshRef}
              name="Cube1"
              geometry={nodes.Cube1.geometry}
              material={materials.Key}
              castShadow
              receiveShadow
              position={[0, -8.85, 0]}
            />
            <Heart scale={40} />
            {/* <mesh
              ref={triangleRef}
              name="Ellipse 2"
              geometry={nodes["Ellipse 2"].geometry}
              material={materials["Ellipse 2 Material"]}
              castShadow
              receiveShadow
              position={[0, 17.35, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            /> */}
          </group>
        </group>
        <directionalLight
          name="Directional Light"
          castShadow
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={1}
          shadow-camera-far={2500}
          shadow-camera-left={-1250}
          shadow-camera-right={1250}
          shadow-camera-top={1250}
          shadow-camera-bottom={-1250}
          position={[200, 300, 300]}
        />
        <OrthographicCamera
          ref={cameraRef}
          name="Personal Camera"
          makeDefault={true}
          zoom={2}
          far={100000}
          near={-100000}
          position={[300, 300, 300]}
        />
        <hemisphereLight
          name="Default Ambient Light"
          intensity={0.75}
          color="#eaeaea"
          position={[0, 1, 0]}
        />
      </group>
    </>
  );
}
