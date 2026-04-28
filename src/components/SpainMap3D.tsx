import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useLanguage } from '../contexts/LanguageContext';

const SPAIN_OUTLINE: [number, number][] = [
  [-9.03, 41.88], [-8.98, 42.59], [-8.87, 43.34], [-8.20, 43.56], [-7.69, 43.77],
  [-4.36, 43.77], [-3.52, 43.56], [-1.79, 43.45], [-1.72, 43.31], [-1.40, 43.10],
  [-0.34, 42.83], [0.70, 42.70], [1.75, 42.55], [3.16, 42.44], [3.30, 41.95],
  [3.23, 41.47], [2.08, 40.63], [0.72, 40.10], [0.40, 39.65], [0.05, 38.92],
  [-0.38, 38.37], [-0.47, 37.93], [-0.67, 37.64], [-1.28, 37.56], [-1.67, 37.38],
  [-2.10, 36.77], [-4.31, 36.68], [-5.18, 36.43], [-5.35, 36.15], [-5.60, 36.01],
  [-6.00, 36.05], [-6.19, 36.37], [-6.37, 36.78], [-7.00, 37.18], [-7.17, 37.53],
  [-7.46, 37.80], [-7.52, 38.18], [-7.03, 38.91], [-7.19, 39.66], [-6.54, 40.12],
  [-6.86, 40.01], [-6.91, 41.00], [-6.30, 41.69], [-6.62, 41.94], [-7.80, 41.88],
  [-8.17, 41.81], [-8.62, 41.96], [-9.03, 41.88],
];

const CIRCUITS = [
  { name: 'Circuito de Campillos', location: 'Málaga, Andalucía', lat: 37.0612, lon: -4.8659 },
  { name: 'MotorLand Aragón', location: 'Alcañiz, Teruel', lat: 41.1067, lon: -0.2517 },
  { name: 'Circuito de Chiva', location: 'Chiva, Valencia', lat: 39.4697, lon: -0.7183 },
  { name: 'Aspar Circuit', location: 'Alicante, Valencia', lat: 38.3924, lon: -0.4172 },
];

const LON_MIN = -9.5;
const LON_RANGE = 13.0;
const LAT_MIN = 35.8;
const LAT_RANGE = 8.2;

function project(lon: number, lat: number): [number, number] {
  const x = ((lon - LON_MIN) / LON_RANGE - 0.5) * 2.5;
  const y = ((lat - LAT_MIN) / LAT_RANGE - 0.5) * 1.7;
  return [x, y];
}

const MAX_Y = (60 * Math.PI) / 180;
const MAX_X = (30 * Math.PI) / 180;
const BASE_X = -0.22;

