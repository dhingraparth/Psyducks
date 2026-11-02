import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Sun, 
  Moon, 
  Sunset, 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX, 
  X, 
  Sparkles, 
  Layers, 
  Eye, 
  CheckCircle2, 
  ArrowRight,
  Info
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function SpatialSimulation({
  onClose,
  onSelectProperty,
  property,
  onBookTour,
  lite = false
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [timeOfDay, setTimeOfDay] = useState('golden'); // 'morning', 'golden', 'midnight'
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cameraView, setCameraView] = useState('living');
  const [telemetry, setTelemetry] = useState({
    fps: 60,
    acoustics: '26.4 dB',
    lux: '480 LUX',
    co2: '415 PPM',
    temp: '21.5°C'
  });

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const lightsRef = useRef({});
  const particlesRef = useRef(null);
  const animationFrameRef = useRef(null);
  const isDraggingRef = useRef(false);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.15, y: -0.4 });
  const currentRotationRef = useRef({ x: 0.15, y: -0.4 });

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene, Camera, Renderer
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF5F4EE);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 7.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: !lite,
      powerPreference: lite ? "low-power" : "high-performance",
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lite ? 1 : 1.5));
    renderer.shadowMap.enabled = !lite;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    rendererRef.current = renderer;

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffddaa, 2.2);
    sunLight.position.set(8, 9, 5);
    sunLight.castShadow = !lite;
    sunLight.shadow.mapSize.width = 512;
    sunLight.shadow.mapSize.height = 512;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 25;
    scene.add(sunLight);

    // Warm pendant lamp point light
    const lampLight = new THREE.PointLight(0xff9944, 1.8, 10);
    lampLight.position.set(-1.2, 2.6, 0.5);
    lampLight.castShadow = false;
    scene.add(lampLight);

    lightsRef.current = { ambientLight, sunLight, lampLight };

    // 3. Architectural Geometry: Modern Scandinavian Loft
    // Floor: Bleached Scandinavian Oak
    const floorGeo = new THREE.PlaneGeometry(16, 16);
    const floorMat = new THREE.MeshStandardMaterial({ 
      color: 0xDDD6C8, 
      roughness: 0.45, 
      metalness: 0.05 
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Back Wall: Soft Off-White Plaster
    const backWallGeo = new THREE.PlaneGeometry(16, 7);
    const wallMat = new THREE.MeshStandardMaterial({ 
      color: 0xECE9DF, 
      roughness: 0.85 
    });
    const backWall = new THREE.Mesh(backWallGeo, wallMat);
    backWall.position.set(0, 3.5, -4);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Left Wall
    const leftWallGeo = new THREE.PlaneGeometry(16, 7);
    const leftWall = new THREE.Mesh(leftWallGeo, wallMat);
    leftWall.position.set(-8, 3.5, 4);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Right Wall with Massive Panoramic Window
    const rightWallGeo = new THREE.BoxGeometry(0.3, 7, 5);
    const rightWall = new THREE.Mesh(rightWallGeo, wallMat);
    rightWall.position.set(7.9, 3.5, -1.5);
    scene.add(rightWall);

    // Glass Window Pane
    const windowGeo = new THREE.PlaneGeometry(8, 5.5);
    const windowMat = new THREE.MeshStandardMaterial({
      color: 0x9ec8d6,
      transparent: true,
      opacity: 0.35,
      roughness: 0.12,
      metalness: 0.2
    });
    const windowMesh = new THREE.Mesh(windowGeo, windowMat);
    windowMesh.position.set(7.85, 3.5, 4.5);
    windowMesh.rotation.y = -Math.PI / 2;
    scene.add(windowMesh);

    // Window Frame Grid
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x1E2229, roughness: 0.5 });
    for (let i = 0; i <= 3; i++) {
      const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 5.5, 0.08), frameMat);
      vBar.position.set(7.85, 3.5, 1 + i * 2.3);
      scene.add(vBar);
    }

    // 4. Modern Furniture
    // Minimalist Low-Profile Sectional Sofa (Charcoal / Oatmeal)
    const sofaBaseGeo = new THREE.BoxGeometry(4.2, 0.5, 2.2);
    const sofaMat = new THREE.MeshStandardMaterial({ color: 0x363C46, roughness: 0.9 });
    const sofaBase = new THREE.Mesh(sofaBaseGeo, sofaMat);
    sofaBase.position.set(-1.8, 0.25, 0.5);
    sofaBase.castShadow = true;
    sofaBase.receiveShadow = true;
    scene.add(sofaBase);

    // Sofa Backrest
    const sofaBackGeo = new THREE.BoxGeometry(4.2, 0.9, 0.4);
    const sofaBack = new THREE.Mesh(sofaBackGeo, sofaMat);
    sofaBack.position.set(-1.8, 0.75, -0.4);
    sofaBack.castShadow = true;
    scene.add(sofaBack);

    // Terracotta Cushion Accent
    const cushionGeo = new THREE.BoxGeometry(0.7, 0.6, 0.2);
    const cushionMat = new THREE.MeshStandardMaterial({ color: 0xE07A5F, roughness: 0.7 });
    const cushion = new THREE.Mesh(cushionGeo, cushionMat);
    cushion.position.set(-0.8, 0.8, -0.2);
    cushion.rotation.z = 0.1;
    scene.add(cushion);

    // Architectural Oak Coffee Table
    const tableTopGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.08, 32);
    const oakMat = new THREE.MeshStandardMaterial({ color: 0xBA9873, roughness: 0.6 });
    const coffeeTable = new THREE.Mesh(tableTopGeo, oakMat);
    coffeeTable.position.set(-1.8, 0.45, 2.2);
    coffeeTable.castShadow = true;
    coffeeTable.receiveShadow = true;
    scene.add(coffeeTable);

    // Coffee table cylindrical legs
    for (let a = 0; a < 3; a++) {
      const angle = (a * 2 * Math.PI) / 3;
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.42, 16), oakMat);
      leg.position.set(-1.8 + Math.cos(angle) * 0.7, 0.21, 2.2 + Math.sin(angle) * 0.7);
      leg.castShadow = true;
      scene.add(leg);
    }

    // Modern Ceramic Vase with Olive Branch on table
    const vaseGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.35, 16);
    const vaseMat = new THREE.MeshStandardMaterial({ color: 0xF5F0E6, roughness: 0.3 });
    const vase = new THREE.Mesh(vaseGeo, vaseMat);
    vase.position.set(-1.8, 0.66, 2.2);
    scene.add(vase);

    // Kitchen Island in the background
    const islandGeo = new THREE.BoxGeometry(3.6, 1.2, 1.6);
    const marbleMat = new THREE.MeshStandardMaterial({ color: 0xF0ECE1, roughness: 0.2, metalness: 0.1 });
    const island = new THREE.Mesh(islandGeo, marbleMat);
    island.position.set(3.2, 0.6, -1.8);
    island.castShadow = true;
    island.receiveShadow = true;
    scene.add(island);

    // Barstools
    for (let s = 0; s < 2; s++) {
      const stoolSeat = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.06, 24), oakMat);
      stoolSeat.position.set(2.4 + s * 1.5, 0.85, -0.6);
      stoolSeat.castShadow = true;
      scene.add(stoolSeat);

      const stoolLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.82, 16), frameMat);
      stoolLeg.position.set(2.4 + s * 1.5, 0.41, -0.6);
      scene.add(stoolLeg);
    }

    // Noguchi Paper Lantern Pendant hanging above living area
    const lampGeo = new THREE.SphereGeometry(0.65, 24, 24);
    lampGeo.scale(1, 0.8, 1);
    const paperMat = new THREE.MeshStandardMaterial({ 
      color: 0xFFF3DD, 
      roughness: 0.9, 
      emissive: 0xFFA500, 
      emissiveIntensity: 0.45 
    });
    const paperLamp = new THREE.Mesh(lampGeo, paperMat);
    paperLamp.position.set(-1.2, 3.4, 0.5);
    scene.add(paperLamp);

    // Hanging cord
    const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 2.5, 8), frameMat);
    cord.position.set(-1.2, 4.6, 0.5);
    scene.add(cord);

    // Large Fiddle Leaf Fig indoor tree
    const potGeo = new THREE.CylinderGeometry(0.45, 0.35, 0.7, 24);
    const potMat = new THREE.MeshStandardMaterial({ color: 0xC86146, roughness: 0.7 });
    const pot = new THREE.Mesh(potGeo, potMat);
    pot.position.set(-5.5, 0.35, -2.5);
    pot.castShadow = true;
    scene.add(pot);

    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 2.2, 12), new THREE.MeshStandardMaterial({ color: 0x4A3728 }));
    trunk.position.set(-5.5, 1.4, -2.5);
    scene.add(trunk);

    // Tree Foliage Spheres
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x3D5A50, roughness: 0.6 });
    for (let f = 0; f < 5; f++) {
      const foliage = new THREE.Mesh(new THREE.DodecahedronGeometry(0.55 + (f % 2) * 0.2), foliageMat);
      foliage.position.set(
        -5.5 + (Math.sin(f * 1.5) * 0.4),
        2.2 + f * 0.35,
        -2.5 + (Math.cos(f * 1.5) * 0.4)
      );
      foliage.castShadow = true;
      scene.add(foliage);
    }

    // 5. Ambient Atmospheric Dust / Sunlight Particles
    const particleCount = lite ? 40 : 80;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 12;
      particlePos[i + 1] = Math.random() * 5 + 0.5;
      particlePos[i + 2] = (Math.random() - 0.5) * 10;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xFFF5E0,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 6. Interactive Mouse / Touch Drag Orbiting
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) {
        if (lite) return;
        const rect = containerRef.current.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetRotationRef.current.y = -0.4 + normX * 0.18;
        targetRotationRef.current.x = 0.15 + normY * 0.1;
        return;
      }
      const deltaX = e.clientX - mousePosRef.current.x;
      const deltaY = e.clientY - mousePosRef.current.y;
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      targetRotationRef.current.y += deltaX * 0.005;
      targetRotationRef.current.x += deltaY * 0.005;

      // Clamp vertical rotation
      targetRotationRef.current.x = Math.max(-0.2, Math.min(0.45, targetRotationRef.current.x));
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const newFov = camera.fov + e.deltaY * 0.02;
      camera.fov = Math.max(30, Math.min(70, newFov));
      camera.updateProjectionMatrix();
    };

    const domElement = containerRef.current;
    const pausedRef = { current: false };
    domElement.addEventListener('mousedown', handleMouseDown);
    domElement.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    if (!lite) {
      domElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    // 7. Render Animation Loop
    let lastTime = performance.now();
    let frameCount = 0;

    const animate = (time) => {
      animationFrameRef.current = requestAnimationFrame(animate);
      if (pausedRef.current || document.hidden) return;

      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;

      const radius = 7.8;
      camera.position.x = Math.sin(currentRotationRef.current.y) * radius;
      camera.position.z = Math.cos(currentRotationRef.current.y) * radius;
      camera.position.y = 3.2 + currentRotationRef.current.x * 3.5;
      camera.lookAt(0, 1.4, 0);

      if (particlesRef.current) {
        particlesRef.current.rotation.y = time * 0.00004;
        particlesRef.current.position.y = Math.sin(time * 0.0004) * 0.12;
      }

      frameCount++;
      if (!lite && time - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = time;
        setTelemetry((prev) => (prev.fps === fps ? prev : { ...prev, fps }));
      }

      renderer.render(scene, camera);
    };

    animate(performance.now());

    // 8. Handle Window Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const io = new IntersectionObserver(([entry]) => {
      pausedRef.current = !entry.isIntersecting;
    }, { threshold: 0.08 });
    io.observe(domElement);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('mousedown', handleMouseDown);
      domElement.removeEventListener('mousemove', handleMouseMove);
      domElement.removeEventListener('wheel', handleWheel);
      io.disconnect();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => m.dispose());
        }
      });
      renderer.dispose();
    };
  }, [lite]);

  // Update Lighting according to Time of Day
  useEffect(() => {
    if (!lightsRef.current.sunLight || !sceneRef.current) return;
    const { sunLight, ambientLight, lampLight } = lightsRef.current;

    soundEngine.playHover();

    if (timeOfDay === 'morning') {
      sceneRef.current.background = new THREE.Color(0xF0F4F8);
      ambientLight.color.setHex(0xE5F0F8);
      ambientLight.intensity = 1.0;
      sunLight.color.setHex(0xFFF0D6);
      sunLight.intensity = 2.4;
      sunLight.position.set(10, 6, 6);
      lampLight.intensity = 0.6;
      setTelemetry(prev => ({ ...prev, lux: '620 LUX', temp: '20.2°C' }));
    } else if (timeOfDay === 'golden') {
      sceneRef.current.background = new THREE.Color(0xFAF4E8);
      ambientLight.color.setHex(0xFFECD6);
      ambientLight.intensity = 0.9;
      sunLight.color.setHex(0xFFB570);
      sunLight.intensity = 2.8;
      sunLight.position.set(8, 5, 4);
      lampLight.intensity = 1.6;
      setTelemetry(prev => ({ ...prev, lux: '480 LUX', temp: '21.5°C' }));
    } else if (timeOfDay === 'midnight') {
      sceneRef.current.background = new THREE.Color(0x0E1318);
      ambientLight.color.setHex(0x1B2430);
      ambientLight.intensity = 0.35;
      sunLight.color.setHex(0x3B4A6B);
      sunLight.intensity = 0.4;
      sunLight.position.set(-6, 8, -4);
      lampLight.intensity = 3.2; // Warm paper lamp shines brightly at night
      setTelemetry(prev => ({ ...prev, lux: '85 LUX', temp: '22.0°C' }));
    }
  }, [timeOfDay]);

  const switchCameraView = (viewKey) => {
    soundEngine.playClick();
    setCameraView(viewKey);
    if (viewKey === 'living') {
      targetRotationRef.current = { x: 0.15, y: -0.4 };
    } else if (viewKey === 'kitchen') {
      targetRotationRef.current = { x: 0.1, y: 0.9 };
    } else if (viewKey === 'suite') {
      targetRotationRef.current = { x: 0.25, y: 2.3 };
    } else if (viewKey === 'terrace') {
      targetRotationRef.current = { x: -0.05, y: -1.4 };
    }
  };

  const hotspots = [
    {
      id: 'living',
      title: 'Acoustic Living Commons',
      tag: 'Sanctuary Grade',
      desc: 'Sound-dampened ceiling & triple-glazed glass guarantee under 28dB ambient sound for deep focus.',
      x: '34%',
      y: '58%',
      details: 'Weekly Sunday brunch circle, Sonos multi-room sound, Scandinavian wood stove.'
    },
    {
      id: 'suite',
      title: 'Suite 02 — Astrid & Vacant Room',
      tag: 'Available Dec 1st',
      desc: 'En-suite bath, custom white oak closet, $1,450/month inclusive of fiber & weekly cleaning.',
      x: '72%',
      y: '42%',
      action: 'book',
      details: '98% Compatibility match with current housemates.'
    },
    {
      id: 'kitchen',
      title: 'Chef Kitchen & Pour-Over Bar',
      tag: 'Shared Space',
      desc: 'Miele gas cooktop, sub-zero refrigeration, and automated monthly organic spice restock.',
      x: '55%',
      y: '48%',
      details: 'Shared dishwasher clean-as-you-go pledge.'
    }
  ];

  return (
    <div 
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-charcoal-800 text-ivory select-none transition-all duration-500 ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen' : 'h-[480px] md:h-[560px] rounded-3xl shadow-soft-xl border border-charcoal-400/30'
      }`}
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />

      {/* Real-time HUD Grid Corners */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-terracotta pointer-events-none" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-terracotta pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-terracotta pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-terracotta pointer-events-none" />

      {/* Top HUD Bar */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
        {/* Left Telemetry */}
        <div className="flex items-center gap-3 glass-pill px-3.5 py-1.5 rounded-full pointer-events-auto border border-white/10 text-charcoal dark:text-ivory">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono text-[11px] font-semibold tracking-wider text-charcoal dark:text-ivory">
            3D SPATIAL SIMULATION [LIVE]
          </span>
          <span className="text-white/20">|</span>
          <span className="font-mono text-[10px] text-charcoal-300 dark:text-charcoal-200">
            {telemetry.fps} FPS • {telemetry.temp} • {telemetry.acoustics}
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Time of Day Lighting Modes */}
          <div className="flex items-center gap-1 bg-charcoal-700/80 p-1 rounded-full border border-white/15 backdrop-blur-md">
            <button
              onClick={() => setTimeOfDay('morning')}
              className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
                timeOfDay === 'morning' ? 'bg-amber-100 text-charcoal shadow-sm' : 'text-ivory-300 hover:text-white'
              }`}
              title="Morning Sunlight"
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Morning</span>
            </button>
            <button
              onClick={() => setTimeOfDay('golden')}
              className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
                timeOfDay === 'golden' ? 'bg-terracotta text-white shadow-sm' : 'text-ivory-300 hover:text-white'
              }`}
              title="Golden Hour"
            >
              <Sunset className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Golden</span>
            </button>
            <button
              onClick={() => setTimeOfDay('midnight')}
              className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
                timeOfDay === 'midnight' ? 'bg-indigo-900 text-white shadow-sm' : 'text-ivory-300 hover:text-white'
              }`}
              title="Midnight Lounge"
            >
              <Moon className="w-3.5 h-3.5 text-indigo-300" />
              <span className="hidden sm:inline">Night</span>
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-full bg-charcoal-700/80 hover:bg-charcoal-600 text-ivory border border-white/15 backdrop-blur-md transition-all"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Sim"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close simulation if modal */}
          {onClose && (
            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="p-2 rounded-full bg-terracotta hover:bg-terracotta-dark text-white shadow-sm transition-all"
              title="Exit Simulation"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Floating 3D Interactive Hotspot Markers */}
      {hotspots.map((spot) => (
        <div
          key={spot.id}
          style={{ top: spot.y, left: spot.x }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
        >
          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveHotspot(activeHotspot?.id === spot.id ? null : spot);
            }}
            className="relative flex items-center justify-center focus:outline-none"
          >
            {!lite && <span className="absolute w-8 h-8 rounded-full bg-terracotta/30 animate-ping pointer-events-none" />}
            <span className="relative w-7 h-7 rounded-full bg-charcoal-700 text-ivory border-2 border-terracotta flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            </span>
          </button>

          {/* Hover Pill Label */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-8 hidden group-hover:block whitespace-nowrap bg-charcoal-800/95 text-white text-[11px] font-medium px-2.5 py-1 rounded-md border border-white/20 shadow-xl pointer-events-none">
            {spot.title}
          </div>
        </div>
      ))}

      {/* Active Hotspot Info Card */}
      {activeHotspot && (
        <div className="absolute top-20 right-6 w-80 bg-charcoal-800/95 backdrop-blur-md border border-terracotta/40 rounded-2xl p-4 shadow-2xl z-30 animate-fadeIn text-ivory">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-terracotta font-semibold bg-terracotta/10 px-2 py-0.5 rounded-full">
                {activeHotspot.tag}
              </span>
              <h4 className="font-semibold text-base text-white mt-1">{activeHotspot.title}</h4>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="p-1 text-charcoal-200 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-charcoal-100 leading-relaxed mb-3">
            {activeHotspot.desc}
          </p>
          <div className="text-[11px] bg-charcoal-700/60 p-2.5 rounded-xl border border-white/5 mb-3 text-ivory-200">
            <span className="text-terracotta font-semibold">Living Standard: </span>
            {activeHotspot.details}
          </div>

          {activeHotspot.action === 'book' ? (
            <button
              onClick={() => {
                soundEngine.playSuccess();
                if (onBookTour) onBookTour(property);
              }}
              className="w-full py-2 px-3 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>Schedule Walkthrough / Apply</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveHotspot(null);
              }}
              className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-all text-center"
            >
              Dismiss Info
            </button>
          )}
        </div>
      )}

      {/* Bottom Camera Viewport Presets & Navigation Bar */}
      <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Camera Views */}
        <div className="flex items-center gap-1.5 glass-pill px-3 py-1.5 rounded-full pointer-events-auto border border-white/10 text-charcoal dark:text-ivory shadow-lg">
          <span className="text-[10px] font-mono uppercase tracking-wider text-terracotta font-bold hidden sm:inline mr-1">
            Camera Angles:
          </span>
          <button
            onClick={() => switchCameraView('living')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              cameraView === 'living' ? 'bg-charcoal text-ivory dark:bg-terracotta dark:text-white shadow-sm' : 'hover:bg-white/10 text-charcoal-300 dark:text-ivory-200'
            }`}
          >
            Living Commons
          </button>
          <button
            onClick={() => switchCameraView('kitchen')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              cameraView === 'kitchen' ? 'bg-charcoal text-ivory dark:bg-terracotta dark:text-white shadow-sm' : 'hover:bg-white/10 text-charcoal-300 dark:text-ivory-200'
            }`}
          >
            Chef's Kitchen
          </button>
          <button
            onClick={() => switchCameraView('suite')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              cameraView === 'suite' ? 'bg-charcoal text-ivory dark:bg-terracotta dark:text-white shadow-sm' : 'hover:bg-white/10 text-charcoal-300 dark:text-ivory-200'
            }`}
          >
            Available Suite
          </button>
        </div>

        {/* Interaction Hint */}
        <div className="hidden md:flex items-center gap-2 bg-charcoal-900/80 px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] text-charcoal-100 font-mono pointer-events-auto">
          <span>Click & Drag to Orbit • Scroll to Zoom</span>
        </div>
      </div>
    </div>
  );
}
