export type GameState = 'START' | 'PLAYING' | 'FINISHED';

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  justification: string;
}

export interface Banana {
  id: number;
  x: number;
  y: number;
  questionId: number;
  collected: boolean;
}

export interface Player {
  name: string;
  score: number;
}