export function SpainMap3D() {
  const { language } = useLanguage();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tooltip, setTooltip] = useState<{
    x: number; y: number; name: string; location: string;
  } | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0a0a0a');

    const getSize = () => {
      const w = wrapper.clientWidth;
      const h = w * 0.62;
      return { w, h };
    };

    let { w, h } = getSize();

    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(2, 3, 4);
    scene.add(dir);
    const rim = new THREE.DirectionalLight(0xc8f000, 0.25);
    rim.position.set(-3, -1, 2);
    scene.add(rim);

    const pivot = new THREE.Group();
    pivot.rotation.x = BASE_X;
    scene.add(pivot);

    // Spain shape
    const shape = new THREE.Shape();
    SPAIN_OUTLINE.forEach(([lon, lat], i) => {
      const [x, y] = project(lon, lat);
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });

    const extrudeGeo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.018,
      bevelSegments: 3,
    });
    const mapMat = new THREE.MeshStandardMaterial({
      color: 0x16162a,
      roughness: 0.85,
      metalness: 0.1,
    });
    const mapMesh = new THREE.Mesh(extrudeGeo, mapMat);
    pivot.add(mapMesh);

    // Edge highlight
    const edges = new THREE.EdgesGeometry(extrudeGeo, 30);
    const edgeLines = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0x2a2a44, transparent: true, opacity: 0.85 })
    );
    pivot.add(edgeLines);

    // Circuit markers
    type MarkerData = {
      group: THREE.Group;
      dot: THREE.Mesh;
      rings: THREE.Mesh[];
      pos: THREE.Vector3;
      info: typeof CIRCUITS[number];
      offset: number;
    };
    const markers: MarkerData[] = [];
    const dotMeshes: THREE.Mesh[] = [];

    CIRCUITS.forEach((c, i) => {
      const [x, y] = project(c.lon, c.lat);
      const z = 0.13;
      const group = new THREE.Group();
      group.position.set(x, y, z);

      // Base disc
      const disc = new THREE.Mesh(
        new THREE.CircleGeometry(0.07, 32),
        new THREE.MeshBasicMaterial({ color: 0x1e2b00 })
      );
      group.add(disc);

      // Glowing dot
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.038, 24, 24),
        new THREE.MeshStandardMaterial({
          color: 0xc8f000,
          emissive: 0xc8f000,
          emissiveIntensity: 1.6,
          roughness: 0.3,
        })
      );
      dot.position.z = 0.02;
      (dot as any).userData = { circuitIndex: i };
      group.add(dot);
      dotMeshes.push(dot);

      // Rings
      const rings: THREE.Mesh[] = [];
      for (let r = 0; r < 2; r++) {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(0.07, 0.085, 48),
          new THREE.MeshBasicMaterial({
            color: 0xc8f000,
            transparent: true,
            opacity: 0.6,
            side: THREE.DoubleSide,
          })
        );
        ring.position.z = 0.005;
        group.add(ring);
        rings.push(ring);
      }

      pivot.add(group);
      markers.push({
        group, dot, rings,
        pos: new THREE.Vector3(x, y, z),
        info: c,
        offset: i * 0.6,
      });
    });

    // Connecting lines between all pairs
    for (let i = 0; i < markers.length; i++) {
      for (let j = i + 1; j < markers.length; j++) {
        const a = markers[i].pos;
        const b = markers[j].pos;
        const mid = new THREE.Vector3(
          (a.x + b.x) / 2,
          (a.y + b.y) / 2,
          Math.max(a.z, b.z) + 0.14
        );
        const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
        const points = curve.getPoints(40);
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(
          geo,
          new THREE.LineDashedMaterial({
            color: 0xc8f000,
            transparent: true,
            opacity: 0.45,
            dashSize: 0.08,
            gapSize: 0.06,
          })
        );
        line.computeLineDistances();
        pivot.add(line);
      }
    }

    // Interaction state
    let targetRotY = 0;
    let targetRotX = BASE_X;
    let curRotY = 0;
    let curRotX = BASE_X;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let rotStartY = 0;
    let rotStartX = 0;

    const raycaster = new THREE.Raycaster();
    const mouseVec = new THREE.Vector2();

    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v));

    const onPointerDown = (clientX: number, clientY: number) => {
      isDragging = true;
      dragStartX = clientX;
      dragStartY = clientY;
      rotStartY = targetRotY;
      rotStartX = targetRotX;
      canvas.style.cursor = 'grabbing';
    };

    const onPointerMove = (clientX: number, clientY: number) => {
      if (isDragging) {
        const dx = clientX - dragStartX;
        const dy = clientY - dragStartY;
        targetRotY = clamp(rotStartY + dx * 0.005, -MAX_Y, MAX_Y);
        targetRotX = clamp(rotStartX + dy * 0.005 + 0, BASE_X - MAX_X, BASE_X + MAX_X);
      } else {
        // Hover detection
        const rect = canvas.getBoundingClientRect();
        const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -((clientY - rect.top) / rect.height) * 2 + 1;
        mouseVec.set(nx, ny);
        raycaster.setFromCamera(mouseVec, camera);
        const hits = raycaster.intersectObjects(dotMeshes, false);
        if (hits.length > 0) {
          const idx = (hits[0].object as any).userData.circuitIndex;
          const info = CIRCUITS[idx];
          canvas.style.cursor = 'pointer';
          const tx = clientX - rect.left;
          const ty = clientY - rect.top;
          setTooltip({ x: tx, y: ty, name: info.name, location: info.location });
        } else {
          canvas.style.cursor = 'grab';
          setTooltip(null);
        }
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      canvas.style.cursor = 'grab';
    };

    // Mouse
    const handleMouseDown = (e: MouseEvent) => onPointerDown(e.clientX, e.clientY);
    const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const handleMouseUp = () => onPointerUp();
    const handleMouseLeave = () => {
      onPointerUp();
      setTooltip(null);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Touch
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const t = e.touches[0];
      // Detect tap on dot
      const rect = canvas.getBoundingClientRect();
      const nx = ((t.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((t.clientY - rect.top) / rect.height) * 2 + 1;
      mouseVec.set(nx, ny);
      raycaster.setFromCamera(mouseVec, camera);
      const hits = raycaster.intersectObjects(dotMeshes, false);
      if (hits.length > 0) {
        const idx = (hits[0].object as any).userData.circuitIndex;
        const info = CIRCUITS[idx];
        const tx = t.clientX - rect.left;
        const ty = t.clientY - rect.top;
        setTooltip(prev =>
          prev && prev.name === info.name
            ? null
            : { x: tx, y: ty, name: info.name, location: info.location }
        );
        return;
      }
      onPointerDown(t.clientX, t.clientY);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      e.preventDefault();
      const t = e.touches[0];
      onPointerMove(t.clientX, t.clientY);
    };
    const handleTouchEnd = () => onPointerUp();

    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    canvas.style.cursor = 'grab';

    // Resize
    const handleResize = () => {
      const sz = getSize();
      w = sz.w; h = sz.h;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(wrapper);

    // Animate
    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth rotation
      curRotY += (targetRotY - curRotY) * 0.12;
      curRotX += (targetRotX - curRotX) * 0.12;
      pivot.rotation.y = curRotY;
      pivot.rotation.x = curRotX;

      markers.forEach((m) => {
        const pulse = Math.abs(Math.sin(t * 1.4 + m.offset));
        m.rings.forEach((ring, i) => {
          const phase = pulse * 0.45 + 1.0 + i * 0.15;
          ring.scale.set(phase, phase, 1);
          const mat = ring.material as THREE.MeshBasicMaterial;
          mat.opacity = (1 - (phase - 1) / 0.6) * 0.55;
        });
        const dotMat = m.dot.material as THREE.MeshStandardMaterial;
        dotMat.emissiveIntensity = 1.3 + Math.abs(Math.sin(t * 2 + m.offset)) * 0.7;
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      renderer.dispose();
      extrudeGeo.dispose();
      edges.dispose();
      mapMat.dispose();
    };
  }, []);

  // Constrain tooltip inside canvas
  const wrapperW = wrapperRef.current?.clientWidth ?? 0;
  const wrapperH = wrapperW * 0.62;
  let tx = tooltip?.x ?? 0;
  let ty = (tooltip?.y ?? 0) - 60;
  const TT_W = 200;
  const TT_H = 56;
  if (tx + TT_W > wrapperW) tx = wrapperW - TT_W - 8;
  if (tx < 8) tx = 8;
  if (ty < 8) ty = (tooltip?.y ?? 0) + 18;
  if (ty + TT_H > wrapperH) ty = wrapperH - TT_H - 8;

  return (
    <div className="w-full">
      <div ref={wrapperRef} className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
        <canvas ref={canvasRef} className="block w-full" />
        {tooltip && (
          <div
            className="absolute z-10 pointer-events-none"
            style={{
              left: tx,
              top: ty,
              width: TT_W,
              background: '#111',
              border: '0.5px solid #2a2a2a',
              borderRadius: 8,
              padding: '8px 10px',
            }}
          >
            <div style={{ color: '#c8f000', fontSize: 14, fontWeight: 500, lineHeight: 1.2 }}>
              {tooltip.name}
            </div>
            <div style={{ color: '#888', fontSize: 11, marginTop: 2 }}>
              {tooltip.location}
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center justify-center gap-6" style={{ color: '#666', fontSize: 12 }}>
        <div className="flex items-center gap-2">
          <span
            style={{
              display: 'inline-block',
              width: 8, height: 8, borderRadius: '50%',
              background: '#c8f000',
              boxShadow: '0 0 8px #c8f000',
            }}
          />
          <span>{language === 'es' ? 'Circuito' : 'Circuit'}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="28" height="2" aria-hidden>
            <line x1="0" y1="1" x2="28" y2="1" stroke="#c8f000" strokeWidth="1.5" strokeDasharray="4 3" />
          </svg>
          <span>{language === 'es' ? 'Ruta' : 'Route'}</span>
        </div>
      </div>
    </div>
  );
}
