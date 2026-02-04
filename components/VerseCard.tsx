"use client";

import { motion } from "framer-motion";

interface VerseCardProps {
    text: string;
    reference: string;
}

export default function VerseCard({ text, reference }: VerseCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 max-w-lg mx-auto relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H6.01703C4.91246 16 4.01703 16.8954 4.01703 18V21H2.01703V18C2.01703 15.7909 3.80791 14 6.01703 14H12.017C14.2262 14 16.017 15.7909 16.017 18V21H14.017ZM21.017 21H19.017V15C19.017 13.8954 18.1216 13 17.017 13H15.017V11H17.017C19.2262 11 21.017 12.7909 21.017 15V21Z" />
                </svg>
            </div>

            <p className="text-xl md:text-2xl font-serif text-white mb-6 leading-relaxed italic text-shadow-sm relative z-10">
                “{text}”
            </p>
            <p className="text-right text-xs md:text-sm font-sans font-bold tracking-widest text-valentine-200 uppercase relative z-10">
                — {reference}
            </p>
        </motion.div>
    );
}
