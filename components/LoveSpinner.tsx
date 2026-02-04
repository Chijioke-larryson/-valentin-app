"use client";

import { useState, useRef } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { challenges } from "@/lib/challenges";
import { RefreshCw, Play } from "lucide-react";
import clsx from "clsx";

interface LoveSpinnerProps {
    onComplete: () => void;
}

export default function LoveSpinner({ onComplete }: LoveSpinnerProps) {
    const [isSpinning, setIsSpinning] = useState(false);
    const [challenge, setChallenge] = useState<string | null>(null);
    const [completed, setCompleted] = useState(false);
    const controls = useAnimation();

    // Configuration
    const segments = challenges;
    const numSegments = segments.length;
    const segmentAngle = 360 / numSegments;
    const wheelColors = ["#2f4ec6", "#e11d48"]; // church-600, valentine-600 (alternating)

    const spinWheel = async () => {
        if (isSpinning || completed) return;
        setIsSpinning(true);
        setChallenge(null);

        // 1. Pick a random winning index
        const winningIndex = Math.floor(Math.random() * numSegments);

        // 2. Calculate rotation to land with winning segment at TOP (0 degrees)
        // The pointer is at 0 (top).
        // If segment 0 starts at 0 degrees (top-center aligned?), typically geometry starts at 3 o'clock or 12 o'clock.
        // Let's assume standard SVG arc starting at -90deg (12 o'clock).
        // To align segment `i` to top, we need to rotate away from it.
        // Let's add 5-8 full spins.
        const fullSpins = 360 * (5 + Math.floor(Math.random() * 3));
        // We want the CENTER of the segment to be at -90deg (Top).
        // Currently, if rotation is 0, Segment 0 is drawn from ... where?
        // Let's say we draw segments clockwise starting from -90deg.
        // Segment 0 is [-90, -90 + segAngle]. Center is -90 + segAngle/2.
        // To bring that center to -90, we rotate by -(segAngle/2).
        // Wait, easiest way: 
        // 360 - (winningIndex * segmentAngle) aligns the START of the segment to 0 (if valid).
        // Let's just adjust the target rotation properly.

        // Target is to have the Winning Segment at the Top.
        // Correction adds randomness within the segment so line doesn't land perfectly on pointer? No, center is better.
        const segmentCenterAngle = winningIndex * segmentAngle + (segmentAngle / 2);
        // We need to rotate the WHEEL such that this angle points UP.
        // If 0 deg is UP, and we draw clockwise:
        // Current angle of target = segmentCenterAngle.
        // We want current + spin = 360k - segmentCenterAngle?
        // Let's use negative rotation (counter-clockwise) to simulate standard forward spin? 
        // Usually wheels spin Clockwise.
        // If wheel spins clockwise, the segment at TOP changes: index 9 -> 8 -> 7...
        // Let Rotation R. 
        // Top Angle = (0 - R) % 360.
        // We want Top Angle to be inside Winning Segment.

        const randomOffset = (Math.random() - 0.5) * (segmentAngle * 0.8); // small random offset within segment
        const landingAngle = -(360 * 5) - (winningIndex * segmentAngle) - segmentAngle / 2 + randomOffset;

        // Actually, easier logic:
        // Just animate to a random large value, and THEN calculate which one won based on the final angle?
        // But we want to pre-determine result? Yes, easier for state control.

        // Let's stick to the calculation:
        // We want final position of segment index `i` to be at top (-90 deg in SVG space, but if we rotate the container...)
        // Let's assume the Container is rotated.
        // To land Index i at Top (Angle 0 in CSS transform):
        // We need `Rotation + (Index * 36) + 18 = 0 (mod 360)`
        // So Rotation = - (Index * 36) - 18

        const targetRotation = 360 * 5 + (360 - (winningIndex * segmentAngle) - (segmentAngle / 2));

        await controls.start({
            rotate: targetRotation,
            transition: {
                duration: 4,
                ease: [0.15, 0, 0.2, 1], // easeOutCirc / custom physics feel
                type: "tween"
            }
        });

        // Animation done
        setChallenge(segments[winningIndex]);
        setIsSpinning(false);
    };

    const handleComplete = () => {
        setCompleted(true);
        onComplete();
    };

    const reset = () => {
        setCompleted(false);
        setChallenge(null);
        controls.set({ rotate: 0 }); // Reset rotation visually if needed, or just keep spinning from there?
        // Better to reset or add to current rotation. For simplicity, we reset logic but keep visual rotation?
        // Actually, let's just keep adding rotation.
        controls.set({ rotate: 0 });
    }

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto relative z-20">
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-30 filter drop-shadow-lg">
                <div className="w-8 h-10 bg-gradient-to-br from-yellow-300 to-yellow-600 clip-path-polygon" style={{ clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)" }} />
            </div>

            {/* Wheel Container */}
            <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]">
                <motion.div
                    animate={controls}
                    className="w-full h-full rounded-full shadow-2xl relative border-4 border-white/20 overflow-hidden bg-church-950"
                    style={{ transformOrigin: "center" }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        {segments.map((_, i) => {
                            // Draw slice
                            // A generic slice from Angle A to Angle B
                            const startAngle = i * segmentAngle;
                            const endAngle = (i + 1) * segmentAngle;

                            // SVG path arithmetic
                            // x = 50 + 50 * cos(a)
                            // y = 50 + 50 * sin(a)
                            // But we need to convert degrees to radians
                            const toRad = (deg: number) => (deg * Math.PI) / 180;

                            const x1 = 50 + 50 * Math.cos(toRad(startAngle));
                            const y1 = 50 + 50 * Math.sin(toRad(startAngle));
                            const x2 = 50 + 50 * Math.cos(toRad(endAngle));
                            const y2 = 50 + 50 * Math.sin(toRad(endAngle));

                            const largeArc = segmentAngle > 180 ? 1 : 0;

                            const d = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`;

                            return (
                                <g key={i}>
                                    <path
                                        d={d}
                                        fill={i % 2 === 0 ? wheelColors[0] : wheelColors[1]}
                                        stroke="white"
                                        strokeWidth="0.5"
                                    />
                                    {/* Text or Icon inside segment? */}
                                    {/* Calculated position for text: Average angle */}
                                    {/* r = 35 (bit inside) */}
                                    <text
                                        x={50 + 35 * Math.cos(toRad(startAngle + segmentAngle / 2))}
                                        y={50 + 35 * Math.sin(toRad(startAngle + segmentAngle / 2))}
                                        fill="white"
                                        fontSize="4"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                        transform={`rotate(${startAngle + segmentAngle / 2}, ${50 + 35 * Math.cos(toRad(startAngle + segmentAngle / 2))}, ${50 + 35 * Math.sin(toRad(startAngle + segmentAngle / 2))})`}
                                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                                    >
                                        {i + 1}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>

                    {/* Inner Circle / Hub */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-yellow-400">
                            <div className="text-church-900 font-bold text-xs uppercase text-center leading-none">
                                Love<br />Week
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Controls */}
            <div className="mt-12 flex flex-col items-center gap-4 h-32">
                {!challenge && !isSpinning && !completed && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={spinWheel}
                        className="px-10 py-4 bg-gradient-to-r from-valentine-500 to-valentine-600 text-white rounded-full font-serif text-2xl shadow-xl shadow-valentine-900/50 hover:shadow-2xl border-2 border-white/20 flex items-center gap-2 group"
                    >
                        <Play className="fill-current w-6 h-6" /> SPIN
                    </motion.button>
                )}

                {isSpinning && (
                    <div className="text-white/80 font-serif italic text-lg animate-pulse">
                        Spinning...
                    </div>
                )}

                {challenge && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center gap-4 text-center max-w-sm"
                    >
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl">
                            <h3 className="text-xl md:text-2xl font-serif text-white mb-2 text-shadow">
                                {challenge}
                            </h3>
                        </div>

                        {!completed && (
                            <motion.button
                                onClick={handleComplete}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-church-500 text-white rounded-full font-sans font-bold shadow-lg hover:bg-church-400"
                            >
                                I accept!
                            </motion.button>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
