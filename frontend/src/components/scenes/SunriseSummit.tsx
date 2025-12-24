"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type SunriseSummitProps = {
  className?: string;
};

function makeSkyGradientTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  // Deep blue -> violet -> warm sunrise peach
  grad.addColorStop(0.0, "#0b1a4a");
  grad.addColorStop(0.55, "#4a2a77");
  grad.addColorStop(1.0, "#f7b58b");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle haze band near the horizon
  const haze = ctx.createLinearGradient(0, canvas.height * 0.45, 0, canvas.height);
  haze.addColorStop(0, "rgba(255, 255, 255, 0)");
  haze.addColorStop(0.35, "rgba(255, 235, 220, 0.18)");
  haze.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = haze;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.needsUpdate = true;
  return tex;
}

export default function SunriseSummit({ className }: SunriseSummitProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(68, 1, 0.1, 200);
    camera.position.set(0, 2.2, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const skyTex = makeSkyGradientTexture();
    if (skyTex) scene.background = skyTex;

    // Morning haze
    scene.fog = new THREE.FogExp2(0xf1d6c2, 0.042);

    // Lights (warm sunrise + cool shadow fill)
    const sunLight = new THREE.DirectionalLight(0xffb08a, 2.1);
    sunLight.position.set(-10, 8, -15);
    scene.add(sunLight);

    const hemi = new THREE.HemisphereLight(0x9db7ff, 0xffffff, 0.55);
    scene.add(hemi);

    // Mountain summit (snowy plane with a central peak)
    const peakGeo = new THREE.PlaneGeometry(42, 42, 180, 180);
    peakGeo.rotateX(-Math.PI / 2);

    const pos = peakGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      const r = Math.sqrt(x * x + z * z);
      const peak = Math.max(0, 1 - r / 16);

      // Mix smooth peak + small jagged snow bumps
      const bumps =
        (Math.sin(x * 0.35) + Math.cos(z * 0.38)) * 0.12 +
        (Math.random() ** 2) * 0.55;

      const y = peak * 2.2 + bumps;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
    peakGeo.computeVertexNormals();

    const peakMat = new THREE.MeshStandardMaterial({
      color: 0xf7fbff,
      roughness: 0.95,
      metalness: 0.0,
      flatShading: false,
    });
    const summit = new THREE.Mesh(peakGeo, peakMat);
    scene.add(summit);

    // Snow particle system
    const snowGeo = new THREE.BufferGeometry();
    const snowCount = 2600;
    const snowPositions = new Float32Array(snowCount * 3);
    const snowSpeeds = new Float32Array(snowCount);
    const snowDrift = new Float32Array(snowCount);

    for (let i = 0; i < snowCount; i++) {
      snowPositions[i * 3 + 0] = (Math.random() - 0.5) * 44; // x
      snowPositions[i * 3 + 1] = Math.random() * 18 + 2; // y
      snowPositions[i * 3 + 2] = (Math.random() - 0.5) * 44; // z
      snowSpeeds[i] = Math.random() * 0.35 + 0.12; // units/sec
      snowDrift[i] = (Math.random() - 0.5) * 0.22; // x drift
    }

    snowGeo.setAttribute("position", new THREE.BufferAttribute(snowPositions, 3));

    const snowMat = new THREE.PointsMaterial({
      size: 0.055,
      color: 0xffffff,
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
    });
    const snow = new THREE.Points(snowGeo, snowMat);
    scene.add(snow);

    const clock = new THREE.Clock();
    let rafId = 0;

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    function animate() {
      rafId = window.requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.033);
      const t = clock.elapsedTime;

      // Light snow fall with gentle wind drift
      const p = snowGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < snowCount; i++) {
        let x = p.getX(i);
        let y = p.getY(i);
        let z = p.getZ(i);

        y -= snowSpeeds[i] * dt;
        x += snowDrift[i] * dt + Math.sin(t * 0.35 + z * 0.03) * 0.0025;

        if (y < -0.5) {
          y = Math.random() * 18 + 2;
          x = (Math.random() - 0.5) * 44;
          z = (Math.random() - 0.5) * 44;
        }

        p.setXYZ(i, x, y, z);
      }
      p.needsUpdate = true;

      // Subtle camera sway (standing on the peak)
      camera.position.x = Math.sin(t * 0.22) * 0.22;
      camera.position.y = 2.2 + Math.sin(t * 0.14) * 0.06;
      camera.lookAt(0, 1.1, 0);

      renderer.render(scene, camera);
    }

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (rafId) window.cancelAnimationFrame(rafId);

      scene.remove(snow);
      scene.remove(summit);
      scene.remove(sunLight);
      scene.remove(hemi);

      snowGeo.dispose();
      snowMat.dispose();
      peakGeo.dispose();
      peakMat.dispose();

      if (skyTex) skyTex.dispose();

      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className ?? "fixed inset-0 z-0 pointer-events-none"}
    />
  );
}



