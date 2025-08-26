// src/store/quizStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Scores } from "../types/playStyleQuizTypes";
import { transition, type QuizState } from "../state/quizStateMachine";

type Answers = Record<string, string>; // questionId -> choiceId

type QuizStore = {
  state: QuizState;
  answers: Answers;
  scores: Scores;
  currentIndex: number;

  start: () => void;
  answer: (qId: string, choiceId: string, deltas: Partial<Scores>) => void;
  next: (total: number) => void;
  finish: () => void;
  reset: () => void;
};

const zeroScores: Scores = { A: 0, B: 0, C: 0, D: 0 };

function mergeScores(prev: Scores, delta: Partial<Scores>) {
  const res: Scores = { ...prev };
  for (const k of Object.keys(delta) as (keyof Scores)[]) {
    res[k] = Math.max(-10, Math.min(10, (res[k] ?? 0) + (delta[k] ?? 0)));
  }
  return res;
}

export const useQuizStore = create<QuizStore>()(
  devtools((set) => ({
    state: "idle",
    answers: {},
    scores: zeroScores,
    currentIndex: 0,

    start: () => set((s) => ({ state: transition(s.state, { type: "START" }) })),
    answer: (qId, choiceId, deltas) =>
      set((s) => ({
        answers: { ...s.answers, [qId]: choiceId },
        scores: mergeScores(s.scores, deltas),
      })),
    next: (total) =>
      set((s) => {
        const last = s.currentIndex + 1 >= total;
        return last ? { currentIndex: s.currentIndex } : { currentIndex: s.currentIndex + 1 };
      }),
    finish: () => set((s) => ({ state: transition(s.state, { type: "FINISH" }) })),
    reset: () =>
      set(() => ({
        state: "idle",
        answers: {},
        scores: zeroScores,
        currentIndex: 0,
      })),
  }))
);
