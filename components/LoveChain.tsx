"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface LoveChainProps {
    count: number;
}

export default function LoveChain({ count }: LoveChainProps) {
    return (
        <div className="w-full max-w-2xl mx-auto mt-8 text-center">
            <h3 className="text-lg font-serif text-white/90 mb-4 italic">
                Our Community's Love Chain
            </h3>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
                {[...Array(Math.min(count, 12))].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1, type: "spring" }}
                    >
                        <Heart
                            className="w-5 h-5 text-red-500 fill-red-500 drop-shadow-md"
                            strokeWidth={1.5}
                        />
                    </motion.div>
                ))}
                {count > 12 && (
                    <div className="flex items-center justify-center w-6 h-6">
                        <span className="text-white/50 text-xs">...</span>
                    </div>
                )}
            </div>

            <motion.div
                key={count}
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-mono text-xs text-white bg-white/10 border border-white/20 inline-block px-4 py-2 rounded-full"
            >
                {count} acts of love shared today
            </motion.div>
        </div>
    );
}
