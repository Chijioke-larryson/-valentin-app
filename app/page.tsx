"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import LoveSpinner from "@/components/LoveSpinner";
import LoveChain from "@/components/LoveChain";
import VerseCard from "@/components/VerseCard";
import { verses } from "@/lib/verses";
import Confetti from "react-confetti";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
    const [userSpins, setUserSpins] = useState(0);
    const [spinnerKey, setSpinnerKey] = useState(0);
    const [count, setCount] = useState(247); // Start with a warm community number
    const [showConfetti, setShowConfetti] = useState(false);
    const [revealedVerse, setRevealedVerse] = useState<{ text: string; reference: string } | null>(null);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        // Client-side window size for confetti
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        // Set initial size
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleChallengeComplete = () => {
        // 1. Increment community count
        setCount((prev) => prev + 1);

        // 2. Increment user spins
        setUserSpins((prev) => prev + 1);

        // 3. Show confetti
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5s

        // 4. Pick and show a random verse
        const randomVerse = verses[Math.floor(Math.random() * verses.length)];
        setRevealedVerse(randomVerse);
    };

    const handleReset = () => {
        setRevealedVerse(null);
        setSpinnerKey((prev) => prev + 1);
        // Optional: scroll to spinner if needed
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden font-sans text-white">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/background.jpg"
                    alt="Background"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-church-950/90 via-church-900/80 to-church-950/95" />
            </div>

            {/* Confetti Layer */}
            {showConfetti && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    colors={['#f43f5e', '#fb7185', '#ffe4e6', '#ffd700']} // Valentine + Gold
                    numberOfPieces={200}
                    recycle={false}
                    className="z-50"
                />
            )}

            <div className="z-10 w-full max-w-4xl flex flex-col items-center gap-8 py-8">
                <Header />

                <div className="w-full flex flex-col items-center justify-center">
                    <LoveSpinner key={spinnerKey} onComplete={handleChallengeComplete} />

                    <AnimatePresence>
                        {revealedVerse && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="w-full mt-8"
                            >
                                <VerseCard text={revealedVerse.text} reference={revealedVerse.reference} />

                                <div className="text-center mt-8">
                                    {userSpins < 3 ? (
                                        <button
                                            onClick={handleReset}
                                            className="text-white/70 hover:text-white underline font-sans text-sm tracking-wide transition-colors"
                                        >
                                            Do another act of love ({3 - userSpins} remaining)
                                        </button>
                                    ) : (
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-red-500/30"
                                        >
                                            <p className="text-red-400 font-black text-xl md:text-2xl uppercase tracking-widest text-shadow-sm animate-pulse leading-relaxed">
                                                Now Show an Act of love in Real-world<br />
                                                <span className="text-white block mt-2 text-base md:text-lg font-serif italic normal-case opacity-90">
                                                    Happy Valentine's Day!
                                                </span>
                                            </p>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <LoveChain count={count} />

                <footer className="mt-8 text-center text-white/40 text-xs tracking-widest uppercase">
                    Ignited to Illuminate • Ephesians 2:8-10
                </footer>
            </div>
        </main>
    );
}
