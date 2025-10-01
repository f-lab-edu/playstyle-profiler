// MBTI 타입 정의
export type MBTIType = 
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP'

// MBTI 차원 정의
export type MBTIDimension = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

// 질문 유형 정의
export interface IQuestion {
  id: string
  question: string
  description?: string
  options: IOption[]
  category: QuestionCategory
}

// 선택지 정의
export interface IOption {
  id: string
  text: string
  description?: string
  scores: IScore[]
}

// 점수 정의
export interface IScore {
  dimension: MBTIDimension
  value: number // -2 to 2 범위
}

// 질문 카테고리
export type QuestionCategory = 
  | 'gameplay_style' // 게임플레이 스타일
  | 'team_play' // 팀플레이
  | 'problem_solving' // 문제 해결
  | 'game_preference' // 게임 선호도
  | 'social_interaction' // 사회적 상호작용
  | 'achievement' // 성취 방식

// 퀴즈 상태
export interface IQuizState {
  currentQuestionIndex: number
  answers: IAnswer[]
  isCompleted: boolean
  startTime: Date
  endTime?: Date
}

// 답변 정의
export interface IAnswer {
  questionId: string
  optionId: string
  timestamp: Date
}

// 결과 정의
export interface IQuizResult {
  mbtiType: MBTIType
  scores: Record<MBTIDimension, number>
  percentages: Record<MBTIDimension, number>
  dominantTraits: MBTIDimension[]
  completionTime: number // 초 단위
  totalQuestions: number
}

// 플레이스타일 프로필
export interface IPlaystyleProfile {
  mbtiType: MBTIType
  title: string
  description: string
  strengths: string[]
  weaknesses: string[]
  recommendedGames: string[]
  recommendedWeapons: string[]
  recommendedStrategies: string[]
  compatibleTypes: MBTIType[]
  tips: string[]
}

// 진행률 정보
export interface IProgress {
  current: number
  total: number
  percentage: number
  categoryProgress: Record<QuestionCategory, number>
}

// 앱 상태
export interface IAppState {
  quiz: IQuizState
  result?: IQuizResult
  profile?: IPlaystyleProfile
  progress: IProgress
  theme: 'light' | 'dark'
  language: 'ko' | 'en'
}

// 액션 타입들
export type QuizAction = 
  | { type: 'START_QUIZ' }
  | { type: 'ANSWER_QUESTION'; payload: IAnswer }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'COMPLETE_QUIZ'; payload: IQuizResult }
  | { type: 'RESET_QUIZ' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }

// 유틸리티 타입들
export type Partial<T> = {
  [P in keyof T]?: T[P]
}

export type Required<T> = {
  [P in keyof T]-?: T[P]
}

// 게임 장르 타입
export type GameGenre = 
  | 'FPS' | 'RPG' | 'MOBA' | 'RTS' | 'MMO' 
  | 'Action' | 'Adventure' | 'Puzzle' | 'Racing' | 'Sports'

// 추천 컨텐츠 타입
export interface IRecommendation {
  type: 'weapon' | 'strategy' | 'game' | 'video'
  title: string
  description: string
  imageUrl?: string
  link?: string
  tags: string[]
  relevanceScore: number
}
