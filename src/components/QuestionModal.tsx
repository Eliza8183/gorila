import { motion, AnimatePresence } from 'motion/react';
import { Question } from '../types';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface QuestionModalProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
}

export default function QuestionModal({ question, onAnswer }: QuestionModalProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
  };

  const isCorrect = selectedOption === question.correctIndex;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#081C15]/80 backdrop-blur-sm" id="question-modal-overlay">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#F5F5F0] rounded-[40px] shadow-2xl border-[12px] border-[#95D5B2] max-w-2xl w-full overflow-hidden"
        id="question-modal-content"
      >
        {/* Question Header */}
        <div className="bg-[#95D5B2] p-8 text-center">
          <h2 className="text-[#1B4332] text-2xl font-black uppercase tracking-tight">¡Desafío Banana! 🧠</h2>
        </div>

        <div className="p-8 md:p-10">
          <p className="text-[#2D6A4F] text-2xl font-bold text-center leading-tight mb-8">
            {question.text}
          </p>
          
          <div className="grid gap-4">
            {question.options.map((option, index) => {
              const alphabet = ['A', 'B', 'C'];
              return (
                <button
                  key={index}
                  id={`option-${index}`}
                  onClick={() => handleOptionClick(index)}
                  disabled={isAnswered}
                  className={`
                    flex items-center p-5 rounded-2xl border-4 transition-all group
                    ${isAnswered 
                      ? index === question.correctIndex 
                        ? 'bg-[#D8F3DC] border-[#40916C] shadow-md' 
                        : index === selectedOption 
                          ? 'border-red-400 bg-red-50'
                          : 'bg-white border-gray-100 opacity-50'
                      : 'bg-white border-[#D8F3DC] hover:border-[#40916C] shadow-sm hover:shadow-md'
                    }
                  `}
                >
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-black mr-6 transition-colors
                    ${isAnswered 
                      ? index === question.correctIndex 
                        ? 'bg-[#40916C] text-white' 
                        : index === selectedOption 
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 text-gray-400'
                      : 'bg-[#D8F3DC] text-[#1B4332] group-hover:bg-[#40916C] group-hover:text-white'
                    }
                  `}>
                    {alphabet[index]}
                  </div>
                  <span className={`text-xl font-bold ${isAnswered && index === question.correctIndex ? 'text-[#1B4332]' : 'text-gray-700'}`}>
                    {option}
                  </span>
                  {selectedOption === index && (
                    <span className="ml-auto text-3xl">
                      {index === question.correctIndex ? '✅' : '❌'}
                    </span>
                  )}
                  {isAnswered && index === question.correctIndex && index !== selectedOption && (
                    <span className="ml-auto text-3xl">🧩</span>
                  )}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="mt-8 overflow-hidden"
              >
                <div className="bg-[#B7E4C7]/30 p-6 rounded-3xl border-2 border-dashed border-[#40916C] mb-8">
                  <p className="text-[#1B4332] text-center font-medium leading-relaxed">
                    <span className="font-black uppercase tracking-wider block mb-2">
                       {isCorrect ? '¡Correcto!' : 'Respuesta Incorrecta'}
                    </span>
                    {question.justification}
                  </p>
                </div>

                <button
                  id="btn-continue"
                  onClick={() => onAnswer(isCorrect)}
                  className="w-full py-5 bg-[#1B4332] text-white text-xl font-black rounded-2xl shadow-lg hover:bg-[#2D6A4F] uppercase tracking-widest transition-all transform hover:scale-[1.02]"
                >
                  Continuar Aventura
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
