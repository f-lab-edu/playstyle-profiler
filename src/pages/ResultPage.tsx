// src/pages/ResultPage.tsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useQuizStore } from "../store/QuizStoreManager.ts";
import { summarize, getRecommendations } from "../utils/PlayStyleQuizRecommendations.ts";
import RecommendationCard from "../components/RecommendationCard";

async function shareOrCopy(url: string, title: string, text: string) {
  try {
    if (navigator.share) {
      await navigator.share({ url, title, text });
    } else {
      await navigator.clipboard.writeText(url);
      alert("링크가 복사되었습니다.");
    }
  } catch {
    // ignore
  }
}

export default function ResultPage() {
  const nav = useNavigate();
  const { scores, reset } = useQuizStore();

  const result = useMemo(() => summarize(scores), [scores]);
  const rec = useMemo(() => getRecommendations(result.type), [result.type]);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35 }}
        style={{
          padding: 16,
          border: "1px solid #242a36",
          borderRadius: 12,
          background: "radial-gradient(1200px 400px at 10% -10%, rgba(134,225,255,.08), transparent), #0a0d12",
        }}
      >
        <h2 style={{ marginTop: 0 }}>당신의 결과: {result.type}</h2>
        <p style={{ marginTop: 6, opacity: 0.9 }}>{result.description}</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
          {result.traits.map((t) => (
            <span key={t} style={{ fontSize: 12, padding: "4px 8px", borderRadius: 999, border: "1px solid #2a3140" }}>
              {t}
            </span>
          ))}
        </div>
        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {rec.loadouts.map((l) => (
            <RecommendationCard key={l.title} title={l.title} tags={l.tags} />
          ))}
          {rec.strategies.map((s) => (
            <RecommendationCard key={s.title} title={s.title} url={s.url} />
          ))}
          {rec.videos.map((v) => (
            <RecommendationCard key={v.title} title={v.title} url={v.url} />
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button
            onClick={() => shareOrCopy(window.location.href, "나의 플레이 성향 MBTI", `나는 ${result.type}!`)}
            style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #2a3140", background: "#121722", color: "#eaeaea" }}
          >
            결과 공유
          </button>
          <button
            onClick={() => nav("/dashboard")}
            style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #2a3140", background: "#121722", color: "#eaeaea" }}
          >
            추천 대시보드 보기
          </button>
          <button
            onClick={() => { reset(); nav("/quiz"); }}
            style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #2a3140", background: "#0f131b", color: "#eaeaea", marginLeft: "auto" }}
          >
            다시 풀기
          </button>
        </div>
      </motion.div>
    </div>
  );
}
