// src/pages/QuizPage.tsx
import { useNavigate } from "react-router-dom";
import { quiz } from "../data/PlayStyleMBTIQuizConfig.ts";
import { useQuizStore } from "../store/QuizStoreManager.ts";
import QuestionCard from "../components/QuestionCardForm.tsx";
import Progress from "../components/ProgressIndicator.tsx";
import {useEffect} from "react";

export default function QuizPage() {
  const nav = useNavigate();
  const { state, start, answer, next, finish, currentIndex, answers } = useQuizStore();

  useEffect(() => {
    if (state === "idle") start();
  }, [state, start]);

  const total = quiz.questions.length;
  const q = quiz.questions[currentIndex];

  function onAnswer(choiceId: string) {
    const choice = q.choices.find((c) => c.id === choiceId)!;
    answer(q.id, choiceId, choice.deltas);
    if (currentIndex + 1 >= total) {
      finish();
      nav("/result");
    } else {
      next(total);
    }
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h1 style={{ margin: 0 }}>{quiz.title}</h1>
      <Progress current={currentIndex} total={total} />
      <QuestionCard
        question={q}
        defaultValue={answers[q.id]}
        onSubmit={onAnswer}
      />
      <div style={{ display: "flex", justifyContent: "space-between", opacity: 0.8, fontSize: 12 }}>
        <span>문항 {currentIndex + 1} / {total}</span>
        <button onClick={() => nav("/result")} style={{ background: "transparent", color: "#86e1ff", border: "none", cursor: "pointer" }}>
          결과로 건너뛰기
        </button>
      </div>
    </div>
  );
}
