import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "¿Qué significa IA?",
    options: [
      "Inteligencia Artificial",
      "Internet Automático",
      "Información Avanzada"
    ],
    correctIndex: 0,
    justification: "IA significa Inteligencia Artificial, sistemas que simulan capacidades humanas."
  },
  {
    id: 2,
    text: "¿Qué hace un chatbot?",
    options: [
      "Hablar con personas",
      "Cocinar comida",
      "Reparar computadores"
    ],
    correctIndex: 0,
    justification: "Los chatbots responden preguntas y conversan con usuarios."
  },
  {
    id: 3,
    text: "¿Qué necesita una IA para aprender?",
    options: [
      "Datos",
      "Gasolina",
      "Tornillos"
    ],
    correctIndex: 0,
    justification: "Las IA aprenden analizando datos y ejemplos."
  }
];

export const FOREST_BG = "/src/assets/images/gorilla_forest_bg_1778688175450.png";
export const GORILLA_IMG = "/src/assets/images/cartoon_gorilla_1778688189759.png";
