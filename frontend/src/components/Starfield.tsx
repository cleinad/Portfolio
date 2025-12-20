"use client";

import { useEffect, useRef } from "react";

interface Star {
    angle: number;
    radius: number;
    speed: number;
    size: number;
    flicker: number;
    flickerSpeed: number;
}

interface ShootingStar {
    x: number;
    y: number;
    vx: number;
    vy: number;
    length: number;
    opacity: number;
}

const NUM_STARS = 360;
const SHOOTING_STAR_CHANCE = 0.01;

export default function Starfield() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let stars: Star[] = [];
        let shootingStars: ShootingStar[] = [];
        let animationFrameId: number;

        function resizeCanvas() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        }

        function initStars() {
            if (!canvas) return;
            stars = [];
            const maxRadius = Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2;
            
            for (let i = 0; i < NUM_STARS; i++) {
                stars.push({
                    angle: Math.random() * Math.PI * 2,
                    radius: Math.random() * maxRadius,
                    speed: Math.random() * 0.0003 + 0.00015,
                    size: Math.random() * 1.2 + 0.5,
                    flicker: Math.random() * Math.PI * 2,
                    flickerSpeed: Math.random() * 0.05 + 0.02,
                });
            }
        }

        function createShootingStar() {
            if (!canvas) return;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 10 + 5;
            
            shootingStars.push({
                x: canvas.width / 2 + Math.cos(angle) * canvas.width,
                y: canvas.height / 2 + Math.sin(angle) * canvas.height,
                vx: -Math.cos(angle) * speed,
                vy: -Math.sin(angle) * speed,
                length: Math.random() * 200 + 100,
                opacity: 1,
            });
        }

        function drawStars(ctx: CanvasRenderingContext2D, centerX: number, centerY: number) {
            stars.forEach((star) => {
                const x = centerX + Math.cos(star.angle) * star.radius;
                const y = centerY + Math.sin(star.angle) * star.radius;

                const flickerOpacity = 0.5 + Math.sin(star.flicker) * 0.5;
                star.flicker += star.flickerSpeed;

                ctx.fillStyle = `rgba(255, 255, 255, ${flickerOpacity})`;
                ctx.beginPath();
                ctx.arc(x, y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        function drawShootingStars(ctx: CanvasRenderingContext2D) {
            shootingStars = shootingStars.filter((ss) => {
                ss.x += ss.vx;
                ss.y += ss.vy;
                ss.opacity -= 0.02;

                if (ss.opacity <= 0) return false;

                const grad = ctx.createLinearGradient(
                    ss.x,
                    ss.y,
                    ss.x - ss.vx * 2,
                    ss.y - ss.vy * 2
                );
                grad.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
                grad.addColorStop(1, "rgba(255, 255, 255, 0)");

                ctx.strokeStyle = grad;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(ss.x, ss.y);
                ctx.lineTo(ss.x + ss.vx, ss.y + ss.vy);
                ctx.stroke();

                return true;
            });
        }

        function animate() {
            if (!canvas || !ctx) return;

            // Clear with fade effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Draw regular stars
            drawStars(ctx, centerX, centerY);

            // Create new shooting stars
            if (Math.random() < SHOOTING_STAR_CHANCE) {
                createShootingStar();
            }

            // Draw and update shooting stars
            drawShootingStars(ctx);

            animationFrameId = requestAnimationFrame(animate);
        }

        function handleResize() {
            resizeCanvas();
        }

        window.addEventListener("resize", handleResize);
        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ background: "black" }}
        />
    );
}

