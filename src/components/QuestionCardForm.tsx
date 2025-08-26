// src/components/QuestionCard.tsx
import { useForm } from "react-hook-form";
import type { Question } from "../types/playStyleQuizTypes.ts";

type Props = {
  question: Question;
  defaultValue?: string;
  onSubmit: (choiceId: string) => void;
};

export default function QuestionCard({ question, defaultValue, onSubmit }: Props) {
  const { register, handleSubmit, watch } = useForm<{ choice: string }>({
    defaultValues: { choice: defaultValue ?? "" },
    mode: "onChange",
  });

  const selected = watch("choice");

  return (
    <form
      onSubmit={handleSubmit((v) => onSubmit(v.choice))}
      style={{
        border: "1px solid #1f2430",
        padding: 16,
        borderRadius: 12,
        background: "linear-gradient(180deg,#0e1218,#0a0d12)",
      }}
    >
      <h2 style={{ margin: "0 0 12px", fontSize: 18 }}>{question.title}</h2>
      <div style={{ display: "grid", gap: 8 }}>
        {question.choices.map((c) => (
          <label
            key={c.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #262b36",
              background: selected === c.id ? "#151b26" : "transparent",
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              value={c.id}
              {...register("choice", { required: true })}
              style={{ accentColor: "#86e1ff" }}
            />
            <span>{c.label}</span>
          </label>
        ))}
      </div>
      <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}>
        <button
          type="submit"
          disabled={!selected}
          style={{
            padding: "8px 14px",
            borderRadius: 8,
            border: "1px solid #2a3140",
            background: selected ? "#223148" : "#171c26",
            color: "#eaeaea",
          }}
        >
          다음
        </button>
      </div>
    </form>
  );
}
