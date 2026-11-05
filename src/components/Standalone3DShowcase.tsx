import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import gsap from 'gsap';
import {
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  Github,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { SHOWCASE_PROJECTS, type ShowcaseProject } from '../data/projectsData';
import VideoWatermarkOverlay from './VideoWatermarkOverlay';

type FormationMode = 'orbit' | 'helix' | 'constellation';

interface PanelPose {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  scale: number;
}

/**
 * Generates a soft radial glow sprite texture for 3D network nodes
 */
function createGlowNodeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(224, 242, 254, 1)');
  grad.addColorStop(0.25, 'rgba(56, 189, 248, 0.85)');
  grad.addColorStop(0.6, 'rgba(14, 165, 233, 0.25)');
  grad.addColorStop(1, 'rgba(2, 6, 17, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Generates a diagonal glass reflection sheen texture
 */
function createGlassSheenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createLinearGradient(0, 0, 256, 256);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.24)');
  grad.addColorStop(0.35, 'rgba(186, 230, 253, 0.07)');
  grad.addColorStop(0.55, 'rgba(255, 255, 255, 0)');
  grad.addColorStop(1, 'rgba(56, 189, 248, 0.1)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Generates a soft radial drop-shadow texture for floating 3D glass panels
 */
function createDropShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(128, 128, 24, 128, 128, 124);
  grad.addColorStop(0, 'rgba(2, 6, 17, 0.72)');
  grad.addColorStop(0.55, 'rgba(3, 12, 30, 0.35)');
  grad.addColorStop(1, 'rgba(2, 6, 17, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Creates a procedural studio environment cubemap/equirectangular texture
 * so MeshPhysicalMaterial glass panels have realistic reflections
 */
function createProceduralEnvMap(renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x030816);

  const light1 = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide })
  );
  light1.position.set(8, 10, 8);
  light1.lookAt(0, 0, 0);
  envScene.add(light1);

  const light2 = new THREE.Mesh(
    new THREE.PlaneGeometry(24, 12),
    new THREE.MeshBasicMaterial({ color: 0x1d4ed8, side: THREE.DoubleSide })
  );
  light2.position.set(-12, -6, 6);
  light2.lookAt(0, 0, 0);
  envScene.add(light2);

  const light3 = new THREE.Mesh(
    new THREE.PlaneGeometry(16, 16),
    new THREE.MeshBasicMaterial({ color: 0xe0f2fe, side: THREE.DoubleSide })
  );
  light3.position.set(0, 14, -10);
  light3.lookAt(0, 0, 0);
  envScene.add(light3);

  const renderTarget = pmrem.fromScene(envScene, 0.04);
  pmrem.dispose();
  light1.geometry.dispose();
  (light1.material as THREE.Material).dispose();
  light2.geometry.dispose();
  (light2.material as THREE.Material).dispose();
  light3.geometry.dispose();
  (light3.material as THREE.Material).dispose();

  return renderTarget.texture;
}

/**
 * Creates a high-resolution CanvasTexture for a project panel,
 * rendering a sleek dark-glass placeholder immediately and updating
 * with the real website screenshot + subtle anti-theft watermark once loaded.
 */
