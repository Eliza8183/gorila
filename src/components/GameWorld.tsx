import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Banana as BananaType } from '../types';
import { FOREST_BG, GORILLA_IMG } from '../constants';

interface GameWorldProps {
  bananas: BananaType[];
  onCollectBanana: (bananaId: number) => void;
  gorillaPos: { x: number; y: number };
  setGorillaPos: Dispatch<SetStateAction<{ x: number; y: number }>>;
}


export default function GameWorld({ bananas, onCollectBanana, gorillaPos, setGorillaPos }: GameWorldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Movement speed
  const SPEED = 5;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setGorillaPos(prev => {
        let newX = prev.x;
        let newY = prev.y;

        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') newX -= SPEED;
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') newX += SPEED;
        if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') newY -= SPEED;
        if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') newY += SPEED;

        // Boundaries (percentage based)
        newX = Math.max(0, Math.min(90, newX));
        newY = Math.max(20, Math.min(80, newY)); // Keep vertical range reasonable

        return { x: newX, y: newY };
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setGorillaPos]);

  return (
    <div className="relative w-full rounded-[40px] overflow-hidden shadow-2xl border-[12px] border-[#081C15] flex flex-col" id="game-container-shell">
      <div 
        ref={containerRef}
        className="relative w-full aspect-video bg-green-900" 
        id="game-world-container"
        style={{
          backgroundImage: `url(${FOREST_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Decorative Overlay */}
        <div className="absolute inset-0 bg-[#081C15]/10 pointer-events-none" />

        {/* HUD Inside World */}
        <div className="absolute top-4 left-4 bg-[#F5F5F0]/80 backdrop-blur-md px-5 py-2 rounded-2xl border-2 border-[#95D5B2] shadow-sm z-10 pointer-events-none">
          <p className="text-[10px] font-black text-[#1B4332] uppercase tracking-[0.2em] flex items-center gap-2">
            Misión: Colecciona las Bananas {bananas.filter(b => b.collected).length}/{bananas.length}
          </p>
        </div>

        {/* Bananas */}
        <AnimatePresence>
          {bananas.map((banana) => (
            !banana.collected && (
              <motion.button
                key={banana.id}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: 1, 
                  y: [0, -15, 0] 
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  duration: 0.5,
                  y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                }}
                id={`banana-${banana.id}`}
                onClick={() => onCollectBanana(banana.id)}
                className="absolute z-20 cursor-pointer group"
                style={{ left: `${banana.x}%`, top: `${banana.y}%` }}
              >
                <div className="relative">
                  <div className="absolute -inset-6 bg-yellow-400 rounded-full opacity-30 blur-xl group-hover:opacity-60 transition-opacity" />
                  <span className="text-6xl drop-shadow-xl relative z-10 block transform group-hover:scale-125 transition-transform">🍌</span>
                </div>
              </motion.button>
            )
          ))}
        </AnimatePresence>

        {/* Gorilla */}
        <motion.div
          animate={{ 
            left: `${gorillaPos.x}%`, 
            top: `${gorillaPos.y}%`,
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="absolute w-28 h-28 z-30 pointer-events-none -translate-x-1/2 -translate-y-1/2"
          id="gorilla"
        >
          <img 
            src={GORILLA_IMG} 
            alt="Gorila" 
            className="w-full h-full object-contain drop-shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black/30 blur-lg rounded-full -z-10" />
        </motion.div>
      </div>

      {/* Bottom Controls Info - Natural Tones Style */}
      <div className="z-20 bg-[#081C15] p-4 flex flex-wrap justify-center items-center gap-6 md:gap-12">
        <div className="flex items-center text-[#B7E4C7] space-x-3">
          <div className="bg-[#1B4332] px-2 py-1 rounded-md font-mono border border-[#40916C] text-xs font-bold">WASD</div>
          <span className="text-[10px] font-black uppercase tracking-widest">Mover Gorila</span>
        </div>
        <div className="flex items-center text-[#B7E4C7] space-x-3">
          <div className="bg-[#1B4332] px-2 py-1 rounded-md font-mono border border-[#40916C] text-xs font-bold text-center">CLICK</div>
          <span className="text-[10px] font-black uppercase tracking-widest">Recolectar Banana</span>
        </div>
        <div className="hidden md:block h-4 w-px bg-[#40916C]"></div>
        <div className="text-[#95D5B2] italic text-[10px] font-medium tracking-tight">Explora el bosque y completa las 3 bananas educativas</div>
      </div>
    </div>
  );
}
