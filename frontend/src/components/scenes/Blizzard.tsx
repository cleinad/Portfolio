"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type BlizzardProps = {
  className?: string;
};

export default function Blizzard({ className }: BlizzardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xe8eef5, 1);
    container.appendChild(renderer.domElement);

    // Blizzard atmosphere - dense fog
    scene.fog = new THREE.FogExp2(0xe8eef5, 0.04);

    // Create snowflake geometry
    const snowflakeCount = 3000;
    const snowGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(snowflakeCount * 3);
    const velocities = new Float32Array(snowflakeCount * 3);
    const sizes = new Float32Array(snowflakeCount);

    // Initialize snow particles in 3D space
    for (let i = 0; i < snowflakeCount; i++) {
      const i3 = i * 3;
      
      // Position: spread across wide area
      positions[i3] = (Math.random() - 0.5) * 100;     // x
      positions[i3 + 1] = Math.random() * 100 - 20;    // y
      positions[i3 + 2] = (Math.random() - 0.5) * 100; // z
      
      // Velocity: falling + wind drift
      velocities[i3] = (Math.random() - 0.5) * 0.3;     // x drift
      velocities[i3 + 1] = -(Math.random() * 0.2 + 0.3); // y fall speed
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.2;  // z drift
      
      // Size variation - much smaller for realistic snow
      sizes[i] = Math.random() * 0.3 + 0.3;
    }

    snowGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    snowGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Snow material - fine white particles
    const snowMaterial = new THREE.PointsMaterial({
      size: 0.5,
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const snowParticles = new THREE.Points(snowGeometry, snowMaterial);
    scene.add(snowParticles);

    // Add ambient lighting for depth
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Animation state
    const clock = new THREE.Clock();
    let animationId: number;

    // Wind parameters
    let windTime = 0;

    function animate() {
      animationId = requestAnimationFrame(animate);
      
      const deltaTime = clock.getDelta();
      windTime += deltaTime;

      // Update snow particle positions
      const positions = snowGeometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < snowflakeCount; i++) {
        const i3 = i * 3;
        
        // Apply velocity
        positions[i3] += velocities[i3] + Math.sin(windTime + i) * 0.01;     // x with wind
        positions[i3 + 1] += velocities[i3 + 1];                             // y falling
        positions[i3 + 2] += velocities[i3 + 2] + Math.cos(windTime + i) * 0.008; // z with wind
        
        // Reset snowflakes that fall below view
        if (positions[i3 + 1] < -30) {
          positions[i3 + 1] = 70;
          positions[i3] = (Math.random() - 0.5) * 100;
          positions[i3 + 2] = (Math.random() - 0.5) * 100;
        }
        
        // Wrap around horizontally for infinite effect
        if (Math.abs(positions[i3]) > 50) {
          positions[i3] = -Math.sign(positions[i3]) * 50;
        }
        if (Math.abs(positions[i3 + 2]) > 50) {
          positions[i3 + 2] = -Math.sign(positions[i3 + 2]) * 50;
        }
      }
      
      snowGeometry.attributes.position.needsUpdate = true;

      // Subtle camera sway to simulate being in the storm
      camera.position.x = Math.sin(windTime * 0.5) * 0.5;
      camera.position.y = 5 + Math.cos(windTime * 0.3) * 0.3;
      camera.lookAt(
        Math.sin(windTime * 0.2) * 2,
        0,
        Math.cos(windTime * 0.15) * 2
      );

      renderer.render(scene, camera);
    }

    // Handle window resize
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    }

    window.addEventListener('resize', handleResize);
    
    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      
      snowGeometry.dispose();
      snowMaterial.dispose();
      renderer.dispose();
      
      if (container.contains(renderer.domElement)) {
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
