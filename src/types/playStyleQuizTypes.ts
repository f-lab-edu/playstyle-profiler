// src/types/quiz.ts
export type TraitKey = "A" | "B" | "C" | "D";

export type Choice = {
  id: string;
  label: string;
  deltas: Partial<Record<TraitKey, number>>;
};

export type Question = {
  id: string;
  title: string;
  choices: Choice[];
};

export type QuizConfig = {
  id: string;
  title: string;
  questions: Question[];
  scoring: {
    clampMin?: number;
    clampMax?: number;
  };
};

export type Scores = Record<TraitKey, number>;

export type PlayStyleType =
  | "AGGRESSIVE-LEADER"
  | "TACTICAL-SUPPORT"
  | "STEALTH-SOLO"
  | "BALANCED-FLEX";

export type ResultSummary = {
  type: PlayStyleType;
  scores: Scores;
  description: string;
  traits: string[];
};
