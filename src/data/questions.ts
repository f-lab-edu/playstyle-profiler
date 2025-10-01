import { IQuestion, QuestionCategory } from '../types'

export const QUIZ_QUESTIONS: IQuestion[] = [
  // 게임플레이 스타일 관련 질문들
  {
    id: 'q1',
    question: '새로운 게임을 시작할 때 당신의 첫 번째 행동은?',
    description: '게임 접근 방식에 대한 질문입니다',
    category: 'gameplay_style' as QuestionCategory,
    options: [
      {
        id: 'q1_a',
        text: '튜토리얼을 꼼꼼히 따라하며 기본기를 익힌다',
        description: '체계적인 학습 선호',
        scores: [
          { dimension: 'S', value: 2 },
          { dimension: 'J', value: 1 }
        ]
      },
      {
        id: 'q1_b',
        text: '대충 스킵하고 바로 게임에 뛰어든다',
        description: '직관적인 학습 선호',
        scores: [
          { dimension: 'N', value: 2 },
          { dimension: 'P', value: 1 }
        ]
      },
      {
        id: 'q1_c',
        text: '온라인 가이드나 공략을 먼저 찾아본다',
        description: '정보 수집 우선',
        scores: [
          { dimension: 'T', value: 1 },
          { dimension: 'J', value: 2 }
        ]
      },
      {
        id: 'q1_d',
        text: '다른 플레이어들의 플레이를 관찰한다',
        description: '사회적 학습 선호',
        scores: [
          { dimension: 'E', value: 1 },
          { dimension: 'F', value: 1 }
        ]
      }
    ]
  },
  {
    id: 'q2',
    question: '팀 게임에서 당신이 선호하는 역할은?',
    category: 'team_play' as QuestionCategory,
    options: [
      {
        id: 'q2_a',
        text: '팀을 이끄는 리더',
        scores: [
          { dimension: 'E', value: 2 },
          { dimension: 'J', value: 1 }
        ]
      },
      {
        id: 'q2_b',
        text: '전략을 세우는 지휘관',
        scores: [
          { dimension: 'T', value: 2 },
          { dimension: 'N', value: 1 }
        ]
      },
      {
        id: 'q2_c',
        text: '팀원들을 지원하는 서포터',
        scores: [
          { dimension: 'F', value: 2 },
          { dimension: 'S', value: 1 }
        ]
      },
      {
        id: 'q2_d',
        text: '혼자서도 잘하는 솔로 플레이어',
        scores: [
          { dimension: 'I', value: 2 },
          { dimension: 'P', value: 1 }
        ]
      }
    ]
  },
  {
    id: 'q3',
    question: '게임에서 어려운 보스를 만났을 때 당신의 대처법은?',
    category: 'problem_solving' as QuestionCategory,
    options: [
      {
        id: 'q3_a',
        text: '보스의 패턴을 분석하고 전략을 세운다',
        scores: [
          { dimension: 'T', value: 2 },
          { dimension: 'J', value: 1 }
        ]
      },
      {
        id: 'q3_b',
        text: '일단 여러 번 도전해보며 감을 익힌다',
        scores: [
          { dimension: 'S', value: 1 },
          { dimension: 'P', value: 2 }
        ]
      },
      {
        id: 'q3_c',
        text: '다른 플레이어의 공략을 참고한다',
        scores: [
          { dimension: 'E', value: 1 },
          { dimension: 'S', value: 1 }
        ]
      },
      {
        id: 'q3_d',
        text: '창의적인 방법으로 우회해서 이긴다',
        scores: [
          { dimension: 'N', value: 2 },
          { dimension: 'P', value: 1 }
        ]
      }
    ]
  },
  {
    id: 'q4',
    question: '당신이 가장 즐기는 게임 장르는?',
    category: 'game_preference' as QuestionCategory,
    options: [
      {
        id: 'q4_a',
        text: '스토리가 풍부한 RPG',
        scores: [
          { dimension: 'N', value: 2 },
          { dimension: 'F', value: 1 }
        ]
      },
      {
        id: 'q4_b',
        text: '전략이 중요한 RTS/턴제 전략',
        scores: [
          { dimension: 'T', value: 2 },
          { dimension: 'J', value: 1 }
        ]
      },
      {
        id: 'q4_c',
        text: '실시간 액션 FPS/액션게임',
        scores: [
          { dimension: 'S', value: 2 },
          { dimension: 'P', value: 1 }
        ]
      },
      {
        id: 'q4_d',
        text: '친구들과 함께하는 멀티플레이어',
        scores: [
          { dimension: 'E', value: 2 },
          { dimension: 'F', value: 1 }
        ]
      }
    ]
  },
  {
    id: 'q5',
    question: '게임에서 실패했을 때 당신의 반응은?',
    category: 'problem_solving' as QuestionCategory,
    options: [
      {
        id: 'q5_a',
        text: '무엇이 잘못되었는지 차근차근 분석한다',
        scores: [
          { dimension: 'T', value: 2 },
          { dimension: 'J', value: 1 }
        ]
      },
      {
        id: 'q5_b',
        text: '바로 다시 도전한다',
        scores: [
          { dimension: 'S', value: 1 },
          { dimension: 'P', value: 2 }
        ]
      },
      {
        id: 'q5_c',
        text: '팀원들과 함께 해결책을 찾는다',
        scores: [
          { dimension: 'E', value: 2 },
          { dimension: 'F', value: 1 }
        ]
      },
      {
        id: 'q5_d',
        text: '잠시 휴식을 취하고 다른 방법을 생각한다',
        scores: [
          { dimension: 'I', value: 1 },
          { dimension: 'N', value: 2 }
        ]
      }
    ]
  },
  {
    id: 'q6',
    question: '게임에서 가장 중요하게 생각하는 것은?',
    category: 'achievement' as QuestionCategory,
    options: [
      {
        id: 'q6_a',
        text: '높은 랭킹과 성취감',
        scores: [
          { dimension: 'T', value: 2 },
          { dimension: 'J', value: 1 }
        ]
      },
      {
        id: 'q6_b',
        text: '친구들과의 즐거운 시간',
        scores: [
          { dimension: 'F', value: 2 },
          { dimension: 'E', value: 1 }
        ]
      },
      {
        id: 'q6_c',
        text: '새로운 경험과 발견',
        scores: [
          { dimension: 'N', value: 2 },
          { dimension: 'P', value: 1 }
        ]
      },
      {
        id: 'q6_d',
        text: '완벽한 플레이와 기술 향상',
        scores: [
          { dimension: 'S', value: 2 },
          { dimension: 'J', value: 1 }
        ]
      }
    ]
  },
  {
    id: 'q7',
    question: '새로운 업데이트나 패치가 나왔을 때?',
    category: 'gameplay_style' as QuestionCategory,
    options: [
      {
        id: 'q7_a',
        text: '패치 노트를 꼼꼼히 읽어본다',
        scores: [
          { dimension: 'S', value: 2 },
          { dimension: 'J', value: 1 }
        ]
      },
      {
        id: 'q7_b',
        text: '바로 게임에 들어가서 변화를 체감한다',
        scores: [
          { dimension: 'S', value: 1 },
          { dimension: 'P', value: 2 }
        ]
      },
      {
        id: 'q7_c',
        text: '커뮤니티의 반응을 먼저 살펴본다',
        scores: [
          { dimension: 'E', value: 2 },
          { dimension: 'F', value: 1 }
        ]
      },
      {
        id: 'q7_d',
        text: '어떤 새로운 전략이 가능할지 생각해본다',
        scores: [
          { dimension: 'N', value: 2 },
          { dimension: 'T', value: 1 }
        ]
      }
    ]
  },
  {
    id: 'q8',
    question: '게임 내에서 의견 충돌이 생겼을 때?',
    category: 'social_interaction' as QuestionCategory,
    options: [
      {
        id: 'q8_a',
        text: '논리적으로 설득한다',
        scores: [
          { dimension: 'T', value: 2 },
          { dimension: 'E', value: 1 }
        ]
      },
      {
        id: 'q8_b',
        text: '팀의 화합을 위해 양보한다',
        scores: [
          { dimension: 'F', value: 2 },
          { dimension: 'S', value: 1 }
        ]
      },
      {
        id: 'q8_c',
        text: '새로운 대안을 제시한다',
        scores: [
          { dimension: 'N', value: 2 },
          { dimension: 'P', value: 1 }
        ]
      },
      {
        id: 'q8_d',
        text: '조용히 자신의 방식대로 한다',
        scores: [
          { dimension: 'I', value: 2 },
          { dimension: 'J', value: 1 }
        ]
      }
    ]
  }
]

// 카테고리별 질문 개수 확인용
export const QUESTIONS_BY_CATEGORY = QUIZ_QUESTIONS.reduce((acc, question) => {
  acc[question.category] = (acc[question.category] || 0) + 1
  return acc
}, {} as Record<QuestionCategory, number>)
