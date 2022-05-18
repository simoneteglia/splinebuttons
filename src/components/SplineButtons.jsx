import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import useSpline from "@splinetool/r3f-spline";
import { OrthographicCamera, Html } from "@react-three/drei";
import { useSpring, animated } from "react-spring";
const TWEEN = require("@tweenjs/tween.js");

export default function SplineButtons({ ...props }) {
  const { nodes, materials } = useSpline(
    "https://prod.spline.design/M0UU4nLHTsR9z4CY/scene.splinecode"
  );

  useFrame(() => TWEEN.update());

  const squareMeshRef = useRef();
  const triangleMeshRef = useRef();
  const circleMeshref = useRef();
  const crossMeshRef = useRef();

  const squareRef = useRef();
  const triangleRef = useRef();
  const circleRef = useRef();
  const crossRef = useRef();

  const buttonsRef = useRef();

  function handleOnClickSquare() {
    console.log("square");
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

    const tweenDownIcon = new TWEEN.Tween(squareRef.current.position)
      .to({ y: 11.2 }, 500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onComplete(() => {
        const tweenUpIcon = new TWEEN.Tween(squareRef.current.position)
          .to({ y: 17.35 }, 500)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start();
      })
      .start();

    const buttonTween = new TWEEN.Tween(buttonsRef.current.position)
      .to(
        {
          x: buttonsRef.current.position.x == 0 ? -100 : 0,
          z: buttonsRef.current.position.z == 0 ? 100 : 0,
        },
        500
      )
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
  }

  function handleOnClickTriangle() {
    console.log("triangle");
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

    const tweenDownIcon = new TWEEN.Tween(triangleRef.current.position)
      .to({ y: 11.2 }, 500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onComplete(() => {
        const tweenUpIcon = new TWEEN.Tween(triangleRef.current.position)
          .to({ y: 17.35 }, 500)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start();
      })
      .start();
  }

  function handleOnClickCross() {
    console.log("cross");
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
  }

  function handleOnClickCircle() {
    console.log("circle");
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

    const tweenDownIcon = new TWEEN.Tween(circleRef.current.position)
      .to({ y: 11.2 }, 500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onComplete(() => {
        const tweenUpIcon = new TWEEN.Tween(circleRef.current.position)
          .to({ y: 17.35 }, 500)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start();
      })
      .start();
  }

  return (
    <>
      {/* <Html position={[100, 200, -100]}>
        <div style={{ height: "90vh", width: "25ch", backgroundColor: "#fff" }}>
          <h1>SIMONE TEGLIA 2</h1>
        </div>
      </Html> */}
      <color attach="background" args={["#6a7485"]} />
      <group {...props} dispose={null}>
        <mesh
          name="Plane"
          geometry={nodes.Plane.geometry}
          material={materials["Plane Material"]}
          receiveShadow
          position={[629.5, -109.35, 536.5]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
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
          >
            <mesh
              ref={squareRef}
              name="Ellipse 3"
              geometry={nodes["Ellipse 3"].geometry}
              material={materials["Ellipse 3 Material"]}
              castShadow
              receiveShadow
              position={[0, 17.35, 0]}
              rotation={[-Math.PI / 2, 0, Math.PI / 4]}
            />
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
            <group
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
            </group>
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
            <mesh
              ref={circleRef}
              name="Ellipse"
              geometry={nodes.Ellipse.geometry}
              material={materials["Ellipse Material"]}
              castShadow
              receiveShadow
              position={[0, 17.35, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
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
          >
            <mesh
              ref={triangleRef}
              name="Ellipse 2"
              geometry={nodes["Ellipse 2"].geometry}
              material={materials["Ellipse 2 Material"]}
              castShadow
              receiveShadow
              position={[0, 17.35, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            <mesh
              ref={triangleMeshRef}
              name="Cube1"
              geometry={nodes.Cube1.geometry}
              material={materials.Key}
              castShadow
              receiveShadow
              position={[0, -8.85, 0]}
            />
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
          name="Personal Camera"
          makeDefault={true}
          zoom={8}
          left={window.innerWidth * -2}
          right={window.innerWidth * 2}
          top={window.innerHeight * 2}
          bottom={window.innerHeight * -2}
          far={100000}
          near={-100000}
          position={[1000, 1000, 1000]}
          rotation={[-Math.PI / 4, 0.62, Math.PI / 6]}
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
