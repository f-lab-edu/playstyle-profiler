export type MBTIType = 
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP'

export type MBTIDimension = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

export interface IQuestion {
  id: string
  question: string
  description?: string
  options: IOption[]
  category: QuestionCategory
}

export interface IOption {
  id: string
  text: string
  description?: string
  scores: IScore[]
}

export interface IScore {
  dimension: MBTIDimension
  value: number
}

export type QuestionCategory = 
  | 'gameplay_style'
  | 'team_play'
  | 'problem_solving'
  | 'game_preference'
  | 'social_interaction'
  | 'achievement'

export interface IQuizState {
  currentQuestionIndex: number
  answers: IAnswer[]
  isCompleted: boolean
  startTime: Date
  endTime?: Date
}

export interface IAnswer {
  questionId: string
  optionId: string
  timestamp: Date
}

export interface IQuizResult {
  mbtiType: MBTIType
  scores: Record<MBTIDimension, number>
  percentages: Record<MBTIDimension, number>
  dominantTraits: MBTIDimension[]
  completionTime: number
  totalQuestions: number
}

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

export interface IProgress {
  current: number
  total: number
  percentage: number
  categoryProgress: Record<QuestionCategory, number>
}

export interface IAppState {
  quiz: IQuizState
  result?: IQuizResult
  profile?: IPlaystyleProfile
  progress: IProgress
  theme: 'light' | 'dark'
  language: 'ko' | 'en'
}

export type QuizAction = 
  | { type: 'START_QUIZ' }
  | { type: 'ANSWER_QUESTION'; payload: IAnswer }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'COMPLETE_QUIZ'; payload: IQuizResult }
  | { type: 'RESET_QUIZ' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }

export type Partial<T> = {
  [P in keyof T]?: T[P]
}

export type Required<T> = {
  [P in keyof T]-?: T[P]
}

export type GameGenre = 
  | 'FPS' | 'RPG' | 'MOBA' | 'RTS' | 'MMO' 
  | 'Action' | 'Adventure' | 'Puzzle' | 'Racing' | 'Sports'

export interface IRecommendation {
  type: 'weapon' | 'strategy' | 'game' | 'video'
  title: string
  description: string
  imageUrl?: string
  link?: string
  tags: string[]
  relevanceScore: number
}