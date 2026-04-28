import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Move } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Detailed mainland Spain outline (lon, lat) — higher fidelity coastline
const SPAIN_OUTLINE: [number, number][] = [
  // North coast (Galicia → País Vasco), west to east
  [-8.88, 41.82], [-9.03, 42.10], [-9.27, 42.55], [-9.30, 42.93], [-9.18, 43.18],
  [-8.88, 43.32], [-8.55, 43.32], [-8.30, 43.55], [-8.05, 43.72], [-7.70, 43.78],
  [-7.40, 43.75], [-7.05, 43.55], [-6.65, 43.57], [-6.20, 43.57], [-5.85, 43.65],
  [-5.50, 43.55], [-5.05, 43.55], [-4.50, 43.45], [-4.00, 43.42], [-3.50, 43.50],
  [-3.10, 43.45], [-2.70, 43.43], [-2.30, 43.40], [-1.95, 43.36], [-1.78, 43.38],
  // Pyrenees border with France
  [-1.55, 43.28], [-1.40, 43.05], [-1.05, 43.00], [-0.70, 42.92], [-0.30, 42.83],
  [0.10, 42.72], [0.45, 42.70], [0.70, 42.85], [1.10, 42.72], [1.45, 42.60],
  [1.72, 42.50], [2.00, 42.45], [2.30, 42.42], [2.65, 42.40], [3.05, 42.43],
  // Mediterranean east coast (Costa Brava → Costa del Sol)
  [3.20, 42.33], [3.18, 42.10], [2.85, 41.70], [2.20, 41.30], [1.55, 41.10],
  [1.10, 40.95], [0.85, 40.75], [0.65, 40.55], [0.55, 40.20], [0.30, 39.90],
  [0.05, 39.55], [-0.10, 39.30], [-0.20, 39.00], [-0.10, 38.85], [0.05, 38.65],
  [0.20, 38.45], [0.05, 38.30], [-0.20, 38.20], [-0.50, 38.10], [-0.65, 37.85],
  [-0.85, 37.65], [-1.10, 37.55], [-1.35, 37.45], [-1.60, 37.30], [-1.85, 37.10],
  [-2.10, 36.85], [-2.40, 36.83], [-2.75, 36.75], [-3.10, 36.75], [-3.50, 36.72],
  [-3.85, 36.72], [-4.20, 36.70], [-4.50, 36.55], [-4.80, 36.50], [-5.10, 36.43],
  [-5.30, 36.20], [-5.45, 36.05], [-5.60, 36.00], [-5.85, 36.05], [-6.05, 36.20],
  // South-west coast (Atlantic, Cádiz → Huelva → Algarve border)
  [-6.20, 36.40], [-6.30, 36.55], [-6.40, 36.75], [-6.55, 36.95], [-6.75, 37.10],
  [-7.05, 37.20], [-7.25, 37.20], [-7.42, 37.20],
  // Border with Portugal (south to north)
  [-7.50, 37.50], [-7.45, 37.85], [-7.30, 38.10], [-7.10, 38.30], [-6.95, 38.55],
  [-7.05, 38.85], [-7.20, 39.10], [-7.30, 39.40], [-7.05, 39.70], [-6.95, 40.00],
  [-7.05, 40.25], [-6.85, 40.50], [-6.85, 40.85], [-6.95, 41.10], [-6.75, 41.30],
  [-6.55, 41.50], [-6.40, 41.70], [-6.55, 41.90], [-6.85, 42.00], [-7.20, 41.95],
  [-7.55, 41.90], [-7.90, 41.85], [-8.20, 41.80], [-8.50, 41.85], [-8.75, 41.85],
  [-8.88, 41.82],
];

const CIRCUITS = [
  {
    num: 1,
    name: 'Circuito de Campillos',
    location: 'Málaga, Andalucía',
    date: '20 — 22 MAR 2026',
    lat: 37.0612, lon: -4.8659,
    labelOffset: { x: 28, y: 6 },
    side: 'left' as const,
  },
  {
    num: 2,
    name: 'MotorLand Aragón',
    location: 'Alcañiz, Teruel',
    date: '15 — 17 MAY 2026',
    lat: 41.1067, lon: -0.2517,
    labelOffset: { x: 22, y: -4 },
    side: 'right' as const,
  },
  {
    num: 3,
    name: 'Kartódromo Lucas Guerrero',
    location: 'Chiva, Valencia',
    date: '19 — 21 JUN 2026',
    lat: 39.4697, lon: -0.7183,
    labelOffset: { x: 22, y: 0 },
    side: 'right' as const,
  },
  {
    num: 4,
    name: 'Aspar Circuit',
    location: 'Guadassuar, Valencia',
    date: '25 — 27 SEP 2026',
    lat: 38.3924, lon: -0.4172,
    labelOffset: { x: 22, y: 18 },
    side: 'right' as const,
  },
];

