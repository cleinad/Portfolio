"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type SkyProps = {
    className?: string;
};

export default function Sky({ className }: SkyProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 2, 10);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        // Lighter sky blue simulation
        renderer.setClearColor(0xb3e5fc, 1);
        container.appendChild(renderer.domElement);

        // Fog for horizon haze - adjusted to match lighter sky
        scene.fog = new THREE.Fog(0xe1f5fe, 5, 60);

        // --- Clouds ---
        const cloudCount = 30; // Increased for denser cloud sea
        const clouds: THREE.Mesh[] = [];

        // Create a simple procedural cloud texture (canvas)
        const createCloudTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
                gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 256, 256);
            }
            const texture = new THREE.CanvasTexture(canvas);
            return texture;
        };

        const cloudTexture = createCloudTexture();
        const cloudMaterial = new THREE.MeshBasicMaterial({
            map: cloudTexture,
            transparent: true,
            opacity: 0.8,
            depthWrite: false,
            side: THREE.DoubleSide
        });

        const cloudGeometry = new THREE.PlaneGeometry(15, 8);

        for (let i = 0; i < cloudCount; i++) {
            const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
            cloud.position.set(
                (Math.random() - 0.5) * 60,
                -8 + (Math.random() - 0.5) * 6, // Positioned below camera
                (Math.random() - 0.5) * 50 - 15
            );
            // Rotate to be horizontal "sheets"
            cloud.rotation.x = -Math.PI / 2 + (Math.random() - 0.5) * 0.2;
            cloud.rotation.z = Math.random() * Math.PI;
            cloud.scale.set(Math.random() * 3 + 2, Math.random() * 3 + 2, 1);
            scene.add(cloud);
            clouds.push(cloud);
        }

        // --- Shooting Stars ---
        let shootingStar: THREE.Mesh | null = null;
        const shootingStarVelocity = new THREE.Vector3();
        let shootingStarCooldown = 0;

        const createShootingStar = () => {
            const geometry = new THREE.CylinderGeometry(0.02, 0, 2, 8);
            const material = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 1
            });
            const mesh = new THREE.Mesh(geometry, material);

            // Random start position high up
            mesh.position.set(
                (Math.random() - 0.5) * 40,
                20,
                (Math.random() - 0.5) * 20 - 10
            );

            // Random velocity downwards and across
            shootingStarVelocity.set(
                (Math.random() - 0.5) * 0.5,
                -0.8 - Math.random() * 0.4,
                (Math.random() - 0.5) * 0.2
            );

            // Rotate to match velocity
            const axis = new THREE.Vector3(0, 1, 0);
            mesh.quaternion.setFromUnitVectors(axis, shootingStarVelocity.clone().normalize());

            scene.add(mesh);
            return mesh;
        };

        // Add ambient lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        // Animation state
        const clock = new THREE.Clock();
        let animationId: number;

        function animate() {
            animationId = requestAnimationFrame(animate);

            const deltaTime = clock.getDelta();
            const time = clock.getElapsedTime();

            // Update clouds
            clouds.forEach((cloud, i) => {
                cloud.position.x += 0.01 + (i % 3) * 0.005;
                if (cloud.position.x > 30) cloud.position.x = -30;

                // Slight bobbing
                cloud.position.y += Math.sin(time * 0.5 + i) * 0.002;
            });

            // Update shooting star
            if (!shootingStar) {
                shootingStarCooldown -= deltaTime;
                if (shootingStarCooldown <= 0 && Math.random() < 0.01) {
                    shootingStar = createShootingStar();
                }
            } else {
                shootingStar.position.add(shootingStarVelocity);
                (shootingStar.material as THREE.MeshBasicMaterial).opacity -= 0.02;

                if ((shootingStar.material as THREE.MeshBasicMaterial).opacity <= 0 || shootingStar.position.y < -10) {
                    scene.remove(shootingStar);
                    (shootingStar.material as THREE.MeshBasicMaterial).dispose();
                    shootingStar.geometry.dispose();
                    shootingStar = null;
                    shootingStarCooldown = 3 + Math.random() * 10; // Pause before next possible star
                }
            }

            // Gentle camera sway
            camera.position.x = Math.sin(time * 0.2) * 0.5;
            camera.position.y = 2 + Math.cos(time * 0.15) * 0.2;

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

            cloudGeometry.dispose();
            cloudMaterial.dispose();
            cloudTexture.dispose();
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
            style={{
                background: 'linear-gradient(to bottom, #b3e5fc, #e1f5fe, #ffffff)',
            }}
        />
    );
}
