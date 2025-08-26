// src/state/quizMachine.ts
export type QuizState = "idle" | "in-progress" | "completed";

export type QuizEvent =
  | { type: "START" }
  | { type: "ANSWER"; payload: { questionId: string } }
  | { type: "RESET" }
  | { type: "FINISH" };

export function transition(current: QuizState, event: QuizEvent): QuizState {
  switch (current) {
    case "idle":
      if (event.type === "START") return "in-progress";
      return current;
    case "in-progress":
      if (event.type === "ANSWER") return "in-progress";
      if (event.type === "FINISH") return "completed";
      if (event.type === "RESET") return "idle";
      return current;
    case "completed":
      if (event.type === "RESET") return "idle";
      return current;
  }
}