const LON_MIN = -9.8;
const LON_RANGE = 13.4;
const LAT_MIN = 35.7;
const LAT_RANGE = 8.4;

function project(lon: number, lat: number): [number, number] {
  const x = ((lon - LON_MIN) / LON_RANGE - 0.5) * 2.5;
  const y = ((lat - LAT_MIN) / LAT_RANGE - 0.5) * 1.7;
  return [x, y];
}

const MAX_Y = (60 * Math.PI) / 180;
const MAX_X = (30 * Math.PI) / 180;
const BASE_X = -0.22;

type LabelState = { x: number; y: number; visible: boolean };

export function SpainMap3D() {
  const { language } = useLanguage();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [labels, setLabels] = useState<LabelState[]>(
    CIRCUITS.map(() => ({ x: 0, y: 0, visible: false }))
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const scene = new THREE.Scene();
    scene.background = null;

    const getSize = () => {
      const w = wrapper.clientWidth;
      const h = w * 0.62;
      return { w, h };
    };

    let { w, h } = getSize();

    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    renderer.setClearColor(0x000000, 0);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(2, 3, 4);
    scene.add(dir);
    const rim = new THREE.DirectionalLight(0xffffff, 0.25);
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
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.014,
      bevelSegments: 3,
    });
    const mapMat = new THREE.MeshStandardMaterial({
      color: 0x121224,
      roughness: 0.85,
      metalness: 0.1,
    });
    const mapMesh = new THREE.Mesh(extrudeGeo, mapMat);
    pivot.add(mapMesh);

    // Edge highlight (white)
    const edges = new THREE.EdgesGeometry(extrudeGeo, 30);
    const edgeLines = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 })
    );
    pivot.add(edgeLines);

    // Circuit markers
    type MarkerData = {
      group: THREE.Group;
      dot: THREE.Mesh;
      rings: THREE.Mesh[];
      pos: THREE.Vector3;
      worldPos: THREE.Vector3;
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
        new THREE.CircleGeometry(0.06, 32),
        new THREE.MeshBasicMaterial({ color: 0x222233 })
      );
      group.add(disc);

      // Glowing white dot
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.034, 24, 24),
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: 0xffffff,
          emissiveIntensity: 1.6,
          roughness: 0.3,
        })
      );
      dot.position.z = 0.02;
      (dot as any).userData = { circuitIndex: i };
      group.add(dot);
      dotMeshes.push(dot);

      // Pulsing rings (white)
      const rings: THREE.Mesh[] = [];
      for (let r = 0; r < 2; r++) {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(0.06, 0.075, 48),
          new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.5,
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
        worldPos: new THREE.Vector3(),
        offset: i * 0.6,
      });
    });

    // Connecting white dashed lines between all pairs
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
            color: 0xffffff,
            transparent: true,
            opacity: 0.4,
            dashSize: 0.07,
            gapSize: 0.05,
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
        targetRotX = clamp(rotStartX + dy * 0.005, BASE_X - MAX_X, BASE_X + MAX_X);
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      canvas.style.cursor = 'grab';
    };

    const handleMouseDown = (e: MouseEvent) => onPointerDown(e.clientX, e.clientY);
    const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const handleMouseUp = () => onPointerUp();
    const handleMouseLeave = () => onPointerUp();

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const t = e.touches[0];
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
    const tmpVec = new THREE.Vector3();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      curRotY += (targetRotY - curRotY) * 0.12;
      curRotX += (targetRotX - curRotX) * 0.12;
      pivot.rotation.y = curRotY;
      pivot.rotation.x = curRotX;
      pivot.updateMatrixWorld();

      markers.forEach((m) => {
        const pulse = Math.abs(Math.sin(t * 1.4 + m.offset));
        m.rings.forEach((ring, i) => {
          const phase = pulse * 0.45 + 1.0 + i * 0.15;
          ring.scale.set(phase, phase, 1);
          const mat = ring.material as THREE.MeshBasicMaterial;
          mat.opacity = (1 - (phase - 1) / 0.6) * 0.5;
        });
        const dotMat = m.dot.material as THREE.MeshStandardMaterial;
        dotMat.emissiveIntensity = 1.3 + Math.abs(Math.sin(t * 2 + m.offset)) * 0.7;
      });

      renderer.render(scene, camera);

      // Project marker positions to screen for HTML labels
      const newLabels: LabelState[] = markers.map((m) => {
        tmpVec.copy(m.pos);
        m.group.parent!.localToWorld(tmpVec);
        tmpVec.project(camera);
        const sx = (tmpVec.x * 0.5 + 0.5) * w;
        const sy = (-tmpVec.y * 0.5 + 0.5) * h;
        const visible = tmpVec.z < 1 && tmpVec.z > -1;
        return { x: sx, y: sy, visible };
      });
      setLabels((prev) => {
        // Avoid setState if values barely changed
        let changed = false;
        for (let i = 0; i < newLabels.length; i++) {
          const a = prev[i];
          const b = newLabels[i];
          if (
            Math.abs(a.x - b.x) > 0.5 ||
            Math.abs(a.y - b.y) > 0.5 ||
            a.visible !== b.visible
          ) {
            changed = true;
            break;
          }
        }
        return changed ? newLabels : prev;
      });
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

  const leftCircuits = CIRCUITS.filter((c) => c.side === 'left');
  const rightCircuits = CIRCUITS.filter((c) => c.side === 'right');

  const Annotation = ({
    c,
    align,
  }: {
    c: typeof CIRCUITS[number];
    align: 'left' | 'right';
  }) => (
    <div
      className={`flex items-start gap-3 ${align === 'right' ? 'flex-row-reverse text-right' : 'text-left'}`}
    >
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-full border border-white/40"
        style={{ width: 26, height: 26, fontSize: 11, fontWeight: 600, color: '#fff' }}
      >
        {c.num.toString().padStart(2, '0')}
      </div>
      <div>
        <div
          style={{
            color: '#fff',
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            lineHeight: 1.15,
          }}
        >
          {c.name}
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 10.5,
            marginTop: 3,
            letterSpacing: '0.02em',
          }}
        >
          {c.location}
        </div>
        <div
          className="font-mono"
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 10,
            marginTop: 4,
            letterSpacing: '0.12em',
          }}
        >
          {c.date}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_180px] gap-6 lg:gap-8 items-center">
        {/* Left annotations */}
        <div className="hidden lg:flex flex-col gap-8 justify-center">
          {leftCircuits.map((c) => (
            <Annotation key={c.num} c={c} align="left" />
          ))}
        </div>

        {/* Map */}
        <div ref={wrapperRef} className="relative w-full">
          <canvas ref={canvasRef} className="block w-full" />

          {/* Drag indicator */}
          <div
            className="absolute top-3 right-3 flex items-center gap-1.5 pointer-events-none"
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: 10,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '5px 9px',
              border: '0.5px solid rgba(255,255,255,0.18)',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <Move size={12} strokeWidth={1.5} />
            <span>{language === 'es' ? 'Arrastra' : 'Drag'}</span>
          </div>

          {/* Numbered marker badges */}
          {CIRCUITS.map((c, i) => {
            const l = labels[i];
            if (!l.visible) return null;
            return (
              <div
                key={`badge-${c.num}`}
                className="absolute pointer-events-none select-none flex items-center justify-center rounded-full"
                style={{
                  left: l.x,
                  top: l.y,
                  width: 18,
                  height: 18,
                  transform: 'translate(-50%, -50%)',
                  background: '#fff',
                  color: '#000',
                  fontSize: 10,
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  boxShadow: '0 0 10px rgba(255,255,255,0.6)',
                }}
              >
                {c.num}
              </div>
            );
          })}

          {/* Inline labels next to marker (only on lg- where side panels are hidden) */}
          <div className="lg:hidden">
            {CIRCUITS.map((c, i) => {
              const l = labels[i];
              if (!l.visible) return null;
              const lx = l.x + (c.labelOffset?.x ?? 22);
              const ly = l.y + (c.labelOffset?.y ?? 0);
              return (
                <div
                  key={c.name}
                  className="absolute pointer-events-none select-none"
                  style={{
                    left: lx,
                    top: ly,
                    transform: 'translateY(-50%)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <div
                    style={{
                      color: '#fff',
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      lineHeight: 1.1,
                    }}
                  >
                    {c.num.toString().padStart(2, '0')} · {c.name}
                  </div>
                  <div
                    style={{
                      color: 'rgba(255,255,255,0.45)',
                      fontSize: 9,
                      marginTop: 1,
                    }}
                  >
                    {c.location}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right annotations */}
        <div className="hidden lg:flex flex-col gap-8 justify-center">
          {rightCircuits.map((c) => (
            <Annotation key={c.num} c={c} align="right" />
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-6 flex-wrap" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>
        <div className="flex items-center gap-2">
          <span
            style={{
              display: 'inline-block',
              width: 8, height: 8, borderRadius: '50%',
              background: '#fff',
              boxShadow: '0 0 8px rgba(255,255,255,0.6)',
            }}
          />
          <span>{language === 'es' ? 'Circuito' : 'Circuit'}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="28" height="2" aria-hidden>
            <line x1="0" y1="1" x2="28" y2="1" stroke="#fff" strokeWidth="1.5" strokeDasharray="4 3" />
          </svg>
          <span>{language === 'es' ? 'Ruta' : 'Route'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Move size={12} strokeWidth={1.5} />
          <span>{language === 'es' ? 'Arrastra para rotar' : 'Drag to rotate'}</span>
        </div>
      </div>
    </div>
  );
}
