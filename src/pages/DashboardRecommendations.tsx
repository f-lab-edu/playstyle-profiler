// src/pages/DashboardPage.tsx
import React from "react";
import { useQuizStore } from "../store/QuizStoreManager.ts";
import { summarize, getRecommendations } from "../utils/PlayStyleQuizRecommendations.ts";
import RecommendationCard from "../components/RecommendationCard";

function Widget({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      style={{
        border: "1px solid #242a36",
        borderRadius: 12,
        padding: 12,
        background: "linear-gradient(180deg,#0e1218,#0a0d12)",
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {children}
    </section>
  );
}

export default function DashboardPage() {
  const { scores } = useQuizStore();
  const result = summarize(scores);
  const rec = getRecommendations(result.type);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h2 style={{ marginTop: 0 }}>추천 대시보드</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
          <Widget title="내 점수 지표">
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {(Object.entries(result.scores) as [string, number][]).map(([k, v]) => (
                      <li key={k} style={{ marginBottom: 6 }}>
                          {k}: <strong>{v}</strong>
                      </li>
                  ))}
              </ul>
          </Widget>

          <Widget title="추천 로드아웃">
              <div style={{ display: "grid", gap: 8 }}>
                  {rec.loadouts.map((l) => (
                      <RecommendationCard key={l.title} title={l.title} tags={l.tags ?? []} />
                  ))}
              </div>
          </Widget>

          <Widget title="추천 전략/루트">
          <div style={{ display: "grid", gap: 8 }}>
            {rec.strategies.map((s) => (
              <RecommendationCard key={s.title} title={s.title} url={s.url} />
            ))}
          </div>
        </Widget>
        <Widget title="추천 영상">
          <div style={{ display: "grid", gap: 8 }}>
            {rec.videos.map((v) => (
              <RecommendationCard key={v.title} title={v.title} url={v.url} />
            ))}
          </div>
        </Widget>
      </div>
    </div>
  );
}