function createProjectScreenTexture(
  project: ShowcaseProject,
  maxAnisotropy: number
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d')!;

  const drawWatermark = () => {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(-Math.PI / 7);
    ctx.font = '700 22px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.11)';
    for (let y = -480; y <= 480; y += 160) {
      for (let x = -640; x <= 640; x += 380) {
        ctx.fillText('JERIC DE LOS REYES', x, y);
      }
    }
    ctx.restore();
  };

  // Initial sleek dark glass UI frame while image loads
  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 640);
  bgGrad.addColorStop(0, '#071124');
  bgGrad.addColorStop(1, '#030712');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 640);

  ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
  ctx.font = '600 18px monospace';
  ctx.fillText(project.categoryLabel.toUpperCase(), 48, 280);

  ctx.fillStyle = '#f8fafc';
  ctx.font = '700 34px Inter, system-ui, sans-serif';
  ctx.fillText(project.title.split('—')[0].trim(), 48, 332);
  drawWatermark();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(8, maxAnisotropy);

  const drawMediaToCanvas = (source: HTMLImageElement | HTMLVideoElement, srcW: number, srcH: number) => {
    ctx.clearRect(0, 0, 1024, 640);
    const imgRatio = srcW / srcH;
    const canvasRatio = 1024 / 640;
    let drawW = 1024;
    let drawH = 640;
    let offsetX = 0;

    if (imgRatio > canvasRatio) {
      drawW = 640 * imgRatio;
      offsetX = (1024 - drawW) / 2;
    } else {
      drawH = 1024 / imgRatio;
    }

    ctx.drawImage(source, offsetX, 0, drawW, drawH);

    // Subtle bottom vignette for depth
    const vig = ctx.createLinearGradient(0, 460, 0, 640);
    vig.addColorStop(0, 'rgba(2, 6, 17, 0)');
    vig.addColorStop(1, 'rgba(2, 6, 17, 0.55)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 460, 1024, 180);

    drawWatermark();
    texture.needsUpdate = true;
  };

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    drawMediaToCanvas(img, img.width, img.height);
  };
  img.onerror = () => {
    if (!project.videoUrl) return;
    const vid = document.createElement('video');
    vid.crossOrigin = 'anonymous';
    vid.muted = true;
    vid.playsInline = true;
    vid.preload = 'metadata';
    vid.onloadeddata = () => {
      vid.currentTime = 0.5;
    };
    vid.onseeked = () => {
      if (vid.videoWidth > 0 && vid.videoHeight > 0) {
        drawMediaToCanvas(vid, vid.videoWidth, vid.videoHeight);
      }
      vid.src = '';
    };
    vid.src = project.videoUrl;
  };
  img.src = project.image;

  return texture;
}

/**
 * Computes 3D spatial poses (different depths, sizes, angles, and rotations)
 * for each formation mode.
 */
function computeFormationPoses(count: number, mode: FormationMode): PanelPose[] {
  const poses: PanelPose[] = [];

  for (let i = 0; i < count; i++) {
    const t = i / count;
    const angle = t * Math.PI * 2;

    if (mode === 'orbit') {
      // Multi-depth 3D orbital ring with varied depths, heights, angles, and sizes
      const radiusX = 7.4 + Math.sin(i * 1.7) * 1.3;
      const radiusZ = 5.8 + Math.cos(i * 1.3) * 1.4;
      const x = Math.sin(angle) * radiusX;
      const z = Math.cos(angle) * radiusZ - 2.2;
      const y = Math.sin(angle * 2 + i * 0.6) * 1.85;

      // Face generally toward viewer/center with subtle organic tilt
      const ry = Math.sin(angle) * 0.42;
      const rx = -y * 0.06 + Math.cos(i * 2.1) * 0.06;
      const rz = Math.sin(i * 1.9) * 0.05;
      const scale = 0.84 + ((i * 7) % 5) * 0.09; // 0.84 to 1.20

      poses.push({ x, y, z, rx, ry, rz, scale });
    } else if (mode === 'helix') {
      // Sweeping 3D depth helix receding into space
      const spiralAngle = i * 0.78;
      const radius = 3.6 + (i % 4) * 0.85;
      const x = Math.cos(spiralAngle) * radius;
      const y = Math.sin(spiralAngle) * (radius * 0.62);
      const z = 3.2 - i * 0.72;

      const ry = -x * 0.075;
      const rx = y * 0.055;
      const rz = Math.sin(spiralAngle) * 0.06;
      const scale = 0.88 + (i % 3) * 0.12;

      poses.push({ x, y, z, rx, ry, rz, scale });
    } else {
      // Futuristic 3D Constellation Cloud (foreground, mid-ground, and distant screens)
      const goldenAngle = i * 2.3999632;
      const spread = 2.6 + Math.sqrt(i + 1) * 1.55;
      const x = Math.cos(goldenAngle) * spread * 1.25;
      const y = Math.sin(goldenAngle) * spread * 0.72;
      const z = 2.8 - ((i * 5) % count) * 0.68;

      const ry = -x * 0.065;
      const rx = y * 0.05;
      const rz = Math.cos(i * 1.4) * 0.06;
      const scale = 0.78 + ((i * 3) % 5) * 0.11;

      poses.push({ x, y, z, rx, ry, rz, scale });
    }
  }

  return poses;
}

