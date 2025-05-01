"use client";

import { motion } from "framer-motion";

export const AnimatedCampfire = ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <div className={`relative w-8 h-8 ${className}`}>
      {/* Logs */}
      <motion.div
        className="absolute bottom-0 left-1/2 w-6 h-2 bg-leather-dark rounded-full -translate-x-1/2"
        initial={{ rotate: -10 }}
        animate={{ rotate: [-10, -8, -10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1 left-1/2 w-5 h-2 bg-leather rounded-full -translate-x-[40%] rotate-12"
        initial={{ rotate: 12 }}
        animate={{ rotate: [12, 10, 12] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Base flame */}
      <motion.div
        className="absolute bottom-2 left-1/2 w-4 h-5 bg-goldenGlow rounded-full -translate-x-1/2 origin-bottom"
        initial={{ scaleY: 0.9, scaleX: 0.9 }}
        animate={{ scaleY: [0.9, 1.1, 0.9], scaleX: [0.9, 1, 0.9] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Middle flame */}
      <motion.div
        className="absolute bottom-3 left-1/2 w-3 h-4 bg-[#FF9D00] rounded-t-full -translate-x-1/2 origin-bottom"
        initial={{ scaleY: 0.8, scaleX: 0.8 }}
        animate={{ scaleY: [0.8, 1.2, 0.8], scaleX: [0.8, 1.1, 0.8] }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.1,
        }}
      />

      {/* Top flame */}
      <motion.div
        className="absolute bottom-4 left-1/2 w-2 h-3 bg-[#FF5500] rounded-t-full -translate-x-1/2 origin-bottom"
        initial={{ scaleY: 0.7, scaleX: 0.7 }}
        animate={{ scaleY: [0.7, 1.3, 0.7], scaleX: [0.7, 1, 0.7] }}
        transition={{
          duration: 0.7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />

      {/* Ember particles */}
      <motion.div
        className="absolute bottom-3 left-1/2 w-1 h-1 bg-goldenGlow rounded-full -translate-x-1"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: [-10, -20], opacity: [0, 1, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-3 left-1/2 w-0.5 h-0.5 bg-goldenGlow rounded-full -translate-x-0"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: [-15, -25], opacity: [0, 1, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute bottom-3 left-1/2 w-0.5 h-0.5 bg-goldenGlow rounded-full -translate-x-2"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: [-12, -22], opacity: [0, 1, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.2,
        }}
      />

      {/* Glow effect */}
      <div className="absolute bottom-1 left-1/2 w-6 h-6 bg-goldenGlow/20 rounded-full -translate-x-1/2 blur-md" />
    </div>
  );
};
