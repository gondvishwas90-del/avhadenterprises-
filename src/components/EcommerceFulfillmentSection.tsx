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


      </div>

    </section>
  );
}
