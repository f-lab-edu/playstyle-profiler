// src/data/questions.ts
import type { QuizConfig } from "../types/playStyleQuizTypes";

export const quiz: QuizConfig = {
  id: "playstyle-mbti-v1",
  title: "플레이 성향 MBTI",
  scoring: { clampMin: -10, clampMax: 10 },
  questions: [
    {
      id: "q1",
      title: "초반 교전에서 당신의 선택은?",
      choices: [
        { id: "q1a", label: "핫드롭으로 킬을 노린다", deltas: { A: 2, D: 1 } },
        { id: "q1b", label: "안정적으로 파밍할 위치를 잡는다", deltas: { B: 2 } },
      ],
    },
    {
      id: "q2",
      title: "팀플레이 중 콜 상황에서?",
      choices: [
        { id: "q2a", label: "내가 이니시를 열고 팀을 끌고 간다", deltas: { A: 2, C: 1 } },
        { id: "q2b", label: "정보 수집과 백업으로 팀을 받쳐준다", deltas: { B: 1, C: 2 } },
      ],
    },
    {
      id: "q3",
      title: "적과의 조우! 당신은",
      choices: [
        { id: "q3a", label: "각을 만들고 과감히 밀어붙인다", deltas: { A: 2 } },
        { id: "q3b", label: "위치 유리/소리 관리로 유리하게 푼다", deltas: { B: 1, D: 2 } },
      ],
    },
    {
      id: "q4",
      title: "선호하는 롤은?",
      choices: [
        { id: "q4a", label: "오더/에이스", deltas: { A: 2, C: 1 } },
        { id: "q4b", label: "정찰/서포트", deltas: { B: 2, C: 1 } },
      ],
    },
  ],
};
