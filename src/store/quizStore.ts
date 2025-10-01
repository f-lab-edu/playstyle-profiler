import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { 
  IQuizState, 
  IAnswer, 
  IQuizResult, 
  IPlaystyleProfile, 
  IProgress,
  QuestionCategory 
} from '@/types'
import { QUIZ_QUESTIONS } from '@/data/questions'
import { PLAYSTYLE_PROFILES } from '@/data/profiles'
import { calculateQuizResult } from '@/utils/mbtiCalculator'

interface QuizStore {
  // 상태
  quizState: IQuizState
  result: IQuizResult | null
  profile: IPlaystyleProfile | null
  progress: IProgress
  
  // 액션들
  startQuiz: () => void
  answerQuestion: (answer: IAnswer) => void
  nextQuestion: () => void
  previousQuestion: () => void
  goToQuestion: (index: number) => void
  completeQuiz: () => void
  resetQuiz: () => void
  
  // 유틸리티 함수들
  getCurrentQuestion: () => typeof QUIZ_QUESTIONS[0] | null
  getProgress: () => IProgress
  canGoNext: () => boolean
  canGoPrevious: () => boolean
  isAnswered: (questionIndex?: number) => boolean
}

const initialQuizState: IQuizState = {
  currentQuestionIndex: 0,
  answers: [],
  isCompleted: false,
  startTime: new Date()
}

const initialProgress: IProgress = {
  current: 0,
  total: QUIZ_QUESTIONS.length,
  percentage: 0,
  categoryProgress: {
    gameplay_style: 0,
    team_play: 0,
    problem_solving: 0,
    game_preference: 0,
    social_interaction: 0,
    achievement: 0
  }
}

export const useQuizStore = create<QuizStore>()(
  devtools(
    persist(
      (set, get) => ({
        // 초기 상태
        quizState: initialQuizState,
        result: null,
        profile: null,
        progress: initialProgress,

        // 퀴즈 시작
        startQuiz: () => {
          set({
            quizState: {
              ...initialQuizState,
              startTime: new Date()
            },
            result: null,
            profile: null,
            progress: initialProgress
          })
        },

        // 질문 답변
        answerQuestion: (answer: IAnswer) => {
          const state = get()
          const existingAnswerIndex = state.quizState.answers.findIndex(
            a => a.questionId === answer.questionId
          )

          let newAnswers
          if (existingAnswerIndex >= 0) {
            // 기존 답변 수정
            newAnswers = [...state.quizState.answers]
            newAnswers[existingAnswerIndex] = answer
          } else {
            // 새 답변 추가
            newAnswers = [...state.quizState.answers, answer]
          }

          const newProgress = get().getProgress()
          
          set({
            quizState: {
              ...state.quizState,
              answers: newAnswers
            },
            progress: {
              ...newProgress,
              current: newAnswers.length,
              percentage: Math.round((newAnswers.length / QUIZ_QUESTIONS.length) * 100)
            }
          })
        },

        // 다음 질문으로
        nextQuestion: () => {
          const state = get()
          const nextIndex = Math.min(
            state.quizState.currentQuestionIndex + 1,
            QUIZ_QUESTIONS.length - 1
          )
          
          set({
            quizState: {
              ...state.quizState,
              currentQuestionIndex: nextIndex
            }
          })

          // 마지막 질문이고 답변이 완료되었으면 자동 완료
          if (nextIndex === QUIZ_QUESTIONS.length - 1 && 
              state.quizState.answers.length === QUIZ_QUESTIONS.length) {
            setTimeout(() => get().completeQuiz(), 500)
          }
        },

        // 이전 질문으로
        previousQuestion: () => {
          const state = get()
          const prevIndex = Math.max(state.quizState.currentQuestionIndex - 1, 0)
          
          set({
            quizState: {
              ...state.quizState,
              currentQuestionIndex: prevIndex
            }
          })
        },

        // 특정 질문으로 이동
        goToQuestion: (index: number) => {
          const validIndex = Math.max(0, Math.min(index, QUIZ_QUESTIONS.length - 1))
          
          set(state => ({
            quizState: {
              ...state.quizState,
              currentQuestionIndex: validIndex
            }
          }))
        },

        // 퀴즈 완료
        completeQuiz: () => {
          const state = get()
          
          if (state.quizState.answers.length !== QUIZ_QUESTIONS.length) {
            console.warn('모든 질문에 답변하지 않았습니다.')
            return
          }

          const endTime = new Date()
          const result = calculateQuizResult(
            state.quizState.answers,
            QUIZ_QUESTIONS,
            state.quizState.startTime,
            endTime
          )

          const profile = PLAYSTYLE_PROFILES[result.mbtiType]

          set({
            quizState: {
              ...state.quizState,
              isCompleted: true,
              endTime
            },
            result,
            profile,
            progress: {
              ...state.progress,
              current: QUIZ_QUESTIONS.length,
              percentage: 100
            }
          })
        },

        // 퀴즈 초기화
        resetQuiz: () => {
          set({
            quizState: initialQuizState,
            result: null,
            profile: null,
            progress: initialProgress
          })
        },

        // 현재 질문 가져오기
        getCurrentQuestion: () => {
          const state = get()
          return QUIZ_QUESTIONS[state.quizState.currentQuestionIndex] || null
        },

        // 진행률 계산
        getProgress: () => {
          const state = get()
          const answeredCount = state.quizState.answers.length
          
          // 카테고리별 진행률 계산
          const categoryProgress: Record<QuestionCategory, number> = {
            gameplay_style: 0,
            team_play: 0,
            problem_solving: 0,
            game_preference: 0,
            social_interaction: 0,
            achievement: 0
          }

          state.quizState.answers.forEach(answer => {
            const question = QUIZ_QUESTIONS.find(q => q.id === answer.questionId)
            if (question) {
              categoryProgress[question.category]++
            }
          })

          return {
            current: answeredCount,
            total: QUIZ_QUESTIONS.length,
            percentage: Math.round((answeredCount / QUIZ_QUESTIONS.length) * 100),
            categoryProgress
          }
        },

        // 다음으로 갈 수 있는지 확인
        canGoNext: () => {
          const state = get()
          return state.quizState.currentQuestionIndex < QUIZ_QUESTIONS.length - 1
        },

        // 이전으로 갈 수 있는지 확인
        canGoPrevious: () => {
          const state = get()
          return state.quizState.currentQuestionIndex > 0
        },

        // 답변 여부 확인
        isAnswered: (questionIndex?: number) => {
          const state = get()
          const index = questionIndex ?? state.quizState.currentQuestionIndex
          const question = QUIZ_QUESTIONS[index]
          
          if (!question) return false
          
          return state.quizState.answers.some(answer => answer.questionId === question.id)
        }
      }),
      {
        name: 'playstyle-quiz-storage', // 로컬 스토리지 키
        partialize: (state) => ({
          // 결과와 답변만 저장 (UI 상태는 제외)
          result: state.result,
          profile: state.profile,
          quizState: {
            answers: state.quizState.answers,
            isCompleted: state.quizState.isCompleted,
            startTime: state.quizState.startTime,
            endTime: state.quizState.endTime
          }
        })
      }
    ),
    { name: 'quiz-store' }
  )
)
