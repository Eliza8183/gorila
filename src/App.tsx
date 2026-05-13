/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { GameState, Player, Banana, Question } from './types';
import { QUESTIONS } from './constants';
import StartScreen from './components/StartScreen';
import GameWorld from './components/GameWorld';
import QuestionModal from './components/QuestionModal';
import ResultScreen from './components/ResultScreen';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('START');
  const [player, setPlayer] = useState<Player>({ name: '', score: 0 });
  const [bananas, setBananas] = useState<Banana[]>([
    { id: 1, x: 20, y: 30, questionId: 1, collected: false },
    { id: 2, x: 70, y: 40, questionId: 2, collected: false },
    { id: 3, x: 45, y: 70, questionId: 3, collected: false },
  ]);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [gorillaPos, setGorillaPos] = useState({ x: 10, y: 50 });

  const handleStart = (name: string) => {
    setPlayer({ name, score: 0 });
    setGameState('PLAYING');
  };

  const handleCollectBanana = (bananaId: number) => {
    const banana = bananas.find(b => b.id === bananaId);
    if (banana && !banana.collected) {
      const question = QUESTIONS.find(q => q.id === banana.questionId);
      if (question) {
        setActiveQuestion(question);
      }
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (!activeQuestion) return;

    // Update score
    if (isCorrect) {
      setPlayer(prev => ({ ...prev, score: prev.score + 1 }));
    }

    // Mark banana as collected
    setBananas(prev => prev.map(b => 
      b.questionId === activeQuestion.id ? { ...b, collected: true } : b
    ));

    // Clear question
    setActiveQuestion(null);

    // Check if game finished
    const remaining = bananas.filter(b => !b.collected && b.questionId !== activeQuestion.id);
    if (remaining.length === 0) {
      setGameState('FINISHED');
    }
  };

  const handleRestart = () => {
    setGameState('START');
    setPlayer({ name: '', score: 0 });
    setBananas([
      { id: 1, x: 20, y: 30, questionId: 1, collected: false },
      { id: 2, x: 70, y: 40, questionId: 2, collected: false },
      { id: 3, x: 45, y: 70, questionId: 3, collected: false },
    ]);
    setGorillaPos({ x: 10, y: 50 });
  };

  return (
    <div className="min-h-screen bg-[#1B4332] font-sans selection:bg-[#40916C] selection:text-white overflow-x-hidden relative">
      {/* Decorative Forest Elements */}
      <div className="fixed inset-0 pointer-events-none -z-0">
        <div className="absolute bottom-0 w-full h-64 bg-[#40916C] rounded-t-[200px] opacity-20 blur-3xl"></div>
        <div className="absolute top-10 left-10 text-8xl opacity-[0.03] -rotate-12">🦍</div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#95D5B2] rounded-full opacity-5 blur-2xl"></div>
        <div className="absolute bottom-40 right-10 w-48 h-48 bg-[#2D6A4F] rounded-full opacity-10 blur-3xl"></div>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-4 py-6 md:py-10 flex flex-col items-center justify-center min-h-screen">
        {gameState === 'START' && (
          <StartScreen onStart={handleStart} />
        )}

        {gameState === 'PLAYING' && (
          <div className="w-full space-y-8">
            {/* Top HUD */}
            <header className="flex items-center justify-between">
              <div className="bg-[#2D6A4F] border-2 border-[#D8F3DC] rounded-2xl px-6 py-3 shadow-lg flex flex-col">
                <span className="text-[#D8F3DC] text-[10px] uppercase tracking-wider font-extrabold block">Explorador</span>
                <span className="text-white text-xl md:text-2xl font-black truncate max-w-[150px] md:max-w-xs">{player.name}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-[#FFD60A] border-4 border-white rounded-3xl px-4 md:px-6 py-2 md:py-3 flex items-center shadow-xl transform hover:scale-105 transition-transform">
                  <span className="text-3xl md:text-4xl mr-3">🍌</span>
                  <div className="flex flex-col">
                    <span className="text-[#744E04] text-[10px] font-black uppercase leading-none">Puntaje</span>
                    <span className="text-[#744E04] text-2xl md:text-3xl font-black leading-none">{player.score} / {QUESTIONS.length}</span>
                  </div>
                </div>
              </div>
            </header>

            <GameWorld 
              bananas={bananas} 
              onCollectBanana={handleCollectBanana}
              gorillaPos={gorillaPos}
              setGorillaPos={setGorillaPos}
            />

            {activeQuestion && (
              <QuestionModal 
                question={activeQuestion} 
                onAnswer={handleAnswer} 
              />
            )}
          </div>
        )}

        {gameState === 'FINISHED' && (
          <ResultScreen 
            score={player.score} 
            total={QUESTIONS.length} 
            name={player.name}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
}

