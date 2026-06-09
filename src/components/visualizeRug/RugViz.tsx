import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import './RugViz.css';
import { Link } from 'react-router-dom';

const RugViz = ({
  apiEndpoint = 'https://modernnaturedesignnepal46--sam3-flask-api-create-wsgi.modal.run/api/analyze',
  rugImageUrl = null,
  rugName = 'Rug',
  onExit = () => { },
  onProductPage = () => { }
}) => {
  // Refs
  const viewportRef = useRef(null);
  const bgLayerRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rugMeshRef = useRef(null);
  const animationIdRef = useRef(null);

  // State
  const [roomImage, setRoomImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeStatus, setAnalyzeStatus] = useState('Analyze Scene');
  const [currentScale, setCurrentScale] = useState(1.0);
  const [hasRug, setHasRug] = useState(false);
  const [isRugLoaded, setIsRugLoaded] = useState(false);

  // prevent double analyze on same upload
  const analyzedOnceRef = useRef(false);

  // Scale ref (avoid async state issues)
  const scaleRef = useRef(currentScale);
  useEffect(() => { scaleRef.current = currentScale; }, [currentScale]);

  // Demo room images (replace later)
  const demoRooms = [
    {
      label: "Bedroom",
      url: '/demos/IMG-20260125-WA0003.webp',
    },
    {
      label: "Kitchen",
      url: '/demos/IMG-20260125-WA0004.webp',
    },
    {
      label: "Lobby",
      url: '/demos/IMG-20260125-WA0005.webp',
    },
    {
      label: "Living room",
      url: '/demos/IMG-20260125-WA0006.webp',
    },
    {
      label: "Office",
      url: "/demos/IMG-20260125-WA0001.jpeg",
    }
  ];

  // Refs for interaction state
  const interactionRef = useRef({
    isDragging: false,
    isRotating: false,
    currentRotation: 0,
    rotationStartAngle: 0,
    rugStartRotation: 0,
    hoveredHandle: -1,
    activeHandle: -1,
    screenCorners: [],
    rugCenter: { x: 0, y: 0 },
    ellipseParams: { cx: 0, cy: 0, rx: 0, ry: 0, rotation: 0 },
    shadowTexture: null,
    rugTexture: null,
  });

  const raycasterRef = useRef(new THREE.Raycaster());
  const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));

  // ------------------- Shader (FIXED COLOR SPACE) -------------------
  const ProRugShader = {
    uniforms: {
      tDiffuse: { value: null },
      tShadow: { value: null },
      uResolution: { value: new THREE.Vector2() },

      uOpacity: { value: 1.0 },
      uShadowStrength: { value: 0.35 },
      uBrightness: { value: 1.10 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec4 vScreenPosition;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vScreenPosition = gl_Position;
      }
    `,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform sampler2D tShadow;
      uniform vec2 uResolution;

      uniform float uOpacity;
      uniform float uShadowStrength;
      uniform float uBrightness;

      varying vec2 vUv;
      varying vec4 vScreenPosition;

      vec3 srgbToLinear(vec3 c) {
        bvec3 cutoff = lessThanEqual(c, vec3(0.04045));
        vec3 lower = c / 12.92;
        vec3 higher = pow((c + 0.055) / 1.055, vec3(2.4));
        return mix(higher, lower, vec3(cutoff));
      }

      vec3 linearToSrgb(vec3 c) {
        bvec3 cutoff = lessThanEqual(c, vec3(0.0031308));
        vec3 lower = c * 12.92;
        vec3 higher = 1.055 * pow(c, vec3(1.0/2.4)) - 0.055;
        return mix(higher, lower, vec3(cutoff));
      }

      void main() {
        vec2 screenUV = vScreenPosition.xy / vScreenPosition.w * 0.5 + 0.5;
        vec4 shadowVal = texture2D(tShadow, screenUV);

        if (shadowVal.a < 0.1) discard;

        vec4 rugTex = texture2D(tDiffuse, vUv);
        vec3 rugLin = srgbToLinear(rugTex.rgb);

        vec3 shadowMix = mix(vec3(1.0), shadowVal.rgb, uShadowStrength);
        vec3 finalLin = rugLin * shadowMix;
        finalLin *= uBrightness;

        vec3 finalSrgb = linearToSrgb(clamp(finalLin, 0.0, 1.0));
        gl_FragColor = vec4(finalSrgb, uOpacity);
      }
    `
  };

  // ------------------- Load rug texture -------------------
  useEffect(() => {
    if (!rugImageUrl) {
      setIsRugLoaded(false);
      interactionRef.current.rugTexture = null;
      return;
    }

    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';

    loader.load(
      rugImageUrl,
      (tex) => {
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;

        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = true;

        const renderer = rendererRef.current;
        if (renderer?.capabilities?.getMaxAnisotropy) {
          tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        }

        tex.needsUpdate = true;

        interactionRef.current.rugTexture = tex;
        setIsRugLoaded(true);

        if (interactionRef.current.shadowTexture && sceneRef.current) {
          createRug();
        }
      },
      undefined,
      (error) => {
        console.error('Error loading rug texture:', error);
        setIsRugLoaded(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rugImageUrl]);

  // ------------------- Initialize Three -------------------
  useEffect(() => {
    if (!viewportRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 1.7, 4);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true
    });
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.zIndex = '2';
    renderer.domElement.style.pointerEvents = 'none';

    viewportRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const overlayCanvas = document.createElement('canvas');
    overlayCanvas.style.position = 'absolute';
    overlayCanvas.style.zIndex = '10';
    overlayCanvas.style.cursor = 'default';
    viewportRef.current.appendChild(overlayCanvas);
    overlayCanvasRef.current = overlayCanvas;

    scene.add(new THREE.AmbientLight(0xffffff, 1.0));

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
      drawOverlay();
    };
    animate();

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);

      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (rendererRef.current.domElement.parentNode) {
          rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
        }
      }

      if (overlayCanvasRef.current?.parentNode) {
        overlayCanvasRef.current.parentNode.removeChild(overlayCanvasRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ------------------- Update layout -------------------
  const updateLayout = useCallback(() => {
    const viewport = viewportRef.current;
    const bg = bgLayerRef.current;
    const renderer = rendererRef.current;
    const overlayCanvas = overlayCanvasRef.current;
    const camera = cameraRef.current;

    if (!viewport || !bg || !renderer || !overlayCanvas || !camera) return;
    if (!bg.naturalWidth || !bg.naturalHeight) return;

    const vpRect = viewport.getBoundingClientRect();
    const vpW = vpRect.width;
    const vpH = vpRect.height;

    const nW = bg.naturalWidth;
    const nH = bg.naturalHeight;

    const scale = Math.min(vpW / nW, vpH / nH);
    const dispW = nW * scale;
    const dispH = nH * scale;

    const left = (vpW - dispW) / 2;
    const top = (vpH - dispH) / 2;

    bg.style.position = 'absolute';
    bg.style.left = `${left}px`;
    bg.style.top = `${top}px`;
    bg.style.width = `${dispW}px`;
    bg.style.height = `${dispH}px`;
    bg.style.objectFit = 'fill';
    bg.style.display = 'block';

    renderer.setSize(dispW, dispH, false);
    renderer.domElement.style.left = `${left}px`;
    renderer.domElement.style.top = `${top}px`;

    overlayCanvas.width = Math.floor(dispW);
    overlayCanvas.height = Math.floor(dispH);
    overlayCanvas.style.left = `${left}px`;
    overlayCanvas.style.top = `${top}px`;
    overlayCanvas.style.width = `${dispW}px`;
    overlayCanvas.style.height = `${dispH}px`;

    camera.aspect = dispW / dispH;
    camera.updateProjectionMatrix();

    if (rugMeshRef.current) {
      rugMeshRef.current.material.uniforms.uResolution.value.set(dispW, dispH);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [updateLayout]);

  // ------------------- Interaction handlers (unchanged) -------------------
  useEffect(() => {
    const overlayCanvas = overlayCanvasRef.current;
    if (!overlayCanvas) return;

    const getPointerPosition = (e) => {
      const rect = overlayCanvas.getBoundingClientRect();
      if (e.touches && e.touches.length > 0) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      }
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseMove = (e) => {
      const { x: mx, y: my } = getPointerPosition(e);
      const interaction = interactionRef.current;

      if (interaction.isRotating && rugMeshRef.current) {
        const currentAngle = Math.atan2(my - interaction.ellipseParams.cy, mx - interaction.ellipseParams.cx);
        const deltaAngle = currentAngle - interaction.rotationStartAngle;
        interaction.currentRotation = interaction.rugStartRotation + deltaAngle * (180 / Math.PI);
        rugMeshRef.current.rotation.z = -THREE.MathUtils.degToRad(interaction.currentRotation);
        return;
      }

      if (interaction.isDragging && rugMeshRef.current) {
        const x = (mx / overlayCanvas.width) * 2 - 1;
        const y = -(my / overlayCanvas.height) * 2 + 1;

        raycasterRef.current.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);
        const target = new THREE.Vector3();
        raycasterRef.current.ray.intersectPlane(planeRef.current, target);

        if (target) {
          rugMeshRef.current.position.x = target.x;
          rugMeshRef.current.position.z = target.z;
        }
        return;
      }

      if (interaction.screenCorners.length === 4) {
        let newHovered = -1;
        [2, 3].forEach(i => {
          if (isPointInHandle(mx, my, i)) newHovered = i;
        });

        if (newHovered !== interaction.hoveredHandle) {
          interaction.hoveredHandle = newHovered;
          overlayCanvas.style.cursor = newHovered >= 0 ? 'grab' : 'default';
        }
      }
    };

    const handleMouseDown = (e) => {
      if (!rugMeshRef.current) return;

      const { x: mx, y: my } = getPointerPosition(e);
      const interaction = interactionRef.current;

      for (const i of [2, 3]) {
        if (isPointInHandle(mx, my, i)) {
          interaction.isRotating = true;
          interaction.activeHandle = i;
          interaction.rotationStartAngle = Math.atan2(my - interaction.ellipseParams.cy, mx - interaction.ellipseParams.cx);
          interaction.rugStartRotation = interaction.currentRotation;
          overlayCanvas.style.cursor = 'grabbing';
          e.preventDefault();
          return;
        }
      }

      const x = (mx / overlayCanvas.width) * 2 - 1;
      const y = -(my / overlayCanvas.height) * 2 + 1;

      raycasterRef.current.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);
      const hits = raycasterRef.current.intersectObjects(sceneRef.current.children);
      if (hits.length > 0) {
        interaction.isDragging = true;
        overlayCanvas.style.cursor = 'move';
        e.preventDefault();
      }
    };

    const handleMouseUp = () => {
      const interaction = interactionRef.current;
      interaction.isDragging = false;
      interaction.isRotating = false;
      interaction.activeHandle = -1;
      overlayCanvas.style.cursor = interaction.hoveredHandle >= 0 ? 'grab' : 'default';
    };

    // Mouse events for move
    overlayCanvas.addEventListener('mousemove', handleMouseMove);
    overlayCanvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch events for mobile
    overlayCanvas.addEventListener('touchmove', handleMouseMove, { passive: false });
    overlayCanvas.addEventListener('touchstart', handleMouseDown, { passive: false });
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      overlayCanvas.removeEventListener('mousemove', handleMouseMove);
      overlayCanvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      overlayCanvas.removeEventListener('touchmove', handleMouseMove);
      overlayCanvas.removeEventListener('touchstart', handleMouseDown);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  // ------------------- Geometry helpers -------------------
  const worldToScreen = (worldPos) => {
    const vector = worldPos.clone();
    vector.project(cameraRef.current);
    return {
      x: (vector.x * 0.5 + 0.5) * rendererRef.current.domElement.width,
      y: (-vector.y * 0.5 + 0.5) * rendererRef.current.domElement.height
    };
  };

  const calculateEllipse = (corners) => {
    const cx = corners.reduce((s, c) => s + c.x, 0) / 4;
    const cy = corners.reduce((s, c) => s + c.y, 0) / 4;

    const midLeft = { x: (corners[0].x + corners[3].x) / 2, y: (corners[0].y + corners[3].y) / 2 };
    const midRight = { x: (corners[1].x + corners[2].x) / 2, y: (corners[1].y + corners[2].y) / 2 };
    const midTop = { x: (corners[0].x + corners[1].x) / 2, y: (corners[0].y + corners[1].y) / 2 };
    const midBottom = { x: (corners[2].x + corners[3].y) / 2, y: (corners[2].y + corners[3].y) / 2 };

    const width = Math.hypot(midRight.x - midLeft.x, midRight.y - midLeft.y);
    const height = Math.hypot(midBottom.x - midTop.x, midBottom.y - midTop.y);
    const rotation = Math.atan2(midRight.y - midLeft.y, midRight.x - midLeft.x);

    return { cx, cy, rx: (width / 2) * 1.35, ry: (height / 2) * 1.35, rotation };
  };

  const getEllipsePoint = (angle) => {
    const { cx, cy, rx, ry, rotation } = interactionRef.current.ellipseParams;
    const x = rx * Math.cos(angle);
    const y = ry * Math.sin(angle);
    const cosR = Math.cos(rotation);
    const sinR = Math.sin(rotation);

    return {
      x: cx + x * cosR - y * sinR,
      y: cy + x * sinR + y * cosR
    };
  };

  const getAngleOnEllipse = (px, py) => {
    const { cx, cy, rx, ry, rotation } = interactionRef.current.ellipseParams;
    const dx = px - cx;
    const dy = py - cy;
    const cosR = Math.cos(-rotation);
    const sinR = Math.sin(-rotation);
    const localX = dx * cosR - dy * sinR;
    const localY = dx * sinR + dy * cosR;
    return Math.atan2(localY / ry, localX / rx);
  };

  const isPointInHandle = (px, py, handleIndex) => {
    const interaction = interactionRef.current;
    if (interaction.screenCorners.length < 4) return false;

    const angle = getAngleOnEllipse(interaction.screenCorners[handleIndex].x, interaction.screenCorners[handleIndex].y);
    const handlePos = getEllipsePoint(angle);

    const dx = px - handlePos.x;
    const dy = py - handlePos.y;
    return Math.hypot(dx, dy) < 28;
  };

  const drawHandle = (ctx, x, y, isHovered, isActive) => {
    const interaction = interactionRef.current;

    ctx.save();
    ctx.translate(x, y);

    const outwardAngle = Math.atan2(y - interaction.ellipseParams.cy, x - interaction.ellipseParams.cx);
    ctx.rotate(outwardAngle + Math.PI / 2);

    const size = isHovered || isActive ? 28 : 24;

    ctx.shadowColor = 'rgba(0,0,0,0.35)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 2;

    ctx.fillStyle = isActive ? '#1e4436' : (isHovered ? '#3d7a6a' : '#2d5a4a');
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.6);
    ctx.lineTo(size * 0.55, size * 0.5);
    ctx.lineTo(-size * 0.55, size * 0.5);
    ctx.closePath();
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    const r = size * 0.22;
    ctx.beginPath();
    ctx.arc(0, size * 0.1, r, Math.PI * 0.8, Math.PI * 2.2, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(r * 0.7, size * 0.1 - r * 0.3);
    ctx.lineTo(r * 1.1, size * 0.1 + r * 0.4);
    ctx.lineTo(r * 0.2, size * 0.1 + r * 0.2);
    ctx.stroke();

    ctx.restore();
  };

  const drawOverlay = () => {
    const overlayCanvas = overlayCanvasRef.current;
    if (!overlayCanvas) return;

    const ctx = overlayCanvas.getContext('2d');
    const w = overlayCanvas.width;
    const h = overlayCanvas.height;
    ctx.clearRect(0, 0, w, h);

    if (!rugMeshRef.current) return;

    const geometry = rugMeshRef.current.geometry;
    geometry.computeBoundingBox();
    const box = geometry.boundingBox;

    const localCorners = [
      new THREE.Vector3(box.min.x, box.max.y, 0),
      new THREE.Vector3(box.max.x, box.max.y, 0),
      new THREE.Vector3(box.max.x, box.min.y, 0),
      new THREE.Vector3(box.min.x, box.min.y, 0),
    ];

    const interaction = interactionRef.current;
    interaction.screenCorners = localCorners.map(corner => {
      const world = corner.clone().applyMatrix4(rugMeshRef.current.matrixWorld);
      return worldToScreen(world);
    });

    interaction.rugCenter = {
      x: interaction.screenCorners.reduce((s, c) => s + c.x, 0) / 4,
      y: interaction.screenCorners.reduce((s, c) => s + c.y, 0) / 4
    };

    interaction.ellipseParams = calculateEllipse(interaction.screenCorners);

    ctx.save();
    ctx.translate(interaction.ellipseParams.cx, interaction.ellipseParams.cy);
    ctx.rotate(interaction.ellipseParams.rotation);

    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 2;

    ctx.beginPath();
    ctx.ellipse(0, 0, interaction.ellipseParams.rx, interaction.ellipseParams.ry, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 6]);
    ctx.stroke();
    ctx.restore();

    const handleAngles = interaction.screenCorners.map(corner => getAngleOnEllipse(corner.x, corner.y));
    [2, 3].forEach(i => {
      const angle = handleAngles[i];
      const handlePos = getEllipsePoint(angle);
      const isHovered = interaction.hoveredHandle === i;
      const isActive = interaction.activeHandle === i;
      drawHandle(ctx, handlePos.x, handlePos.y, isHovered, isActive);
    });
  };

  // ------------------- Create rug mesh -------------------
  const createRug = useCallback(() => {
    const interaction = interactionRef.current;
    if (!interaction.rugTexture || !interaction.shadowTexture) return;

    if (rugMeshRef.current) {
      sceneRef.current.remove(rugMeshRef.current);
    }

    const ratio = interaction.rugTexture.image.width / interaction.rugTexture.image.height;
    const BASE_RUG_WIDTH = 1.2;
    const height = BASE_RUG_WIDTH / ratio;

    const geometry = new THREE.PlaneGeometry(BASE_RUG_WIDTH, height, 64, 64);

    const material = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(ProRugShader.uniforms),
      vertexShader: ProRugShader.vertexShader,
      fragmentShader: ProRugShader.fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false
    });

    material.uniforms.tDiffuse.value = interaction.rugTexture;
    material.uniforms.tShadow.value = interaction.shadowTexture;
    material.uniforms.uOpacity.value = 1.0;
    material.uniforms.uShadowStrength.value = 0.35;
    material.uniforms.uBrightness.value = 1.10;

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(0, 0.01, 2.5);

    const s = scaleRef.current;
    mesh.scale.set(s, s, 1);

    sceneRef.current.add(mesh);
    rugMeshRef.current = mesh;

    setHasRug(true);
    updateLayout();
  }, [updateLayout]);

  // ------------------- Analyze scene -------------------
  const handleAnalyze = useCallback(async () => {
    if (!roomImage) return;
    if (!isRugLoaded) return;

    setIsAnalyzing(true);
    setAnalyzeStatus('Analyzing...');

    try {
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: roomImage })
      });

      const data = await res.json();

      if (data.success) {
        const metrics = data.data?.floor_metrics;

        let recommended = 0.6;
        if (metrics?.bbox?.w != null) {
          const fw = metrics.bbox.w;
          recommended = 0.90 - 0.35 * fw;
        } else if (typeof metrics?.area_ratio === "number") {
          const ar = metrics.area_ratio;
          recommended = 0.85 - 0.40 * ar;
        }

        recommended = Math.max(0.35, Math.min(0.95, recommended));

        setCurrentScale(recommended);
        scaleRef.current = recommended;

        if (rugMeshRef.current) {
          rugMeshRef.current.scale.set(recommended, recommended, 1);
        }

        new THREE.TextureLoader().load(data.data.shadow_map, (tex) => {
          interactionRef.current.shadowTexture = tex;
          if (interactionRef.current.rugTexture) {
            createRug();
          } else {
            alert("Rug image not loaded yet. Please wait.");
          }
        });

        const p = data.data.perspective;
        const r = 4.0;
        const y = r * Math.tan(p.pitch);

        const camera = cameraRef.current;
        const startPos = camera.position.clone();
        const endPos = new THREE.Vector3(0, y, r);

        let t = 0;
        const animateCamera = () => {
          t += 0.02;
          if (t <= 1) {
            camera.position.lerpVectors(startPos, endPos, t);
            camera.lookAt(0, 0, 0);
            requestAnimationFrame(animateCamera);
          }
        };
        animateCamera();

        setAnalyzeStatus('Done');
      } else {
        setAnalyzeStatus('Retry');
      }
    } catch (e) {
      console.error(e);
      alert("Error analyzing scene");
      setAnalyzeStatus('Retry');
    } finally {
      setIsAnalyzing(false);
    }
  }, [apiEndpoint, roomImage, isRugLoaded, createRug]);

  // ------------------- Common: apply new room image (same flow as upload) -------------------
  const applyNewRoomImage = useCallback((dataUrl) => {
    analyzedOnceRef.current = false;

    setRoomImage(dataUrl);
    interactionRef.current.shadowTexture = null;

    if (rugMeshRef.current) {
      sceneRef.current.remove(rugMeshRef.current);
      rugMeshRef.current = null;
    }

    setHasRug(false);
    setAnalyzeStatus('Analyze Scene');
  }, []);

  // ------------------- Upload room image (AUTO-ANALYZE) -------------------
  const handleRoomUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      applyNewRoomImage(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  // ------------------- Demo click: fetch -> dataURL -> apply (AUTO-ANALYZE stays same) -------------------
  const handleDemoRoomClick = async (url) => {
    try {
      setIsAnalyzing(true);
      setAnalyzeStatus('Loading demo...');

      const res = await fetch(url);
      const blob = await res.blob();

      const reader = new FileReader();
      reader.onload = (ev) => {
        setIsAnalyzing(false);
        setAnalyzeStatus('Analyze Scene');
        applyNewRoomImage(ev.target.result);
      };
      reader.onerror = () => {
        setIsAnalyzing(false);
        setAnalyzeStatus('Retry');
        alert("Failed to load demo image.");
      };

      reader.readAsDataURL(blob);
    } catch (err) {
      console.error(err);
      setIsAnalyzing(false);
      setAnalyzeStatus('Retry');
      alert("Failed to load demo image.");
    }
  };

  // ✅ When roomImage is set after upload/demo, automatically analyze once
  useEffect(() => {
    if (!roomImage) return;
    if (!isRugLoaded) return;
    if (isAnalyzing) return;
    if (analyzedOnceRef.current) return;

    analyzedOnceRef.current = true;
    handleAnalyze();
  }, [roomImage, isRugLoaded, isAnalyzing, handleAnalyze]);

  // ------------------- Slider scaling -------------------
  const handleScaleChange = (newScale) => {
    const clamped = Math.max(0.1, Math.min(3.0, newScale));
    setCurrentScale(clamped);
    scaleRef.current = clamped;

    if (rugMeshRef.current) {
      rugMeshRef.current.scale.set(clamped, clamped, 1);
    }
  };

  // ------------------- Download composite -------------------
  const handleDownload = () => {
    if (!roomImage || !rendererRef.current || !bgLayerRef.current) {
      alert('Please load a room image first');
      return;
    }

    const compositeCanvas = document.createElement('canvas');
    const bgImg = bgLayerRef.current;

    compositeCanvas.width = bgImg.naturalWidth;
    compositeCanvas.height = bgImg.naturalHeight;

    const ctx = compositeCanvas.getContext('2d');

    const tmp = new Image();
    tmp.crossOrigin = 'anonymous';
    tmp.onload = () => {
      ctx.drawImage(tmp, 0, 0, compositeCanvas.width, compositeCanvas.height);

      const rendererCanvas = rendererRef.current.domElement;
      ctx.drawImage(rendererCanvas, 0, 0, compositeCanvas.width, compositeCanvas.height);

      const link = document.createElement('a');
      link.download = `room-with-${rugName.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = compositeCanvas.toDataURL('image/png');
      link.click();
    };
    tmp.src = roomImage;
  };

  const handleShare = async () => {
    handleDownload();
  };

  return (
    <div className="rugviz-container">
      <nav className="rugviz-nav">
        <Link to="/" className="rugviz-logo">
          <img
            src="/assets/images/navbar/MND_Logo.png"
            alt="logo"
          />
          <span className="rugviz-logo-text">Modern Nature Design Nepal</span>
        </Link>

        <div className="rugviz-nav-actions">
          <button className="rugviz-btn" onClick={onExit}>✕ <span className="rugviz-btn-text">Exit</span></button>
          <div className="rugviz-divider" />
          <button className="rugviz-btn" onClick={handleDownload}>↓ <span className="rugviz-btn-text">Download</span></button>
          <button className="rugviz-btn" onClick={onProductPage}>ⓘ <span className="rugviz-btn-text">Products</span></button>
          <div className="rugviz-divider" />

          <button
            className="rugviz-btn rugviz-btn-primary"
            onClick={handleAnalyze}
            disabled={!roomImage || isAnalyzing || !isRugLoaded}
          >
            ✨ <span className="rugviz-btn-text">{analyzeStatus}</span>
            {isAnalyzing && <span className="rugviz-loader" />}
          </button>
        </div>

        <input
          type="file"
          id="room-input"
          accept="image/*"
          onChange={handleRoomUpload}
          hidden
        />
      </nav>

      <div className="rugviz-viewport" ref={viewportRef}>
        {/* Loading overlay (kept) */}
        {isAnalyzing && (
          <div className="rugviz-loading-overlay" aria-live="polite" aria-busy="true">
            <div className="rugviz-loading-card">
              <div className="rugviz-loading-spinner" />
              <div className="rugviz-loading-text">
                <div className="rugviz-loading-title">Analyzing your room</div>
                <div className="rugviz-loading-subtitle">
                  Detecting floor, estimating perspective, and generating shadows…
                </div>
              </div>
              <div className="rugviz-loading-progress">
                <span className="rugviz-loading-dot" />
                <span className="rugviz-loading-dot" />
                <span className="rugviz-loading-dot" />
              </div>
            </div>
          </div>
        )}

        {!roomImage && (
          <div className="rugviz-empty-state">
            <div className="rugviz-empty-icon">🖼</div>
            <p>Upload a room photo to get started</p>

            <button
              className="rugviz-btn rugviz-btn-primary"
              onClick={() => document.getElementById('room-input').click()}
            >
              📤 Upload Room Photo
            </button>
          </div>
        )}

        {/* ✅ Demo Sidebar - ALWAYS VISIBLE, RIGHT SIDE, SCROLLABLE */}
        <div className="rugviz-demo-sidebar">
          <div className="rugviz-demo-header">
            <span className="rugviz-demo-title-sidebar">
              Dont have your room? <br />
              Try in our demo room
            </span>

          </div>
          <div className="rugviz-demo-scroll">
            {demoRooms.map((d) => (
              <button
                key={d.url}
                type="button"
                className="rugviz-demo-card"
                onClick={() => handleDemoRoomClick(d.url)}
                aria-label={`Use demo room: ${d.label}`}
              >
                <img className="rugviz-demo-card-img" src={d.url} alt={d.label} loading="lazy" />
                <div className="rugviz-demo-card-label">{d.label}</div>
              </button>
            ))}
          </div>
        </div>

        <img
          ref={bgLayerRef}
          className="rugviz-bg-layer"
          src={roomImage || ''}
          alt=""
          crossOrigin="anonymous"
          style={{ display: roomImage ? 'block' : 'none' }}
          onLoad={updateLayout}
        />
      </div>

      <div className="rugviz-bottom-bar">
        <div className="rugviz-rug-preview">
          {rugImageUrl ? (
            <img src={rugImageUrl} alt="Rug preview" crossOrigin="anonymous" />
          ) : (
            <span className="rugviz-rug-placeholder">🔲</span>
          )}
          <div className="rugviz-rug-info">
            <span className="rugviz-rug-label">Selected Rug</span>
            <span className="rugviz-rug-name">{rugName}</span>
          </div>
        </div>

        <div className="rugviz-bottom-actions">
          <div className="rugviz-scale-control">
            <button className="rugviz-scale-btn" onClick={() => handleScaleChange(currentScale - 0.1)}>−</button>
            <div className="rugviz-scale-slider">
              <span className="rugviz-scale-label">Size</span>
              <input
                type="range"
                min="0.1"
                max="3.0"
                step="0.1"
                value={currentScale}
                onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
              />
            </div>
            <button className="rugviz-scale-btn" onClick={() => handleScaleChange(currentScale + 0.1)}>+</button>
          </div>

          <div className="rugviz-divider" />

          <button className="rugviz-btn" onClick={() => document.getElementById('room-input').click()}>
            🔄 <span className="rugviz-btn-text">Change Room</span>
          </button>
        </div>

        <div className="rugviz-spacer" />
      </div>
    </div>
  );
};

export default RugViz;