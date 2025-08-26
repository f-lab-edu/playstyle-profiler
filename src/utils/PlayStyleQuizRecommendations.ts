// src/utils/recommend.ts
import type { PlayStyleType, ResultSummary, Scores } from "../types/quiz";

function pickType(scores: Scores): PlayStyleType {
  const { A, B, C, D } = scores;
  if (A >= B && A >= D) {
    return C >= B ? "AGGRESSIVE-LEADER" : "BALANCED-FLEX";
  }
  if (B >= A && D >= A) {
    return "STEALTH-SOLO";
  }
  if (C >= A) {
    return "TACTICAL-SUPPORT";
  }
  return "BALANCED-FLEX";
}

export function summarize(scores: Scores): ResultSummary {
  const type = pickType(scores);
  const mapping: Record<PlayStyleType, { desc: string; traits: string[] }> = {
    "AGGRESSIVE-LEADER": {
      desc: "이니시와 푸쉬로 흐름을 주도하는 타입",
      traits: ["교전 주도", "결단력", "하이리스크/하이리턴"],
    },
    "TACTICAL-SUPPORT": {
      desc: "정보/포지셔닝으로 팀을 승리로 이끄는 타입",
      traits: ["정찰", "유틸리티", "백업 타이밍"],
    },
    "STEALTH-SOLO": {
      desc: "소리/각/타이밍으로 이득을 극대화하는 타입",
      traits: ["잠행", "치명적 한방", "정보 우위"],
    },
    "BALANCED-FLEX": {
      desc: "상황에 맞춰 역할을 전환하는 유연한 타입",
      traits: ["적응력", "균형", "롤 스왑"],
    },
  };

  return {
    type,
    scores,
    description: mapping[type].desc,
    traits: mapping[type].traits,
  };
}

export function getRecommendations(type: PlayStyleType) {
  return {
    loadouts: [
      { title: "AR + 샷건", tags: ["근중거리", "돌진"] },
      { title: "DMR + SMG", tags: ["중장거리", "하이브리드"] },
    ],
    strategies: [
      { title: "초반 핫드롭 후 사이클", url: "https://youtu.be/xxxx" },
      { title: "정보 우위로 킬체인 만들기", url: "https://youtu.be/yyyy" },
    ],
    videos: [
      { title: "프로의 교전 운영", url: "https://youtu.be/pro1" },
      { title: "포지셔닝 기본기", url: "https://youtu.be/pro2" },
    ],
  } as const;
}