export default function Standalone3DShowcase() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [formation, setFormation] = useState<FormationMode>('orbit');
  const [hoveredProject, setHoveredProject] = useState<ShowcaseProject | null>(null);
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  // Modal video controls
  const [isModalPlaying, setIsModalPlaying] = useState(true);
  const [isModalMuted, setIsModalMuted] = useState(true);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const modalTheaterRef = useRef<HTMLDivElement>(null);

  // Refs for imperative GSAP transitions from React controls
  const formationCallbackRef = useRef<((mode: FormationMode) => void) | null>(null);
  const stepFocusCallbackRef = useRef<((dir: 1 | -1) => void) | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const projects = SHOWCASE_PROJECTS;
    const count = projects.length;

    // 1. Software-WebGL Guard (per Three.js skill spec)
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020611);
    scene.fog = new THREE.FogExp2(0x020611, 0.036);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 10.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const envMap = createProceduralEnvMap(renderer);
    scene.environment = envMap;

    // Post-processing UnrealBloomPass on GPU for electric-blue network & edge glow
    const composer = !isSoftwareGl ? new EffectComposer(renderer) : null;
    if (composer) {
      composer.setSize(width, height);
      composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      composer.addPass(new RenderPass(scene, camera));
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        0.55,
        0.45,
        0.72
      );
      composer.addPass(bloomPass);
      composer.addPass(new OutputPass());
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 3. Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0x1e3a5f, 1.15);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xe0f2fe, 2.0);
    keyLight.position.set(6, 10, 12);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.45);
    rimLight.position.set(-10, -4, -6);
    scene.add(rimLight);

    const cyanPointLight = new THREE.PointLight(0x00d2ff, 3.5, 26, 1.5);
    cyanPointLight.position.set(4, 3, 5);
    scene.add(cyanPointLight);

    const indigoPointLight = new THREE.PointLight(0x6366f1, 2.8, 26, 1.5);
    indigoPointLight.position.set(-5, -2, 3);
    scene.add(indigoPointLight);

    // Animate lights smoothly with GSAP for living glass reflections
    const lightTween1 = gsap.to(cyanPointLight.position, {
      x: -4.5,
      y: -2.5,
      z: 6.5,
      duration: 7,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      paused: prefersReducedMotion,
    });
    const lightTween2 = gsap.to(indigoPointLight.position, {
      x: 5.5,
      y: 3.2,
      z: 2.0,
      duration: 8.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      paused: prefersReducedMotion,
    });

    // 4. Root Showcase Group (rotates smoothly on scroll/drag/idle)
    const showcaseGroup = new THREE.Group();
    scene.add(showcaseGroup);

    // 5. Build 3D Floating Glass Project Panels
    const panelWidth = 2.65;
    const panelHeight = 1.66;
    const glassGeo = new THREE.BoxGeometry(panelWidth, panelHeight, 0.055);
    const bezelGeo = new THREE.BoxGeometry(panelWidth + 0.04, panelHeight + 0.04, 0.036);
    const screenGeo = new THREE.PlaneGeometry(panelWidth - 0.08, panelHeight - 0.08);
    const sheenGeo = new THREE.PlaneGeometry(panelWidth - 0.06, panelHeight - 0.06);
    const shadowGeo = new THREE.PlaneGeometry(panelWidth * 1.24, panelHeight * 1.28);
    const edgesGeo = new THREE.EdgesGeometry(
      new THREE.BoxGeometry(panelWidth + 0.045, panelHeight + 0.045, 0.065)
    );

    const sheenTexture = createGlassSheenTexture();
    const sheenMat = new THREE.MeshBasicMaterial({
      map: sheenTexture,
      transparent: true,
      opacity: 0.44,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const shadowTexture = createDropShadowTexture();
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });

    const bezelMaterial = new THREE.MeshStandardMaterial({
      color: 0x071226,
      metalness: 0.85,
      roughness: 0.22,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x09152b,
      metalness: 0.12,
      roughness: 0.1,
      transmission: isSoftwareGl ? 0 : 0.42,
      thickness: 0.25,
      ior: 1.52,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 0.95,
      transparent: true,
      opacity: 0.78,
    });

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const initialPoses = computeFormationPoses(count, 'orbit');

    interface PanelRig {
      root: THREE.Group;
      floatGroup: THREE.Group;
      hitMesh: THREE.Mesh;
      edgeMat: THREE.LineBasicMaterial;
      screenMat: THREE.MeshBasicMaterial;
      screenTex: THREE.CanvasTexture;
      project: ShowcaseProject;
      index: number;
    }

    const panelRigs: PanelRig[] = [];
    const hitMeshes: THREE.Mesh[] = [];
    const floatTweens: gsap.core.Tween[] = [];

    projects.forEach((project, idx) => {
      const pose = initialPoses[idx];

      // Root group controlled by formation transitions
      const root = new THREE.Group();
      root.position.set(pose.x, pose.y, pose.z);
      root.rotation.set(pose.rx, pose.ry, pose.rz);
      root.scale.setScalar(pose.scale);

      // Inner floatGroup controlled by continuous GSAP floating/breathing/rotation
      const floatGroup = new THREE.Group();
      root.add(floatGroup);

      // Soft Drop Shadow behind glass panel
      const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
      shadowMesh.position.set(0, -0.08, -0.14);
      floatGroup.add(shadowMesh);

      // Anodized Metallic Bezel Frame
      const bezelMesh = new THREE.Mesh(bezelGeo, bezelMaterial);
      bezelMesh.position.z = -0.008;
      floatGroup.add(bezelMesh);

      // 3D Glass Backing Slab
      const glassMesh = new THREE.Mesh(glassGeo, glassMaterial);
      floatGroup.add(glassMesh);

      // Website Screenshot Screen
      const screenTex = createProjectScreenTexture(project, maxAnisotropy);
      const screenMat = new THREE.MeshBasicMaterial({
        map: screenTex,
        transparent: true,
        opacity: 0.96,
      });
      const screenMesh = new THREE.Mesh(screenGeo, screenMat);
      screenMesh.position.z = 0.032;
      screenMesh.userData = { projectIndex: idx };
      floatGroup.add(screenMesh);

      // Subtle Glass Specular Reflection Sheen
      const sheenMesh = new THREE.Mesh(sheenGeo, sheenMat);
      sheenMesh.position.z = 0.038;
      floatGroup.add(sheenMesh);

      // Glowing Electric-Blue Edge Frame
      const edgeMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.55,
      });
      const edgeLines = new THREE.LineSegments(edgesGeo, edgeMat);
      floatGroup.add(edgeLines);

      showcaseGroup.add(root);
      hitMeshes.push(screenMesh);
      panelRigs.push({
        root,
        floatGroup,
        hitMesh: screenMesh,
        edgeMat,
        screenMat,
        screenTex,
        project,
        index: idx,
      });

      // Continuous, organic GSAP floating, depth breathing & subtle 3D rotation
      if (!prefersReducedMotion) {
        const floatDuration = 3.6 + (idx % 5) * 0.55;
        const floatDelay = -(idx * 0.45);

        floatTweens.push(
          gsap.to(floatGroup.position, {
            y: 0.16 + (idx % 3) * 0.05,
            z: 0.22 + (idx % 4) * 0.06,
            duration: floatDuration,
            delay: floatDelay,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })
        );

        floatTweens.push(
          gsap.to(floatGroup.rotation, {
            x: (idx % 2 === 0 ? 1 : -1) * 0.045,
            y: (idx % 3 === 0 ? 1 : -1) * 0.06,
            z: (idx % 2 === 0 ? -1 : 1) * 0.03,
            duration: floatDuration * 1.25,
            delay: floatDelay,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })
        );
      }
    });

    // 6. Futuristic Electric-Blue Interconnected Network Background
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    const nodeCount = 90;
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeVelocities: { vx: number; vy: number; vz: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodePositions[i * 3] = (Math.random() - 0.5) * 28;
      nodePositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      nodePositions[i * 3 + 2] = (Math.random() - 0.5) * 18 - 3;
      nodeVelocities.push({
        vx: (Math.random() - 0.5) * 0.006,
        vy: (Math.random() - 0.5) * 0.006,
        vz: (Math.random() - 0.5) * 0.005,
      });
    }

    const nodesGeo = new THREE.BufferGeometry();
    nodesGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    const nodeTexture = createGlowNodeTexture();
    const nodesMat = new THREE.PointsMaterial({
      size: 0.26,
      map: nodeTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const networkPoints = new THREE.Points(nodesGeo, nodesMat);
    networkGroup.add(networkPoints);

    // Pre-allocate line buffer for interconnected electric-blue network lines
    const maxConnections = nodeCount * 6 + count * 2;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    linesGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const linesMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.48,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const networkLines = new THREE.LineSegments(linesGeo, linesMat);
    networkGroup.add(networkLines);

    // 7. GSAP Formation Transitions
    const transitionToFormation = (mode: FormationMode) => {
      const targetPoses = computeFormationPoses(count, mode);
      panelRigs.forEach((rig, i) => {
        const p = targetPoses[i];
        gsap.to(rig.root.position, {
          x: p.x,
          y: p.y,
          z: p.z,
          duration: 1.5,
          ease: 'power3.inOut',
        });
        gsap.to(rig.root.rotation, {
          x: p.rx,
          y: p.ry,
          z: p.rz,
          duration: 1.5,
          ease: 'power3.inOut',
        });
        gsap.to(rig.root.scale, {
          x: p.scale,
          y: p.scale,
          z: p.scale,
          duration: 1.5,
          ease: 'power3.inOut',
        });
      });
    };
    formationCallbackRef.current = transitionToFormation;

    // 8. GSAP Camera Parallax & Smooth Rotation State
    const camTarget = { x: 0, y: 0.3 };
    const camQuickX = gsap.quickTo(camera.position, 'x', { duration: 0.9, ease: 'power2.out' });
    const camQuickY = gsap.quickTo(camera.position, 'y', { duration: 0.9, ease: 'power2.out' });

    const rotationState = {
      targetY: 0,
      currentY: 0,
      isDragging: false,
      dragStartX: 0,
      dragStartRotY: 0,
      hasDragged: false,
    };

    const stepFocus = (dir: 1 | -1) => {
      const step = (Math.PI * 2) / count;
      rotationState.targetY -= dir * step;
      setFocusedIndex((prev) => (prev + dir + count) % count);
    };
    stepFocusCallbackRef.current = stepFocus;

    // 9. Raycaster for Hover & Click Interaction
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(-99, -99);
    let currentHoveredIdx = -1;

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      // Subtle camera parallax from mouse movement
      camTarget.x = pointer.x * 1.15;
      camTarget.y = 0.3 + pointer.y * 0.75;
      camQuickX(camTarget.x);
      camQuickY(camTarget.y);
    };

    const onPointerMove = (e: PointerEvent) => {
      updatePointer(e.clientX, e.clientY);

      if (rotationState.isDragging) {
        const dx = e.clientX - rotationState.dragStartX;
        if (Math.abs(dx) > 4) {
          rotationState.hasDragged = true;
        }
        rotationState.targetY = rotationState.dragStartRotY + dx * 0.0055;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      rotationState.isDragging = true;
      rotationState.dragStartX = e.clientX;
      rotationState.dragStartRotY = rotationState.targetY;
      rotationState.hasDragged = false;
      renderer.domElement.style.cursor = 'grabbing';
    };

    const onPointerUp = (e: PointerEvent) => {
      const wasDragged = rotationState.hasDragged;
      rotationState.isDragging = false;
      renderer.domElement.style.cursor = currentHoveredIdx !== -1 ? 'pointer' : 'grab';

      if (!wasDragged) {
        updatePointer(e.clientX, e.clientY);
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(hitMeshes, false);
        if (intersects.length > 0) {
          const idx = intersects[0].object.userData.projectIndex as number;
          const rig = panelRigs[idx];
          if (rig) {
            setFocusedIndex(idx);
            setSelectedProject(rig.project);
            setIsModalPlaying(true);
          }
        }
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      rotationState.targetY += e.deltaY * 0.0018;
    };

    const domElem = renderer.domElement;
    domElem.style.cursor = 'grab';
    domElem.addEventListener('pointermove', onPointerMove);
    domElem.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    domElem.addEventListener('wheel', onWheel, { passive: false });

    // 10. Responsive Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer?.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // 11. 60 FPS Render & Physics Loop (with software-WebGL afterDraw pacing)
    let animFrameId = 0;
    let isDisposed = false;
    const worldPosA = new THREE.Vector3();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (isDisposed) {
          if (sync) gl.deleteSync(sync);
          return;
        }
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          animFrameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          animFrameId = window.setTimeout(cb, 80);
        }
      };
      animFrameId = window.setTimeout(poll, 5);
    }

    const animate = () => {
      if (isDisposed) return;

      // Gentle continuous showcase rotation when not dragging or hovering a panel
      if (!prefersReducedMotion && !rotationState.isDragging && currentHoveredIdx === -1) {
        rotationState.targetY += 0.0014;
      }

      // Smooth damping on showcase rotation
      rotationState.currentY += (rotationState.targetY - rotationState.currentY) * 0.06;
      showcaseGroup.rotation.y = rotationState.currentY;

      // Subtle network counter-rotation
      networkGroup.rotation.y = -rotationState.currentY * 0.25;

      // Keep camera looking smoothly toward center
      camera.lookAt(0, 0, -1.5);

      // Update 3D interconnected electric-blue network nodes & lines
      const posAttr = nodesGeo.getAttribute('position') as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        const v = nodeVelocities[i];
        arr[i * 3] += v.vx;
        arr[i * 3 + 1] += v.vy;
        arr[i * 3 + 2] += v.vz;

        if (arr[i * 3] > 14 || arr[i * 3] < -14) v.vx *= -1;
        if (arr[i * 3 + 1] > 8 || arr[i * 3 + 1] < -8) v.vy *= -1;
        if (arr[i * 3 + 2] > 6 || arr[i * 3 + 2] < -12) v.vz *= -1;
      }
      posAttr.needsUpdate = true;

      let lineIdx = 0;
      const maxDistSq = 4.2 * 4.2;

      for (let i = 0; i < nodeCount && lineIdx < maxConnections; i++) {
        const ax = arr[i * 3];
        const ay = arr[i * 3 + 1];
        const az = arr[i * 3 + 2];

        for (let j = i + 1; j < nodeCount && lineIdx < maxConnections; j++) {
          const bx = arr[j * 3];
          const by = arr[j * 3 + 1];
          const bz = arr[j * 3 + 2];

          const dx = ax - bx;
          const dy = ay - by;
          const dz = az - bz;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistSq) {
            const alpha = 1 - distSq / maxDistSq;
            const base = lineIdx * 6;
            linePositions[base] = ax;
            linePositions[base + 1] = ay;
            linePositions[base + 2] = az;
            linePositions[base + 3] = bx;
            linePositions[base + 4] = by;
            linePositions[base + 5] = bz;

            // Electric blue-cyan gradient
            lineColors[base] = 0.08 * alpha;
            lineColors[base + 1] = 0.65 * alpha;
            lineColors[base + 2] = 1.0 * alpha;
            lineColors[base + 3] = 0.22 * alpha;
            lineColors[base + 4] = 0.78 * alpha;
            lineColors[base + 5] = 1.0 * alpha;

            lineIdx++;
          }
        }
      }

      // Connect each floating 3D panel to its nearest network node for cohesive cyber integration
      for (let p = 0; p < panelRigs.length && lineIdx < maxConnections; p++) {
        panelRigs[p].floatGroup.getWorldPosition(worldPosA);
        networkGroup.worldToLocal(worldPosA);

        let nearestIdx = 0;
        let nearestDistSq = Infinity;
        for (let n = 0; n < nodeCount; n++) {
          const dx = worldPosA.x - arr[n * 3];
          const dy = worldPosA.y - arr[n * 3 + 1];
          const dz = worldPosA.z - arr[n * 3 + 2];
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < nearestDistSq) {
            nearestDistSq = d2;
            nearestIdx = n;
          }
        }

        if (nearestDistSq < 36) {
          const base = lineIdx * 6;
          linePositions[base] = worldPosA.x;
          linePositions[base + 1] = worldPosA.y;
          linePositions[base + 2] = worldPosA.z;
          linePositions[base + 3] = arr[nearestIdx * 3];
          linePositions[base + 4] = arr[nearestIdx * 3 + 1];
          linePositions[base + 5] = arr[nearestIdx * 3 + 2];

          lineColors[base] = 0.15;
          lineColors[base + 1] = 0.75;
          lineColors[base + 2] = 1.0;
          lineColors[base + 3] = 0.04;
          lineColors[base + 4] = 0.35;
          lineColors[base + 5] = 0.65;
          lineIdx++;
        }
      }

      linesGeo.setDrawRange(0, lineIdx * 2);
      (linesGeo.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
      (linesGeo.getAttribute('color') as THREE.BufferAttribute).needsUpdate = true;

      // Raycast hover check
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(hitMeshes, false);
      const hitIdx =
        intersects.length > 0 ? (intersects[0].object.userData.projectIndex as number) : -1;

      if (hitIdx !== currentHoveredIdx) {
        if (currentHoveredIdx !== -1 && panelRigs[currentHoveredIdx]) {
          const prev = panelRigs[currentHoveredIdx];
          gsap.to(prev.edgeMat, { opacity: 0.55, duration: 0.3 });
          gsap.to(prev.floatGroup.scale, { x: 1, y: 1, z: 1, duration: 0.35, ease: 'power2.out' });
        }

        currentHoveredIdx = hitIdx;

        if (currentHoveredIdx !== -1 && panelRigs[currentHoveredIdx]) {
          const next = panelRigs[currentHoveredIdx];
          gsap.to(next.edgeMat, { opacity: 1, duration: 0.25 });
          gsap.to(next.floatGroup.scale, {
            x: 1.07,
            y: 1.07,
            z: 1.07,
            duration: 0.35,
            ease: 'power2.out',
          });
          setHoveredProject(next.project);
          if (!rotationState.isDragging) domElem.style.cursor = 'pointer';
        } else {
          setHoveredProject(null);
          if (!rotationState.isDragging) domElem.style.cursor = 'grab';
        }
      }

      if (composer) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }

      if (isSoftwareGl) {
        afterDraw(animate);
      } else {
        animFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    // 12. Cleanup on Unmount
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animFrameId);
      clearTimeout(animFrameId);
      lightTween1.kill();
      lightTween2.kill();
      floatTweens.forEach((t) => t.kill());

      domElem.removeEventListener('pointermove', onPointerMove);
      domElem.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      domElem.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);

      glassGeo.dispose();
      bezelGeo.dispose();
      screenGeo.dispose();
      sheenGeo.dispose();
      shadowGeo.dispose();
      edgesGeo.dispose();
      bezelMaterial.dispose();
      glassMaterial.dispose();
      sheenMat.dispose();
      sheenTexture.dispose();
      shadowMat.dispose();
      shadowTexture.dispose();
      nodesGeo.dispose();
      nodesMat.dispose();
      nodeTexture.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      envMap.dispose();

      panelRigs.forEach((rig) => {
        rig.edgeMat.dispose();
        rig.screenMat.dispose();
        rig.screenTex.dispose();
      });

      composer?.dispose();
      renderer.dispose();
      if (domElem.parentNode === container) {
        container.removeChild(domElem);
      }
    };
  }, []);

  const handleFormationChange = useCallback((mode: FormationMode) => {
    setFormation(mode);
    formationCallbackRef.current?.(mode);
  }, []);

  const handleStepFocus = useCallback((dir: 1 | -1) => {
    stepFocusCallbackRef.current?.(dir);
  }, []);

  const toggleModalPlay = () => {
    if (!modalVideoRef.current) return;
    if (modalVideoRef.current.paused) {
      modalVideoRef.current.play();
      setIsModalPlaying(true);
    } else {
      modalVideoRef.current.pause();
      setIsModalPlaying(false);
    }
  };

  const toggleModalMute = () => {
    if (!modalVideoRef.current) return;
    modalVideoRef.current.muted = !modalVideoRef.current.muted;
    setIsModalMuted(modalVideoRef.current.muted);
  };

  const toggleModalFullscreen = () => {
    const target = modalTheaterRef.current || modalVideoRef.current;
    if (!target) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    } else {
      target.requestFullscreen?.().catch(() => {});
    }
  };

  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject]);

  const activeDisplayProject = hoveredProject || SHOWCASE_PROJECTS[focusedIndex];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020611] select-none">
      {/* Full-Viewport Three.js WebGL Canvas */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Minimal Floating Bottom HUD (No Navbar, No Hero, No Gallery) */}
      <div className="fixed bottom-5 inset-x-5 sm:inset-x-8 flex flex-wrap items-center justify-between gap-3 pointer-events-none z-20">
        {/* Active / Hovered Screen Readout */}
        <div className="pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#040a18]/75 backdrop-blur-xl border border-sky-400/20 text-white shadow-[0_8px_32px_rgba(0,0,0,0.6)] max-w-md">
          <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8] shrink-0" />
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase tracking-wider text-sky-400 truncate">
              {activeDisplayProject?.categoryLabel}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-100 truncate">
              {activeDisplayProject?.title}
            </div>
          </div>
          {activeDisplayProject && (
            <button
              onClick={() => {
                setSelectedProject(activeDisplayProject);
                setIsModalPlaying(true);
              }}
              className="ml-2 px-2.5 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/35 border border-sky-400/30 text-sky-300 text-xs font-medium transition-colors cursor-pointer shrink-0"
            >
              Inspect
            </button>
          )}
        </div>

        {/* Formation Switcher & Orbit Step Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="flex items-center p-1 rounded-xl bg-[#040a18]/75 backdrop-blur-xl border border-sky-400/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            {(['orbit', 'helix', 'constellation'] as FormationMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => handleFormationChange(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
                  formation === mode
                    ? 'bg-sky-500/25 text-sky-300 border border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleStepFocus(-1)}
              aria-label="Previous 3D screen"
              className="w-9 h-9 rounded-xl bg-[#040a18]/75 hover:bg-sky-500/20 backdrop-blur-xl border border-sky-400/20 hover:border-sky-400/50 text-slate-200 flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => handleStepFocus(1)}
              aria-label="Next 3D screen"
              className="w-9 h-9 rounded-xl bg-[#040a18]/75 hover:bg-sky-500/20 backdrop-blur-xl border border-sky-400/20 hover:border-sky-400/50 text-slate-200 flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Project Inspection Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#060d1f] border border-sky-400/30 shadow-[0_25px_80px_rgba(0,0,0,0.85)] text-white"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-4 bg-[#060d1f]/95 backdrop-blur-md border-b border-white/10">
              <div className="min-w-0 pr-4">
                <div className="text-[11px] font-mono uppercase tracking-wider text-sky-400">
                  {selectedProject.categoryLabel}
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white truncate">
                  {selectedProject.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close inspection modal"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Media Viewport */}
            <div
              ref={modalTheaterRef}
              className="relative aspect-video w-full bg-black overflow-hidden"
              onContextMenu={(e) => e.preventDefault()}
            >
              {selectedProject.videoUrl ? (
                <>
                  <video
                    ref={modalVideoRef}
                    src={selectedProject.videoUrl}
                    autoPlay
                    loop
                    muted={isModalMuted}
                    playsInline
                    controlsList="nodownload nofullscreen noremoteplayback"
                    disablePictureInPicture
                    className="w-full h-full object-contain"
                  />
                  <VideoWatermarkOverlay mode="modal" />
                  <div className="absolute bottom-3 right-3 z-30 flex items-center gap-2">
                    <button
                      onClick={toggleModalPlay}
                      className="p-2 rounded-lg bg-black/70 hover:bg-black/90 border border-white/15 text-white cursor-pointer"
                      aria-label={isModalPlaying ? 'Pause video' : 'Play video'}
                    >
                      {isModalPlaying ? <Pause size={15} /> : <Play size={15} />}
                    </button>
                    <button
                      onClick={toggleModalMute}
                      className="p-2 rounded-lg bg-black/70 hover:bg-black/90 border border-white/15 text-white cursor-pointer"
                      aria-label={isModalMuted ? 'Unmute video' : 'Mute video'}
                    >
                      {isModalMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                    </button>
                    <button
                      onClick={toggleModalFullscreen}
                      className="p-2 rounded-lg bg-black/70 hover:bg-black/90 border border-white/15 text-white cursor-pointer"
                      aria-label="Fullscreen video"
                    >
                      <Maximize2 size={15} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-contain"
                  />
                  <VideoWatermarkOverlay mode="modal" />
                </>
              )}
            </div>

            {/* Modal Details */}
            <div className="p-5 sm:p-6 space-y-5">
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {selectedProject.longDescription}
              </p>

              {selectedProject.features && selectedProject.features.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400">
                    <Layers size={14} />
                    <span>Key Highlights</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.features.map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.07] text-xs sm:text-sm text-slate-300"
                      >
                        <CheckCircle2 size={15} className="text-sky-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(selectedProject.liveUrl || selectedProject.githubUrl) && (
                <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/10">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors"
                    >
                      <ExternalLink size={15} />
                      <span>Open Live Project</span>
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-xs sm:text-sm transition-colors"
                    >
                      <Github size={15} />
                      <span>Source Repository</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
