import { motion } from 'motion/react';
import { Award, RotateCcw } from 'lucide-react';

interface ResultScreenProps {
  score: number;
  total: number;
  name: string;
  onRestart: () => void;
}

export default function ResultScreen({ score, total, name, onRestart }: ResultScreenProps) {
  const percentage = (score / total) * 100;
  
  let message = '';
  if (percentage === 100) message = '¡Eres un experto en IA!';
  else if (percentage >= 50) message = '¡Muy buen trabajo!';
  else message = '¡Sigue aprendiendo, tú puedes!';

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center justify-center p-12 bg-[#F5F5F0] rounded-[40px] shadow-2xl border-[12px] border-[#FFD60A] max-w-lg mx-auto text-center"
      id="result-screen"
    >
      <div className="w-24 h-24 bg-[#FFFBDB] rounded-full flex items-center justify-center mb-6 border-4 border-[#FFD60A]">
        <Award className="w-12 h-12 text-[#744E04]" />
      </div>

      <h2 className="text-3xl font-black text-[#1B4332] mb-2 uppercase tracking-tight">¡Misión Cumplida, {name}!</h2>
      <p className="text-xl text-[#2D6A4F] font-bold mb-8">{message}</p>

      <div className="bg-white px-8 py-6 rounded-3xl mb-8 w-full border-4 border-[#D8F3DC] shadow-inner">
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Tu Puntaje Final</p>
        <p className="text-6xl font-black text-[#40916C]">
          {score} <span className="text-3xl text-gray-300">/ {total}</span>
        </p>
      </div>

      <p className="text-lg text-gray-700 mb-8 font-medium">
        Has ayudado al Gorila a aprender conceptos clave de IA en el bosque.
      </p>

      <button
        id="btn-restart"
        onClick={onRestart}
        className="w-full flex items-center justify-center gap-3 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-black py-5 rounded-2xl shadow-lg transition-all transform hover:scale-105 uppercase tracking-widest"
      >
        <RotateCcw className="w-5 h-5" />
        Volver al Inicio
      </button>
    </motion.div>
  );
}
