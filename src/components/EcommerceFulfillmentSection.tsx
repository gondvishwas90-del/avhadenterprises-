"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "gsap";
import { Check, Loader2, Star, Truck } from "lucide-react";

interface StepData {
  number: string;
  title: string;
  subtitle: string;
}

export default function EcommerceFulfillmentSection() {
  const cardCanvasRef = useRef<HTMLCanvasElement>(null);
  const successCanvasRef = useRef<HTMLCanvasElement>(null);
  const packingCanvasRef = useRef<HTMLCanvasElement>(null);

  const [activeStep, setActiveStep] = useState<number>(1);
  const [hudProgress, setHudProgress] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeColor, setActiveColor] = useState<number>(0);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [assetsLoaded, setAssetsLoaded] = useState<boolean>(false);

  const steps: StepData[] = [
    { number: "01", title: "INITIALIZATION", subtitle: "Intent Trigger" },
    { number: "02", title: "MANAGEMENT ENGINE", subtitle: "Automated Fulfillment" },
    { number: "03", title: "THE ARRIVAL", subtitle: "Absolute Delivery" },
    { number: "04", title: "SUCCESSFUL", subtitle: "Fulfillment Finalized" }
  ];

  const stages = [
    "Order Confirmed",
    "Quality Check",
    "Wrapping",
    "Packing",
    "Ready to Ship"
  ];

  // Step 2 Circular Progress & Stage Checklist Simulator
  useEffect(() => {
    if (activeStep === 2) {
      setHudProgress(0);
      setActiveStageIndex(0);
      const progressObj = { value: 0 };
      
      gsap.to(progressObj, {
        value: 100,
        duration: 2.2,
        ease: "none",
        onUpdate: () => {
          const currentVal = Math.floor(progressObj.value);
          setHudProgress(currentVal);
          
          const stageIdx = Math.min(
            Math.floor((currentVal / 100) * stages.length),
            stages.length - 1
          );
          setActiveStageIndex(stageIdx);
        },
        onComplete: () => {
          setTimeout(() => {
            setActiveStep(3);
          }, 800);
        }
      });
    }
  }, [activeStep]);

  // Step 3 Live Route Tracking status (Preparing ➔ In Transit ➔ Out for Delivery)
  const [trackingStatus, setTrackingStatus] = useState<string>("Preparing");
  const [truckPathProgress, setTruckPathProgress] = useState<number>(0);

  useEffect(() => {
    if (activeStep === 3) {
      setTrackingStatus("Preparing");
      setTruckPathProgress(0);
      const trackingObj = { progress: 0 };

      gsap.to(trackingObj, {
        progress: 100,
        duration: 2.5,
        ease: "power1.inOut",
        onUpdate: () => {
          const val = trackingObj.progress;
          setTruckPathProgress(val);
          if (val < 25) {
            setTrackingStatus("Preparing");
          } else if (val < 75) {
            setTrackingStatus("In Transit");
          } else {
            setTrackingStatus("Out for Delivery");
          }
        },
        onComplete: () => {
          setTimeout(() => {
            setActiveStep(4);
          }, 800);
        }
      });
    }
  }, [activeStep]);

  // --- Sub-Canvas Three.js Setup for Product Card (Phone Chair Render) ---
  useEffect(() => {
    if (activeStep !== 1 || !cardCanvasRef.current) return;

    const width = cardCanvasRef.current.clientWidth;
    const height = cardCanvasRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0.45, 2.5);

    const renderer = new THREE.WebGLRenderer({
      canvas: cardCanvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height, false);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    // Key Light (Cast Shadow)
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(2, 4, 3);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 10;
    dirLight.shadow.bias = -0.001;
    scene.add(dirLight);

    // Fill Light
    const fillLight = new THREE.DirectionalLight(0xfff5e6, 0.7);
    fillLight.position.set(-2, 1, 1.5);
    scene.add(fillLight);

    // Rim/Back Light (Traces contours)
    const rimLight = new THREE.DirectionalLight(0xe6f2ff, 0.5);
    rimLight.position.set(0, -1, -2);
    scene.add(rimLight);

    // Shadowcatcher Floor Plane
    const floorGeo = new THREE.PlaneGeometry(10, 10);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.22 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.45;
    floor.receiveShadow = true;
    scene.add(floor);

    let localChair: THREE.Group | null = null;
    
    // Set up loading manager to track asset loading progress
    const manager = new THREE.LoadingManager();
    manager.onProgress = (url, loaded, total) => {
      setLoadingProgress(Math.round((loaded / total) * 100));
    };
    manager.onLoad = () => {
      setAssetsLoaded(true);
    };

    const gltfLoader = new GLTFLoader(manager);

    gltfLoader.load(
      "/models/SheenChair.glb",
      (gltf) => {
        localChair = gltf.scene;
        localChair.scale.set(1.55, 1.55, 1.55);
        localChair.position.set(0, -0.45, 0);
        localChair.rotation.set(0, -0.65, 0);
        localChair.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        scene.add(localChair);
      },
      undefined,
      () => {
        const fallback = new THREE.Group();
        fallback.add(new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.1, 0.8), new THREE.MeshStandardMaterial({ color: 0x333 })));
        fallback.add(new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.7, 0.1), new THREE.MeshStandardMaterial({ color: 0x333 })));
        fallback.position.set(0, 0, 0);
        scene.add(fallback);
        localChair = fallback;
        setAssetsLoaded(true);
      }
    );

    let animId: number;
    const animate = () => {
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, [activeStep]);

  // --- Sub-Canvas Three.js Setup for Step 2 Packing Illustration ---
  useEffect(() => {
    if (activeStep !== 2 || !packingCanvasRef.current) return;

    const width = packingCanvasRef.current.clientWidth;
    const height = packingCanvasRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0.45, 2.5);

    const renderer = new THREE.WebGLRenderer({
      canvas: packingCanvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height, false);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    // Key Light
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(2, 4, 3);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 10;
    dirLight.shadow.bias = -0.001;
    scene.add(dirLight);

    // Fill Light
    const fillLight = new THREE.DirectionalLight(0xfff5e6, 0.7);
    fillLight.position.set(-2, 1, 1.5);
    scene.add(fillLight);

    // Rim/Back Light
    const rimLight = new THREE.DirectionalLight(0xe6f2ff, 0.5);
    rimLight.position.set(0, -1, -2);
    scene.add(rimLight);

    // Conveyor Floor Plane
    const floorGeo = new THREE.PlaneGeometry(10, 10);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.22 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.45;
    floor.receiveShadow = true;
    scene.add(floor);

    // Cardboard Box Group Assembly
    const boxGroup = new THREE.Group();
    boxGroup.position.set(0, -0.25, 0);
    scene.add(boxGroup);

    const boxMat = new THREE.MeshStandardMaterial({ 
      color: 0xc59b6d, 
      roughness: 0.8,
      metalness: 0.1 
    });

    // Box bottom
    const bottomMesh = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.03, 0.7), boxMat);
    bottomMesh.position.y = -0.185;
    bottomMesh.castShadow = true;
    bottomMesh.receiveShadow = true;
    boxGroup.add(bottomMesh);

    // Box walls
    const wallL = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.4, 0.7), boxMat);
    wallL.position.set(-0.35, 0.015, 0);
    wallL.castShadow = true;
    wallL.receiveShadow = true;
    boxGroup.add(wallL);

    const wallR = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.4, 0.7), boxMat);
    wallR.position.set(0.35, 0.015, 0);
    wallR.castShadow = true;
    wallR.receiveShadow = true;
    boxGroup.add(wallR);

    const wallF = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.4, 0.03), boxMat);
    wallF.position.set(0, 0.015, 0.35);
    wallF.castShadow = true;
    wallF.receiveShadow = true;
    boxGroup.add(wallF);

    const wallB = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.4, 0.03), boxMat);
    wallB.position.set(0, 0.015, -0.35);
    wallB.castShadow = true;
    wallB.receiveShadow = true;
    boxGroup.add(wallB);

    // Flap Hinge Groups
    const leftFlapHinge = new THREE.Group();
    leftFlapHinge.position.set(-0.35, 0.215, 0);
    leftFlapHinge.rotation.z = -1.2;
    boxGroup.add(leftFlapHinge);

    const leftFlapMesh = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.02, 0.7), boxMat);
    leftFlapMesh.position.x = 0.175;
    leftFlapMesh.castShadow = true;
    leftFlapMesh.receiveShadow = true;
    leftFlapHinge.add(leftFlapMesh);

    const rightFlapHinge = new THREE.Group();
    rightFlapHinge.position.set(0.35, 0.215, 0);
    rightFlapHinge.rotation.z = 1.2;
    boxGroup.add(rightFlapHinge);

    const rightFlapMesh = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.02, 0.7), boxMat);
    rightFlapMesh.position.x = -0.175;
    rightFlapMesh.castShadow = true;
    rightFlapMesh.receiveShadow = true;
    rightFlapHinge.add(rightFlapMesh);

    // Loaded Chair
    let localChair: THREE.Group | null = null;
    const gltfLoader = new GLTFLoader();

    gltfLoader.load(
      "/models/SheenChair.glb",
      (gltf) => {
        localChair = gltf.scene;
        localChair.scale.set(0.5, 0.5, 0.5);
        localChair.position.set(0, 0.8, 0);
        localChair.rotation.set(0, -0.65, 0);
        localChair.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        scene.add(localChair);

        // Coordinate packing tweens
        const packingTl = gsap.timeline();
        packingTl.to(localChair.position, {
          y: -0.42,
          duration: 0.7,
          ease: "power2.inOut"
        });
        packingTl.to(leftFlapHinge.rotation, {
          z: 0,
          duration: 0.4,
          ease: "back.out(1.2)"
        }, "+=0.05");
        packingTl.to(rightFlapHinge.rotation, {
          z: 0,
          duration: 0.4,
          ease: "back.out(1.2)"
        }, "-=0.3");
        packingTl.to(boxGroup.position, {
          x: 3.5,
          duration: 0.7,
          ease: "power2.in"
        }, "+=0.15");
        packingTl.to(localChair.position, {
          x: 3.5,
          duration: 0.7,
          ease: "power2.in"
        }, "-=0.7");
      }
    );

    let animId: number;
    const animate = () => {
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, [activeStep]);

  // --- Sub-Canvas Three.js Setup for Success Screen Chair Inset ---
  useEffect(() => {
    if (activeStep !== 4 || !successCanvasRef.current) return;

    const width = successCanvasRef.current.clientWidth;
    const height = successCanvasRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0.45, 2.5);

    const renderer = new THREE.WebGLRenderer({
      canvas: successCanvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height, false);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    // Key Light (Cast Shadow)
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(2, 4, 3);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 10;
    dirLight.shadow.bias = -0.001;
    scene.add(dirLight);

    // Fill Light
    const fillLight = new THREE.DirectionalLight(0xfff5e6, 0.7);
    fillLight.position.set(-2, 1, 1.5);
    scene.add(fillLight);

    // Rim/Back Light
    const rimLight = new THREE.DirectionalLight(0xe6f2ff, 0.5);
    rimLight.position.set(0, -1, -2);
    scene.add(rimLight);

    // Shadowcatcher Floor Plane
    const floorGeo = new THREE.PlaneGeometry(10, 10);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.22 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.45;
    floor.receiveShadow = true;
    scene.add(floor);

    let localChair: THREE.Group | null = null;
    const gltfLoader = new GLTFLoader();

    gltfLoader.load(
      "/models/SheenChair.glb",
      (gltf) => {
        localChair = gltf.scene;
        localChair.scale.set(1.5, 1.5, 1.5);
        localChair.position.set(0, -0.45, 0);
        localChair.rotation.set(0, -0.65, 0);
        localChair.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        scene.add(localChair);
      }
    );

    let animId: number;
    const animate = () => {
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, [activeStep]);

  // --- GSAP Animations for Outer SVG Fulfillment Pipeline (on the Right Column) ---
  useEffect(() => {
    // 1. Scene 1 Animation (Blueprint showroom)
    if (activeStep === 1) {
      gsap.killTweensOf([".floating-chair", ".scene-1 circle", ".scene-1 line", ".scene-1 text"]);
      
      // Floating chair animation
      gsap.set(".floating-chair", { y: 0, rotation: 0, transformOrigin: "200px 155px" });
      gsap.to(".floating-chair", {
        y: -12,
        rotation: 2,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Rotating compass ticks
      gsap.to(".scene-1 .compass-ticks", {
        rotation: 360,
        transformOrigin: "200px 145px",
        duration: 25,
        repeat: -1,
        ease: "none"
      });

      // Flashing dimension measurements
      gsap.to(".scene-1 text", {
        opacity: 0.3,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: "power2.inOut"
      });
    }

    // 2. Scene 2 Animation (Worker packing table)
    if (activeStep === 2) {
      gsap.killTweensOf([
        ".flying-chair-to-box", ".left-flap", ".right-flap", ".tape-line", 
        ".worker-left-arm", ".worker-character", ".sparkles-scene2", 
        ".laser-beam", ".laser-line"
      ]);

      // Set initial states
      gsap.set(".flying-chair-to-box", { y: -80, x: 0, opacity: 0, scale: 0.6, transformOrigin: "200px 150px" });
      gsap.set(".left-flap", { rotation: -65, transformOrigin: "0px 18px" });
      gsap.set(".right-flap", { rotation: 65, transformOrigin: "50px 18px" });
      gsap.set(".tape-line", { strokeDashoffset: 50 });
      gsap.set(".worker-left-arm", { rotation: 0, transformOrigin: "10px 38px" });
      gsap.set(".worker-character", { y: 0, transformOrigin: "center bottom" });
      gsap.set(".sparkles-scene2", { scale: 0.2, opacity: 0, transformOrigin: "170px 130px" });
      
      // Laser QC scan initialization
      gsap.set(".laser-beam", { opacity: 0, scaleY: 0, transformOrigin: "170px 40px" });
      gsap.set(".laser-line", { y: -80, opacity: 0 });

      const tl = gsap.timeline();

      // Sweep Laser QC scanner - relaxed speed
      tl.to([".laser-beam", ".laser-line"], { opacity: 1, duration: 0.1 });
      tl.to(".laser-line", { y: 15, duration: 0.3, ease: "power2.inOut" });
      tl.to(".laser-beam", { scaleY: 1, duration: 0.3, ease: "power2.inOut" }, 0);
      tl.to([".laser-beam", ".laser-line"], { opacity: 0, duration: 0.1 });

      // Chair flies down into the box - relaxed speed
      tl.to(".flying-chair-to-box", {
        y: 12,
        x: -5,
        scale: 0.45,
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut"
      }, "+=0.08");
      tl.to(".flying-chair-to-box", {
        opacity: 0,
        y: 25,
        duration: 0.2,
        ease: "power2.in"
      });

      // Box flaps fold shut - relaxed speed
      tl.to(".left-flap", { rotation: 0, duration: 0.3, ease: "back.out(1.2)" }, "-=0.1");
      tl.to(".right-flap", { rotation: 0, duration: 0.3, ease: "back.out(1.2)" }, "-=0.25");

      // Worker character leans in to tape the box
      tl.to(".worker-character", { y: 3, rotation: -1, duration: 0.15 }, "-=0.1");
      tl.to(".worker-left-arm", { rotation: -35, duration: 0.25, ease: "power1.inOut" });
      
      // Tape dispenser seals box
      tl.to(".tape-line", { strokeDashoffset: 0, duration: 0.4, ease: "power2.inOut" });
      
      // Arm returns, worker stands up, and sparkles success triggers
      tl.to(".worker-left-arm", { rotation: 0, duration: 0.25, ease: "power1.inOut" }, "-=0.15");
      tl.to(".worker-character", { y: 0, rotation: 0, duration: 0.15 });
      tl.to(".sparkles-scene2", { opacity: 1, scale: 1.1, duration: 0.3, ease: "elastic.out(1, 0.5)" });
      tl.to(".sparkles-scene2", { opacity: 0, scale: 1.4, duration: 0.2 });
    }

    // 3. Scene 3 Animation (Worker loading cargo truck)
    if (activeStep === 3) {
      gsap.killTweensOf([
        ".trolley-group", ".worker-pushing", ".trolley-box", 
        ".truck-door-left", ".truck-door-right", ".delivery-truck-group", 
        ".worker-leg-1", ".worker-leg-2", ".delivery-truck-group circle"
      ]);
      
      // Reset variables
      gsap.set(".trolley-group", { x: -140 });
      gsap.set(".worker-pushing", { x: -190, y: 0, transformOrigin: "center bottom" });
      gsap.set(".trolley-box", { y: 16, opacity: 1, scale: 1, transformOrigin: "center center" });
      gsap.set(".truck-door-left", { scaleX: 1, transformOrigin: "10px center" });
      gsap.set(".truck-door-right", { scaleX: 1, opacity: 1, transformOrigin: "10px center" });
      gsap.set(".delivery-truck-group", { x: 195, y: 75, rotation: 0, transformOrigin: "110px 145px" });

      // Jointed leg walking animation - relaxed speed
      const legsTimeline = gsap.timeline({ repeat: -1 });
      legsTimeline.to(".worker-leg-1", { rotation: 18, transformOrigin: "center top", duration: 0.35, ease: "sine.inOut" })
                  .to(".worker-leg-1", { rotation: -18, duration: 0.7, ease: "sine.inOut" })
                  .to(".worker-leg-1", { rotation: 0, duration: 0.35, ease: "sine.inOut" });

      const legsTimeline2 = gsap.timeline({ repeat: -1 });
      legsTimeline2.to(".worker-leg-2", { rotation: -18, transformOrigin: "center top", duration: 0.35, ease: "sine.inOut" })
                  .to(".worker-leg-2", { rotation: 18, duration: 0.7, ease: "sine.inOut" })
                  .to(".worker-leg-2", { rotation: 0, duration: 0.35, ease: "sine.inOut" });

      // Worker torso bobbing - relaxed speed
      const bodyBob = gsap.to(".worker-pushing", { y: -3, duration: 0.35, repeat: -1, yoyo: true, ease: "sine.inOut" });

      // Spin tires
      const wheelsSpin = gsap.to(".delivery-truck-group circle", {
        rotation: 360,
        transformOrigin: "center center",
        duration: 0.8,
        repeat: -1,
        ease: "none"
      });
      wheelsSpin.pause();

      const tl = gsap.timeline({
        onComplete: () => {
          legsTimeline.kill();
          legsTimeline2.kill();
          bodyBob.kill();
          wheelsSpin.kill();
        }
      });

      // Pushing trolley and walking in - relaxed speed
      tl.to(".trolley-group", { x: 15, duration: 0.6, ease: "power1.out" });
      tl.to(".worker-pushing", { x: -35, duration: 0.6, ease: "power1.out" }, 0);
      
      // Stop walking
      tl.add(() => {
        legsTimeline.pause();
        legsTimeline2.pause();
        bodyBob.pause();
        gsap.set([".worker-leg-1", ".worker-leg-2"], { rotation: 0 });
      });

      // Box lifts off trolley, slides into the truck bed
      tl.to(".trolley-box", {
        y: -30,
        x: 40,
        scale: 0.65,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut"
      }, "+=0.08");

      // Truck suspension compression bounce
      tl.to(".delivery-truck-group", { y: 79, duration: 0.08, ease: "power1.in" });
      tl.to(".delivery-truck-group", { y: 73, duration: 0.1, ease: "power2.out" });
      tl.to(".delivery-truck-group", { y: 75, duration: 0.15, ease: "bounce.out" });

      // Close back doors
      tl.to(".truck-door-left", { scaleX: 0, duration: 0.3, ease: "power1.inOut" });
      tl.to(".truck-door-right", { scaleX: 0, duration: 0.3, ease: "power1.inOut" }, "-=0.3");

      // Worker walks back out of frame
      tl.add(() => {
        legsTimeline.play();
        legsTimeline2.play();
        bodyBob.play();
      });
      tl.to(".trolley-group", { x: -140, duration: 0.5, ease: "power1.in" });
      tl.to(".worker-pushing", { x: -190, duration: 0.5, ease: "power1.in" }, "-=0.5");

      // Stop worker cycle
      tl.add(() => {
        legsTimeline.kill();
        legsTimeline2.kill();
        bodyBob.kill();
      });

      // Truck starts driving with suspension lean and wheels spinning
      tl.add(() => wheelsSpin.play());
      tl.to(".delivery-truck-group", { rotation: -1.5, duration: 0.15, ease: "power2.inOut" });
      tl.to(".delivery-truck-group", { x: 420, duration: 0.6, ease: "power2.in" });
    }

    // 4. Scene 4 Animation (Delivered successfully)
    if (activeStep === 4) {
      gsap.killTweensOf([
        ".success-truck-group", ".delivered-box", ".success-flap-l", 
        ".success-flap-r", ".success-chair-glow", ".success-checkmark-glow", 
        ".confetti-burst", ".confetti-burst circle", ".confetti-burst rect", 
        ".confetti-burst polygon", ".success-truck-group circle"
      ]);

      // Reset coordinates
      gsap.set(".success-truck-group", { x: -160, y: 75, rotation: 0, transformOrigin: "110px 145px" });
      gsap.set(".delivered-box", { y: -80, x: -80, opacity: 0, scale: 0.5, rotation: -30, transformOrigin: "center center" });
      gsap.set(".success-flap-l", { rotation: 0, transformOrigin: "0px 10px" });
      gsap.set(".success-flap-r", { rotation: 0, transformOrigin: "32px 10px" });
      gsap.set(".success-chair-glow", { y: 35, scale: 0.1, opacity: 0, transformOrigin: "25px 45px" });
      gsap.set(".success-checkmark-glow", { scale: 0.2, opacity: 0, transformOrigin: "20px 20px" });
      gsap.set(".confetti-burst", { opacity: 0, scale: 0.6, transformOrigin: "280px 200px" });

      // Spin truck wheels
      const wheelsSpin = gsap.to(".success-truck-group circle", {
        rotation: 360,
        transformOrigin: "center center",
        duration: 0.7,
        repeat: -1,
        ease: "none"
      });

      const tl = gsap.timeline({
        onComplete: () => {
          wheelsSpin.kill();
        }
      });

      // Truck drives in and brakes hard - relaxed speed
      tl.to(".success-truck-group", { x: 45, duration: 0.5, ease: "power2.out" });
      tl.to(".success-truck-group", { rotation: 1.5, duration: 0.15, ease: "power2.out" }, "-=0.15");
      tl.to(".success-truck-group", { rotation: 0, duration: 0.25, ease: "elastic.out(1.2, 0.4)" });

      // Unload box: box falls from truck onto doorstep mat - relaxed speed
      tl.to(".delivered-box", {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.5,
        ease: "bounce.out"
      }, "+=0.05");

      // Squash and stretch simulation
      tl.to(".delivered-box", { scaleY: 0.75, scaleX: 1.25, duration: 0.1, yoyo: true, repeat: 1, ease: "power1.inOut" }, "-=0.1");
      tl.to(".delivered-box", { scaleY: 1, scaleX: 1, duration: 0.1 });

      // Truck drives away out of right side
      tl.to(".success-truck-group", { x: 420, duration: 0.5, ease: "power2.in" });

      // Box flaps spring open
      tl.to(".success-flap-l", { rotation: -120, duration: 0.25, ease: "back.out(2)" });
      tl.to(".success-flap-r", { rotation: 120, duration: 0.25, ease: "back.out(2)" }, "-=0.25");

      // Glowing chair floats up and spins slowly
      tl.to(".success-chair-glow", {
        y: -30,
        scale: 1.0,
        opacity: 1,
        duration: 0.45,
        ease: "power2.out"
      });
      gsap.to(".success-chair-glow", {
        rotation: 360,
        transformOrigin: "25px 25px",
        duration: 6,
        repeat: -1,
        ease: "none"
      });

      // Giant success checkmark scales up
      tl.to(".success-checkmark-glow", {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: "elastic.out(1, 0.6)"
      }, "-=0.3");

      // Confetti burst shoots out radially
      tl.to(".confetti-burst", { opacity: 1, scale: 1.5, duration: 0.3, ease: "back.out(1.5)" }, "-=0.25");
      
      // Animate individual confetti particles drifting
      tl.to(".confetti-burst circle", { x: "random(-20, 20)", y: "random(-40, -10)", opacity: 0, duration: 0.6, stagger: 0.02 }, "-=0.15");
      tl.to(".confetti-burst rect", { x: "random(-25, 25)", y: "random(-35, -5)", rotation: "random(0, 360)", opacity: 0, duration: 0.6 }, "-=0.6");
      tl.to(".confetti-burst polygon", { x: "random(-30, 30)", y: "random(-30, -5)", rotation: "random(0, 360)", opacity: 0, duration: 0.6 }, "-=0.6");
    }
  }, [activeStep]);

  return (
    <section className="fulfillment-section-obsidian">
      
      {/* Fractal noise overlay */}
      <div className="noise-overlay"></div>
      
      {/* Soft vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,7,11,0)_20%,rgba(5,7,11,0.95)_90%)] pointer-events-none z-1"></div>

      {/* Structured Cockpit 3-Column layout container */}
      <div className="cockpit-grid">
        
        {/* ==========================================================================
           LEFT COLUMN (30% WIDTH - COCKPIT COPY PANEL)
           ========================================================================== */}
        <div className="cockpit-left-col">
          <span style={{ color: "#00f2fe", fontFamily: "monospace", fontSize: "12px", letterSpacing: "2.5px", textTransform: "uppercase", display: "block", marginBottom: "16px", userSelect: "none" }}>
            01 / ORDER
          </span>
          
          <h2 style={{ fontSize: "2.5rem", fontWeight: "900", color: "#fff", letterSpacing: "-1px", textTransform: "uppercase", lineHeight: "1.1", marginBottom: "24px" }}>
            Fulfillment <br />
            <span style={{ color: "#00f2fe" }}>Orchestrated.</span>
          </h2>
          
          <p style={{ color: "#aaa", fontSize: "13px", lineHeight: "1.6", marginBottom: "32px", maxWidth: "260px" }}>
            Watch in real-time as checkout intent propagates seamlessly across tracking layers to verify absolute visual delivery.
          </p>

          <div style={{ display: "flex" }}>
            <button
              disabled={activeStep === 2 || activeStep === 3}
              onClick={() => setActiveStep(activeStep === 4 ? 1 : 2)}
              className="glass-hud-panel"
              style={{ 
                color: "#fff", 
                fontFamily: "monospace", 
                fontSize: "10px", 
                textTransform: "uppercase", 
                letterSpacing: "1.5px", 
                padding: "12px 24px", 
                borderRadius: "4px", 
                border: "1px solid rgba(0, 242, 254, 0.25)", 
                transition: "all 0.3s ease", 
                cursor: (activeStep === 2 || activeStep === 3) ? "not-allowed" : "pointer",
                opacity: (activeStep === 2 || activeStep === 3) ? 0.5 : 1
              }}
            >
              {activeStep === 1 && "[ CREATE SHIPMENT ]"}
              {(activeStep === 2 || activeStep === 3) && "[ AUTOMATION RUNNING ]"}
              {activeStep === 4 && "[ RESET EXPERIENCE ]"}
            </button>
          </div>
        </div>

        {/* ==========================================================================
           CENTER COLUMN (40% WIDTH - STATIC PHONE UI)
           ========================================================================== */}
        <div className="cockpit-center-col">
          <div className="phone-mockup-wrapper">
            {/* Floor reflections and shadows */}
            <div className="phone-mockup-reflection"></div>
            <div className="phone-mockup-shadow"></div>

            {/* Side Buttons */}
            <div className="phone-side-button phone-button-action"></div>
            <div className="phone-side-button phone-button-vol-up"></div>
            <div className="phone-side-button phone-button-vol-down"></div>
            <div className="phone-side-button phone-button-power"></div>

            {/* Bezel iPhone mockup frame (Zero movement, tilt, bounce, or scaling) */}
            <div className="phone-mockup-frame">
              {/* Dynamic Island */}
              <div className="phone-dynamic-island">
                <div className="phone-dynamic-island-lens"></div>
              </div>

              {/* Simulated reflection glass overlay */}
              <div className="phone-screen-shine"></div>

              {/* Inner Phone screen layout */}
              <div className="phone-screen-container">
                {/* status bar */}
                <div className="phone-status-bar-sim">
                  <span className="phone-status-time">18:58</span>
                  <div className="phone-status-icons">
                    <svg className="phone-status-icon phone-icon-cellular" viewBox="0 0 16 10" fill="currentColor">
                      <rect x="1" y="7" width="2" height="3" rx="0.5" />
                      <rect x="4" y="5" width="2" height="5" rx="0.5" />
                      <rect x="7" y="3" width="2" height="7" rx="0.5" />
                      <rect x="10" y="1" width="2" height="9" rx="0.5" />
                    </svg>
                    <svg className="phone-status-icon phone-icon-wifi" viewBox="0 0 14 10" fill="currentColor">
                      <path d="M7 9a1 1 0 110-2 1 1 0 010 2zm-3-3a4.24 4.24 0 016 0 1 1 0 01-1.42 1.42 2.24 2.24 0 00-3.16 0A1 1 0 014 6zm-3-3a8.48 8.48 0 0112 0 1 1 0 01-1.42 1.42 6.48 6.48 0 00-9.16 0A1 1 0 011 3z" />
                    </svg>
                    <div className="phone-battery-sim">
                      <div className="phone-battery-body">
                        <div className="phone-battery-charge" style={{ width: "75%" }}></div>
                      </div>
                      <div className="phone-battery-cap"></div>
                    </div>
                  </div>
                </div>

              {/* Dynamic Phone Interfaces */}
              <div className="phone-screen-content-box">

                {/* --- Step 1 Phone Content: Product Screen (Phase 2) --- */}
                {activeStep === 1 && (
                  <div style={{ display: "flex", flexDirection: "column", flexGrow: "1", position: "relative" }}>
                    
                    {/* Sourced Canvas product viewer */}
                    <div className="phone-product-card-canvas">
                      {!assetsLoaded && (
                        <div style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff", zIndex: "20" }}>
                          <span style={{ fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: "8px", color: "#635BFF", animation: "pulse 2s infinite" }}>LOADING PIPELINE ({loadingProgress}%)</span>
                        </div>
                      )}
                      <canvas ref={cardCanvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
                    </div>

                    <div style={{ marginBottom: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "3px" }}>
                        <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#10b981", display: "inline-block", animation: "pulse 1.5s infinite" }} />
                        <span style={{ fontSize: "7.5px", fontWeight: 700, color: "#10b981", fontFamily: "var(--font-inter)", letterSpacing: "1.2px", textTransform: "uppercase" }}>IN STOCK - SHIPS TODAY</span>
                      </div>
                      <h4 className="product-title" style={{ fontSize: "14px", fontWeight: "800", color: "#0f172a", fontFamily: "var(--font-family-sans)", letterSpacing: "-0.2px", textTransform: "uppercase" }}>
                        Elysian Lounge Chair
                      </h4>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                        <div style={{ display: "flex", gap: "1px", alignItems: "center" }}>
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="size-2.5 fill-amber-400 stroke-amber-400" />
                          ))}
                        </div>
                        <span style={{ fontSize: "9.5px", color: "#1e293b", fontFamily: "var(--font-inter)", fontWeight: 700 }}>(4.9)</span>
                        <span style={{ fontSize: "8.5px", color: "#94a3b8", fontFamily: "var(--font-inter)", fontWeight: 500 }}>• 128 reviews</span>
                      </div>
                    </div>

                    <p className="product-desc">
                      Pristine velvet framework balanced with structural liquid-gold support loops.
                    </p>

                    {/* color selectors */}
                    <div className="phone-color-selectors-row">
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ color: "#475569" }}>Color:</span>
                        {["#635BFF", "#ff6b4a", "#10b981"].map((colorHex, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setActiveColor(idx);
                              gsap.fromTo(`.color-pill-${idx}`, { scale: 0.8 }, { scale: 1.15, duration: 0.4, ease: "elastic.out(1.2, 0.4)" });
                            }}
                            className={`phone-color-pill color-pill-${idx} ${activeColor === idx ? "active" : ""}`}
                            style={{ backgroundColor: colorHex }}
                          />
                        ))}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ color: "#475569" }}>Qty:</span>
                        <div className="phone-qty-selector-box">
                          <button 
                            onClick={() => {
                              setQuantity(Math.max(1, quantity - 1));
                              gsap.fromTo(".qty-val", { scale: 0.8 }, { scale: 1, duration: 0.3, ease: "back.out(2)" });
                            }} 
                            className="phone-qty-btn"
                          >
                            -
                          </button>
                          <span className="qty-val" style={{ color: "#1e293b", padding: "0 6px", fontSize: "9.5px", fontWeight: "700", fontFamily: "var(--font-inter)", display: "inline-block" }}>{quantity}</span>
                          <button 
                            onClick={() => {
                              setQuantity(quantity + 1);
                              gsap.fromTo(".qty-val", { scale: 1.2 }, { scale: 1, duration: 0.3, ease: "back.out(2)" });
                            }} 
                            className="phone-qty-btn"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: "auto", position: "relative" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                        <span style={{ fontSize: "8px", color: "#475569", fontFamily: "var(--font-inter)", fontWeight: 700, letterSpacing: "0.5px" }}>TOTAL ESTIMATED</span>
                        <span style={{ fontSize: "14px", fontWeight: "800", color: "#0f172a", fontFamily: "var(--font-inter)" }}>${(2499 * quantity).toLocaleString()}</span>
                      </div>

                      {/* Tooltip pointer */}
                      <div className="phone-buy-tooltip animate-bounce">
                        CLICK HERE
                      </div>

                      {/* Metallic gold button */}
                      <button
                        onClick={() => setActiveStep(2)}
                        className="phone-gold-buy-btn"
                      >
                        CREATE SHIPMENT
                        <div className="shimmer-btn-overlay"></div>
                      </button>
                    </div>

                  </div>
                )}

                {/* --- Step 2 Phone Content: Circular Progress (Phase 3) --- */}
                {activeStep === 2 && (
                  <div style={{ display: "flex", flexDirection: "column", flexGrow: "1", justifyContent: "center", alignItems: "center", position: "relative" }}>
                    
                    {/* Chair thumbnail - borderless canvas rendering directly on screen */}
                    <div style={{ width: "100%", aspectRatio: "4/3", backgroundColor: "transparent", overflow: "hidden", position: "relative" }}>
                      <canvas ref={packingCanvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
                    </div>

                  </div>
                )}

                {/* --- Step 3 Phone Content: Transit Route schematic (Phase 5) --- */}
                {activeStep === 3 && (
                  <div style={{ display: "flex", flexDirection: "column", flexGrow: "1", justifyContent: "space-between", position: "relative" }}>
                    
                    {/* Routing view - Solid Pure White container */}
                    <div style={{ width: "100%", aspectRatio: "4/3", backgroundColor: "#ffffff", border: "1px solid rgba(15, 23, 42, 0.05)", borderRadius: "16px", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "12px", boxShadow: "0 4px 14px rgba(15, 23, 42, 0.02)" }}>
                      <div style={{ position: "absolute", inset: "0", backgroundImage: "linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px)", backgroundSize: "10px 10px" }}></div>

                      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: "10", padding: "0 16px" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                          {/* Ripples */}
                          <div className="ripple-ring" />
                          <div className="ripple-ring delay-1" />
                          <div className="ripple-ring delay-2" />
                          
                          <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#635BFF", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                            <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#ffffff" }}></span>
                          </span>
                          <span style={{ fontSize: "7px", fontFamily: "var(--font-inter)", fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginTop: "4px" }}>Warehouse</span>
                        </div>

                        {/* path line */}
                        <div style={{ flexGrow: "1", height: "1px", borderTop: "1px dashed rgba(99, 91, 255, 0.3)", margin: "0 8px", position: "relative" }}>
                          {/* truck path progress dot with Rive-like dynamic tilt */}
                          <div 
                            style={{ 
                              position: "absolute", 
                              top: "-8px", 
                              width: "16px", 
                              height: "16px", 
                              backgroundColor: "#635BFF", 
                              color: "#ffffff", 
                              borderRadius: "50%", 
                              display: "flex", 
                              alignItems: "center", 
                              justifyContent: "center", 
                              left: `${truckPathProgress}%`, 
                              transform: `translateX(-50%) rotate(${truckPathProgress > 0 && truckPathProgress < 100 ? (truckPathProgress < 50 ? 5 : -4) : 0}deg)`, 
                              boxShadow: "0 4px 12px rgba(99, 91, 255, 0.35)",
                              transition: "transform 0.1s ease-out"
                            }}
                          >
                            <Truck style={{ width: "9px", height: "9px" }} strokeWidth={2.5} />
                          </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                          {/* Ripples */}
                          <div className="ripple-ring orange" />
                          <div className="ripple-ring orange delay-1" />
                          <div className="ripple-ring orange delay-2" />
                          
                          <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ff6b4a", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                            <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#ffffff" }}></span>
                          </span>
                          <span style={{ fontSize: "7px", fontFamily: "var(--font-inter)", fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginTop: "4px" }}>Customer</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats overlay card - upgraded to glass card */}
                    <div className="phone-glass-card">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <span style={{ fontSize: "7.5px", color: "#635BFF", fontWeight: "700", fontFamily: "var(--font-inter)", letterSpacing: "0.5px" }}>LIVE ROUTE TRACKER</span>
                        <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "7.5px", color: "#10b981", fontWeight: "700", fontFamily: "var(--font-inter)" }}>
                          <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#10b981", display: "inline-block", animation: "pulse 1.2s infinite" }}></span>
                          LIVE
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                        <span style={{ fontSize: "9px", color: "#475569", fontFamily: "var(--font-inter)" }}>ETA:</span>
                        <span style={{ color: "#0f172a", fontWeight: "700", fontFamily: "var(--font-inter)", fontSize: "9px" }}>2:30 PM</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "9px", color: "#475569", fontFamily: "var(--font-inter)" }}>STATUS:</span>
                        <span style={{ color: "#635BFF", fontWeight: "700", fontFamily: "var(--font-inter)", fontSize: "9px", textTransform: "uppercase" }}>{trackingStatus}</span>
                      </div>
                    </div>

                    <div style={{ marginTop: "auto" }}>
                      {truckPathProgress < 100 ? (
                        <div style={{ fontSize: "8.5px", fontFamily: "var(--font-inter)", fontWeight: 500, color: "#64748b", textAlign: "center", fontStyle: "italic" }}>
                          Truck traveling route network...
                        </div>
                      ) : (
                        <button
                          disabled
                          style={{ width: "100%", backgroundColor: "#ff6b4a", opacity: 0.8, border: "none", color: "#fff", fontWeight: "600", fontSize: "9.5px", padding: "12px 0", borderRadius: "8px", textTransform: "uppercase", letterSpacing: "1.5px", cursor: "not-allowed", position: "relative", overflow: "hidden" }}
                        >
                          ARRIVED! VERIFYING...
                          <div className="shimmer-btn-overlay"></div>
                        </button>
                      )}
                    </div>

                  </div>
                )}

                {/* --- Step 4 Phone Content: Delivery Confirmation Screen (Phase 7) --- */}
                {activeStep === 4 && (
                  <div style={{ display: "flex", flexDirection: "column", flexGrow: "1", justifyContent: "center", alignItems: "center", gap: "20px", position: "relative", padding: "16px 0" }}>
                    
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                      {/* circular checkmark - upgraded to solid premium blue tick */}
                      <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#635BFF", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", marginBottom: "12px", boxShadow: "0 6px 18px rgba(99, 91, 255, 0.25)" }}>
                        <Check className="size-5" strokeWidth={2.5} />
                      </div>

                      <h4 style={{ fontFamily: "var(--font-family-sans)", fontSize: "14px", fontWeight: "900", color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.5px", marginTop: "4px" }}>
                        DELIVERED SUCCESSFULLY
                      </h4>
                    </div>

                    {/* Chair thumbnail - borderless canvas rendering directly on screen */}
                    <div className="levitate-box" style={{ width: "100%", aspectRatio: "4/3", backgroundColor: "transparent", overflow: "hidden", position: "relative" }}>
                      <canvas ref={successCanvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
                    </div>

                  </div>
                )}

              </div>

              {/* iPhone home notch indicator line */}
              <div className="phone-home-indicator-sim">
                <div className="phone-home-bar-line"></div>
              </div>

            </div>

          </div>

        </div>

      </div>

        {/* ==========================================================================
           RIGHT COLUMN (30% WIDTH - CYAN WIREFRAME ILLUSTRATIONS)
           ========================================================================== */}
        <div className="cockpit-right-col">
          
          {/* Three.js Canvas container frame */}
          <div className="wireframe-viewport-box">
            
            {/* Viewport markers */}
            <div className="wireframe-viewport-marker marker-tl"></div>
            <div className="wireframe-viewport-marker marker-tr"></div>
            <div className="wireframe-viewport-marker marker-bl"></div>
            <div className="wireframe-viewport-marker marker-br"></div>

            {/* Custom Interactive SVG Animation Scenes (OUTSIDE the Phone) */}
            <div className="fulfillment-svg-viewport">
              
              {/* Scene 1: Aether Lounge Chair Blueprint Showroom */}
              <div className={`fulfillment-scene scene-1 ${activeStep === 1 ? "active" : ""}`}>
                <svg viewBox="0 0 400 300" width="100%" height="100%">
                  <defs>
                    <radialGradient id="blueprint-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(0, 242, 254, 0.22)" />
                      <stop offset="100%" stopColor="rgba(5, 7, 11, 0)" />
                    </radialGradient>
                    <pattern id="dot-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="rgba(0, 242, 254, 0.15)" />
                    </pattern>
                  </defs>
                  
                  {/* Glowing backdrop dot grid */}
                  <rect width="400" height="300" fill="url(#blueprint-glow)" />
                  <rect width="400" height="300" fill="url(#dot-grid)" />
                  
                  {/* Tech circles & dials */}
                  <g stroke="rgba(0, 242, 254, 0.1)" strokeWidth="0.5" fill="none">
                    <line x1="40" y1="230" x2="360" y2="230" />
                    <line x1="200" y1="30" x2="200" y2="260" />
                    <circle cx="200" cy="145" r="75" />
                    <circle cx="200" cy="145" r="105" />
                    <circle cx="200" cy="145" r="120" strokeDasharray="4,6" />
                  </g>

                  {/* Compass/Radar Tick lines */}
                  <g stroke="#00f2fe" strokeWidth="1" opacity="0.4" fill="none" className="neon-glow-cyan">
                    <path d="M200 20 L200 30 M200 260 L200 270 M75 145 L85 145 M315 145 L325 145" />
                    <circle cx="200" cy="145" r="105" strokeDasharray="1,15" strokeWidth="2" className="compass-ticks" />
                  </g>

                  {/* Dynamic Laser measurement cursor */}
                  <g stroke="#00f2fe" strokeWidth="0.75" opacity="0.6">
                    <line x1="120" y1="90" x2="140" y2="90" />
                    <line x1="120" y1="90" x2="120" y2="110" />
                    <line x1="280" y1="200" x2="260" y2="200" />
                    <line x1="280" y1="200" x2="280" y2="180" />
                  </g>

                  {/* Floating Detailed Chair Vector */}
                  <g className="floating-chair neon-glow-cyan" stroke="#00f2fe" strokeWidth="1.5" fill="none">
                    {/* Metallic pedestal base */}
                    <ellipse cx="200" cy="215" rx="38" ry="10" strokeWidth="1" />
                    <ellipse cx="200" cy="218" rx="38" ry="10" />
                    <path d="M185 210 L192 165 M215 210 L208 165" />
                    <path d="M200 218 L200 165" strokeWidth="2.5" />

                    {/* Faux 3D frame back support */}
                    <path d="M142 105 Q132 165 200 165 Q268 165 258 105 Q200 85 142 105 Z" strokeWidth="1.5" />
                    <path d="M145 110 C145 160, 255 160, 255 110" opacity="0.5" />

                    {/* Main seat cushion */}
                    <ellipse cx="200" cy="155" rx="50" ry="16" fill="rgba(11, 12, 16, 0.9)" strokeWidth="2" />
                    
                    {/* Inner comfort tufting folds */}
                    <path d="M170 152 Q200 160 230 152" strokeWidth="0.75" opacity="0.6" />
                    <path d="M180 156 Q200 163 220 156" strokeWidth="0.75" opacity="0.6" />

                    {/* Cushioned Backrest */}
                    <path d="M165 115 C165 98, 180 94, 200 94 C220 94, 235 98, 235 115 C235 135, 165 135, 165 115 Z" fill="rgba(11, 12, 16, 0.9)" strokeWidth="2" />
                    <line x1="200" y1="94" x2="200" y2="125" strokeWidth="0.75" opacity="0.4" />

                    {/* Sleek Armrests */}
                    <path d="M145 135 Q138 115 158 120" strokeWidth="2" />
                    <path d="M255 135 Q262 115 242 120" strokeWidth="2" />
                  </g>

                  {/* Technical details tags */}
                  <g fill="rgba(0, 242, 254, 0.4)" fontSize="7" fontFamily="monospace">
                    <text x="200" y="278" textAnchor="middle">// LAYER_SYS_ACTIVE: AETHER_L_CHAIR // UNIT_METRICS</text>
                    <text x="45" y="148">R: 359.12</text>
                    <text x="325" y="148">P: +12.44</text>
                    <text x="290" y="94" fill="#00f2fe">EST_H: 95.0cm</text>
                    <text x="290" y="104" fill="#00f2fe">EST_W: 82.0cm</text>
                  </g>
                </svg>
              </div>

              {/* Scene 2: Worker Packing Chair at Table */}
              <div className={`fulfillment-scene scene-2 ${activeStep === 2 ? "active" : ""}`}>
                <svg viewBox="0 0 400 300" width="100%" height="100%">
                  <defs>
                    <linearGradient id="tech-table" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                    <linearGradient id="box-cardboard" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e5a93b" />
                      <stop offset="100%" stopColor="#b37d1b" />
                    </linearGradient>
                    <linearGradient id="laser-scan-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(0, 242, 254, 0.4)" />
                      <stop offset="100%" stopColor="rgba(0, 242, 254, 0)" />
                    </linearGradient>
                  </defs>

                  {/* Laser QC Scan Beam Overlay */}
                  <polygon points="120,40 220,40 260,170 80,170" fill="url(#laser-scan-grad)" className="laser-beam" style={{ display: activeStep === 2 ? "block" : "none" }} />
                  <line x1="80" y1="170" x2="260" y2="170" stroke="#00f2fe" strokeWidth="2" className="laser-line neon-glow-cyan" />

                  {/* Background warehouse shelf silhouettes */}
                  <g stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" fill="none">
                    <rect x="25" y="30" width="90" height="200" />
                    <line x1="25" y1="90" x2="115" y2="90" />
                    <line x1="25" y1="150" x2="115" y2="150" />
                    <rect x="285" y="30" width="90" height="200" />
                    <line x1="285" y1="90" x2="375" y2="90" />
                    <line x1="285" y1="150" x2="375" y2="150" />
                  </g>

                  {/* Sturdy Workbench */}
                  <g>
                    {/* Metal framework legs */}
                    <rect x="85" y="180" width="10" height="70" fill="#334155" />
                    <rect x="245" y="180" width="10" height="70" fill="#334155" />
                    <line x1="85" y1="210" x2="255" y2="210" stroke="#334155" strokeWidth="4" />
                    
                    {/* Durable composite tabletop */}
                    <rect x="65" y="170" width="210" height="12" rx="2" fill="url(#tech-table)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    
                    {/* Tools on table (Scanner gun, clipboard tablet) */}
                    <rect x="75" y="162" width="18" height="8" rx="1" fill="#475569" />
                    <line x1="80" y1="162" x2="80" y2="170" stroke="#00f2fe" strokeWidth="1.5" />
                  </g>

                  {/* Floating chair (flying inside box) */}
                  <g className="flying-chair-to-box neon-glow-cyan" stroke="#00f2fe" strokeWidth="1.25" fill="none" transform="translate(0, 0) scale(0.5)">
                    <ellipse cx="200" cy="180" rx="30" ry="8" />
                    <path d="M160 110 Q150 160 200 160 Q250 160 240 110 Q200 95 160 110 Z" />
                    <ellipse cx="200" cy="140" rx="35" ry="12" fill="rgba(11,12,16,0.9)" />
                  </g>

                  {/* Shipping Box */}
                  <g className="shipping-box-scene2" transform="translate(145, 120)">
                    {/* Box volume container */}
                    <rect x="0" y="18" width="50" height="34" rx="1.5" fill="url(#box-cardboard)" stroke="#926217" strokeWidth="1" />
                    
                    {/* Box flaps (Perspective folded with GSAP scaleY) */}
                    <path d="M-6 18 L15 3 L20 18 Z" fill="#b07d24" stroke="#7d520e" className="left-flap" />
                    <path d="M56 18 L35 3 L30 18 Z" fill="#b07d24" stroke="#7d520e" className="right-flap" />
                    
                    {/* Cyan tape seal strip */}
                    <line x1="0" y1="18" x2="50" y2="18" stroke="#00f2fe" strokeWidth="2.5" className="tape-line neon-glow-cyan" strokeDasharray="50" strokeDashoffset="50" />
                  </g>

                  {/* Worker Illustration (Blue shirt, dark pants, highly detailed limbs) */}
                  <g className="worker-character" transform="translate(260, 90)">
                    {/* Pants & Legs */}
                    <rect x="16" y="90" width="9" height="70" fill="#1e3a8a" rx="2.5" className="left-leg" />
                    <rect x="29" y="90" width="9" height="70" fill="#1e3a8a" rx="2.5" className="right-leg" />
                    
                    {/* Shoes */}
                    <rect x="12" y="156" width="13" height="6" fill="#0f172a" rx="1.5" />
                    <rect x="29" y="156" width="13" height="6" fill="#0f172a" rx="1.5" />

                    {/* Torso in royal blue T-shirt */}
                    <rect x="10" y="30" width="34" height="64" fill="#2563eb" rx="7" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                    
                    {/* Detailed head, hair, and neck */}
                    <rect x="23" y="18" width="8" height="14" fill="#ffcc99" />
                    <circle cx="27" cy="11" r="13" fill="#ffcc99" />
                    <path d="M14 11 C14 2, 40 2, 40 11 Z" fill="#3e2723" /> {/* brown hair */}
                    
                    {/* Worker Arms */}
                    {/* Right arm stretching out */}
                    <path d="M40 38 Q58 55 46 75" stroke="#ffcc99" strokeWidth="6.5" strokeLinecap="round" fill="none" />
                    {/* Left arm sealing the box with tape dispenser tool */}
                    <path d="M10 38 Q-12 55 3 75" stroke="#ffcc99" strokeWidth="6.5" strokeLinecap="round" fill="none" className="worker-left-arm" />
                  </g>

                  {/* Quality/Fulfillment Sparkle tags */}
                  <g className="sparkles-scene2 neon-glow-green" fill="none" stroke="#10b981" strokeWidth="1" opacity="0">
                    <circle cx="170" cy="130" r="4" />
                    <line x1="170" y1="120" x2="170" y2="124" />
                    <line x1="170" y1="136" x2="170" y2="140" />
                    <line x1="160" y1="130" x2="164" y2="130" />
                    <line x1="176" y1="130" x2="180" y2="130" />
                  </g>
                </svg>
              </div>

              {/* Scene 3: Worker Loading Cargo Truck */}
              <div className={`fulfillment-scene scene-3 ${activeStep === 3 ? "active" : ""}`}>
                <svg viewBox="0 0 400 300" width="100%" height="100%">
                  <defs>
                    <linearGradient id="truck-metal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#cbd5e1" />
                    </linearGradient>
                    <linearGradient id="truck-cab" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f8fafc" />
                      <stop offset="100%" stopColor="#cbd5e1" />
                    </linearGradient>
                  </defs>

                  {/* Road Grid and Markings */}
                  <line x1="15" y1="240" x2="385" y2="240" stroke="rgba(255,255,255,0.06)" strokeWidth="2.5" strokeDasharray="6,6" />
                  <line x1="5" y1="244" x2="395" y2="244" stroke="rgba(0, 242, 254, 0.15)" strokeWidth="1" />

                  {/* Tech Cargo Truck (Silver-white design, Stripe-like branding) */}
                  <g className="delivery-truck-group" transform="translate(195, 75)">
                    {/* Headlight yellow glow cone */}
                    <polygon points="160,135 220,120 220,165 160,150" fill="rgba(255, 255, 255, 0.05)" className="neon-glow-gold" />

                    {/* Suspension spring loops */}
                    <path d="M30 142 Q35 130 40 142 Q45 130 50 142" stroke="#64748b" strokeWidth="2" fill="none" />
                    <path d="M120 142 Q125 130 130 142 Q135 130 140 142" stroke="#64748b" strokeWidth="2" fill="none" />

                    {/* Tires */}
                    <circle cx="35" cy="155" r="17" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                    <circle cx="35" cy="155" r="7" fill="#cbd5e1" />
                    
                    <circle cx="125" cy="155" r="17" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                    <circle cx="125" cy="155" r="7" fill="#cbd5e1" />

                    {/* Elegant Cab Front */}
                    <path d="M110 90 L145 90 Q160 90 160 105 L160 145 L110 145 Z" fill="url(#truck-cab)" stroke="#94a3b8" strokeWidth="0.5" />
                    <path d="M136 94 L154 94 L149 114 L136 114 Z" fill="#0f172a" />
                    
                    {/* White Aluminum Cargo Container */}
                    <rect x="10" y="65" width="100" height="82" rx="3.5" fill="url(#truck-metal)" stroke="#94a3b8" strokeWidth="1.5" />
                    
                    {/* Stripe-inspired blue/cyan decals */}
                    <line x1="20" y1="102" x2="90" y2="102" stroke="#00f2fe" strokeWidth="4.5" className="neon-glow-cyan" />
                    <line x1="30" y1="112" x2="100" y2="112" stroke="#3b82f6" strokeWidth="3" className="neon-glow-blue" />

                    {/* Double back cargo doors (animated via scaleX with GSAP) */}
                    <rect x="4" y="68" width="6" height="76" fill="#334155" className="truck-door-left" />
                    <rect x="4" y="68" width="6" height="76" fill="#334155" className="truck-door-right" opacity="0" />
                    
                    {/* Door hinge line */}
                    <path d="M10 65 L10 147" stroke="#0f172a" strokeWidth="2" />
                  </g>

                  {/* Hand Trolley with Sealing Box */}
                  <g className="trolley-group" transform="translate(100, 155)">
                    {/* Steel trolley design */}
                    <path d="M4 0 L4 65 L36 65" stroke="#475569" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <circle cx="9" cy="65" r="8" fill="#0f172a" stroke="#334155" />
                    <circle cx="9" cy="65" r="3" fill="#fff" />
                    
                    {/* Sealed cardboard box */}
                    <g className="trolley-box" transform="translate(8, 16)">
                      <rect width="28" height="42" rx="1.5" fill="#e5a93b" stroke="#7e5109" />
                      <line x1="14" y1="0" x2="14" y2="42" stroke="#00f2fe" strokeWidth="2" className="neon-glow-cyan" />
                    </g>
                  </g>

                  {/* Worker illustration (Pushing the trolley) */}
                  <g className="worker-pushing" transform="translate(45, 90)">
                    {/* walking legs */}
                    <rect x="14" y="90" width="9" height="70" fill="#1e3a8a" rx="2" className="worker-leg-1" />
                    <rect x="26" y="90" width="9" height="70" fill="#1e3a8a" rx="2" className="worker-leg-2" />
                    
                    {/* Shoes */}
                    <rect x="10" y="156" width="13" height="6" fill="#0f172a" rx="1.5" />
                    <rect x="26" y="156" width="13" height="6" fill="#0f172a" rx="1.5" />

                    {/* Torso in Blue Shirt */}
                    <rect x="10" y="30" width="34" height="64" fill="#2563eb" rx="7" />
                    
                    {/* Face & Hair */}
                    <rect x="23" y="18" width="8" height="14" fill="#ffcc99" />
                    <circle cx="27" cy="11" r="13" fill="#ffcc99" />
                    <path d="M14 11 C14 2, 40 2, 40 11 Z" fill="#3e2723" />

                    {/* Pushing arms */}
                    <path d="M36 48 L65 55" stroke="#ffcc99" strokeWidth="6.5" strokeLinecap="round" fill="none" />
                    <path d="M31 52 L60 59" stroke="#ffcc99" strokeWidth="6.5" strokeLinecap="round" fill="none" />
                  </g>
                </svg>
              </div>

              {/* Scene 4: Doorstep Delivery */}
              <div className={`fulfillment-scene scene-4 ${activeStep === 4 ? "active" : ""}`}>
                <svg viewBox="0 0 400 300" width="100%" height="100%">
                  <defs>
                    <radialGradient id="success-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(16, 185, 129, 0.22)" />
                      <stop offset="100%" stopColor="rgba(5, 7, 11, 0)" />
                    </radialGradient>
                    <linearGradient id="door-color" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1e3a8a" />
                    </linearGradient>
                    <linearGradient id="wall-brick" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>
                  
                  {/* Glowing success matrix backdrop */}
                  <rect width="400" height="300" fill="url(#success-glow)" />
                  
                  {/* Subtle brick joint details */}
                  <g stroke="rgba(255, 255, 255, 0.015)" strokeWidth="1" fill="none">
                    <line x1="300" y1="50" x2="400" y2="50" />
                    <line x1="300" y1="100" x2="400" y2="100" />
                    <line x1="300" y1="150" x2="400" y2="150" />
                  </g>

                  {/* Ground line */}
                  <line x1="10" y1="240" x2="390" y2="240" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  <line x1="10" y1="242" x2="390" y2="242" stroke="rgba(16, 185, 129, 0.22)" strokeWidth="1" />

                  {/* Stylized Modern House Doorstep */}
                  <g className="doorstep-group" transform="translate(265, 70)">
                    {/* Wall cladding */}
                    <rect x="40" y="0" width="95" height="170" fill="url(#wall-brick)" opacity="0.4" stroke="rgba(255,255,255,0.03)" />
                    
                    {/* Glass Side window panels */}
                    <rect x="105" y="25" width="20" height="110" fill="rgba(0, 242, 254, 0.05)" stroke="#334155" strokeWidth="1.5" />
                    <line x1="105" y1="60" x2="125" y2="60" stroke="#334155" strokeWidth="1" />
                    <line x1="105" y1="95" x2="125" y2="95" stroke="#334155" strokeWidth="1" />

                    {/* Porch light lantern */}
                    <circle cx="20" cy="10" r="5" fill="#f59e0b" className="neon-glow-gold" />
                    <path d="M15 0 L25 0 L20 10 Z" fill="#334155" />

                    {/* Premium door entry */}
                    <rect x="0" y="20" width="60" height="150" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="2.5" />
                    <rect x="5" y="25" width="50" height="145" rx="1.5" fill="url(#door-color)" />
                    <circle cx="12" cy="98" r="3.5" fill="#fbbf24" className="neon-glow-gold" />
                    
                    {/* Welcome Mat */}
                    <ellipse cx="30" cy="170" rx="42" ry="8" fill="#334155" stroke="#475569" />
                    <text x="30" y="173" fill="#94a3b8" fontSize="5.5" fontFamily="monospace" textAnchor="middle" letterSpacing="0.5">WELCOME</text>
                  </g>

                  {/* Cardboard Box landing on welcome mat */}
                  <g className="delivered-box" transform="translate(280, 210)">
                    <rect x="0" y="10" width="32" height="22" rx="1" fill="#e5a93b" stroke="#926217" strokeWidth="1.5" />
                    {/* Flaps popping open (GSAP rotate) */}
                    <path d="M0 10 L-12 -3 L0 10 Z" fill="#b07d24" stroke="#7d520e" className="success-flap-l" />
                    <path d="M32 10 L44 -3 L32 10 Z" fill="#b07d24" stroke="#7d520e" className="success-flap-r" />
                  </g>

                  {/* Lounge chair popping out in glowing green outline */}
                  <g className="success-chair-glow neon-glow-green" stroke="#10b981" strokeWidth="1.5" fill="none" transform="translate(280, 160) scale(0.4)">
                    <ellipse cx="25" cy="50" rx="25" ry="7" />
                    <ellipse cx="25" cy="25" rx="30" ry="10" fill="rgba(5, 7, 11, 0.9)" />
                    <path d="M0 10 C0 -5, 50 -5, 50 10" strokeWidth="2" />
                    <path d="M25 50 L25 25" strokeWidth="2.5" />
                    <path d="M5 25 L45 25" strokeWidth="1" opacity="0.5" />
                  </g>

                  {/* Cargo truck coming from left side to doorstep */}
                  <g className="success-truck-group" transform="translate(-150, 75)">
                    <circle cx="35" cy="155" r="17" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                    <circle cx="125" cy="155" r="17" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                    <path d="M110 90 L145 90 Q160 90 160 105 L160 145 L110 145 Z" fill="url(#truck-cab)" />
                    <path d="M136 94 L154 94 L149 114 L136 114 Z" fill="#0f172a" />
                    <rect x="10" y="65" width="100" height="82" rx="3.5" fill="url(#truck-metal)" stroke="#94a3b8" strokeWidth="1.5" />
                    <line x1="20" y1="102" x2="90" y2="102" stroke="#00f2fe" strokeWidth="4.5" className="neon-glow-cyan" />
                    <line x1="30" y1="112" x2="100" y2="112" stroke="#3b82f6" strokeWidth="3" className="neon-glow-blue" />
                  </g>

                  {/* Giant floating validation checkmark */}
                  <g className="success-checkmark-glow neon-glow-green" transform="translate(180, 100)" opacity="0">
                    <circle cx="20" cy="20" r="26" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" strokeWidth="2" />
                    <path d="M10 20 L17 27 L30 14" stroke="#10b981" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </g>

                  {/* Cascading tech sparkles particles */}
                  <g className="confetti-burst" opacity="0">
                    <circle cx="280" cy="180" r="3.5" fill="#10b981" className="neon-glow-green" />
                    <rect x="305" y="188" width="5" height="5" fill="#f59e0b" transform="rotate(45)" />
                    <circle cx="265" cy="202" r="3.5" fill="#3b82f6" className="neon-glow-blue" />
                    <polygon points="295,206 298,212 304,212 299,216 301,222 295,218 289,222 291,216 286,212 292,212" fill="#fff" />
                  </g>
                </svg>
              </div>

            </div>

            {/* Active tracking index logs */}
            <div className="wireframe-label-tag">
              {activeStep === 1 && "STAGE: INTENT_TRIGGER"}
              {activeStep === 2 && "STAGE: PACKAGING_ENGINE"}
              {activeStep === 3 && "STAGE: TRANSIT_DISPATCH"}
              {activeStep === 4 && "STAGE: DELIVERED_SUCCESS"}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
