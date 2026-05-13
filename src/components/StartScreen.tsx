import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, User } from 'lucide-react';

interface StartScreenProps {
  onStart: (name: string) => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    } else {
      setError('Debes escribir tu nombre para comenzar.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-10 bg-[#F5F5F0] rounded-[40px] shadow-2xl border-[12px] border-[#95D5B2] max-w-md w-full mx-auto"
      id="start-screen"
    >
      <div className="w-24 h-24 bg-[#FCE7F3] rounded-full flex items-center justify-center mb-6 border-4 border-[#F472B6]">
        <span className="text-5xl">🦍</span>
      </div>

      <h1 className="text-4xl font-black text-[#DB2777] mb-2 uppercase tracking-tight text-center">
        Gorila IA
      </h1>
      
      <p className="text-center text-[#2D6A4F] mb-8 font-bold leading-tight">
        Ayuda al gorila a aprender sobre IA recolectando bananas educativas.
      </p>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div>
          <label htmlFor="playerName" className="block text-xs font-black text-[#1B4332] uppercase tracking-widest mb-2 ml-1">
            Tu Nombre Explorador:
          </label>
          <div className="relative">
            <input
              id="playerName"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value) setError('');
              }}
              placeholder="Ej. Mateo_Explorer"
              className="w-full px-6 py-4 rounded-3xl border-4 border-[#D8F3DC] focus:border-[#40916C] bg-white transition-all outline-none text-xl font-bold text-[#1B4332] placeholder:text-[#D8F3DC]"
            />
          </div>
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-3 font-black uppercase text-center"
            >
              ⚠️ {error}
            </motion.p>
          )}
        </div>

        <button
          id="btn-start"
          type="submit"
          className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-black py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.03] uppercase tracking-widest text-lg"
        >
          ¡Comenzar Desafío!
        </button>
      </form>
    </motion.div>
  );
}
