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
  quizState: IQuizState
  result: IQuizResult | null
  profile: IPlaystyleProfile | null
  progress: IProgress
  
  startQuiz: () => void
  answerQuestion: (answer: IAnswer) => void
  nextQuestion: () => void
  previousQuestion: () => void
  goToQuestion: (index: number) => void
  completeQuiz: () => void
  resetQuiz: () => void
  
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
        quizState: initialQuizState,
        result: null,
        profile: null,
        progress: initialProgress,

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

        answerQuestion: (answer: IAnswer) => {
          const state = get()
          const existingAnswerIndex = state.quizState.answers.findIndex(
            a => a.questionId === answer.questionId
          )

          let newAnswers
          if (existingAnswerIndex >= 0) {
            newAnswers = [...state.quizState.answers]
            newAnswers[existingAnswerIndex] = answer
          } else {
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

          if (nextIndex === QUIZ_QUESTIONS.length - 1 && 
              state.quizState.answers.length === QUIZ_QUESTIONS.length) {
            setTimeout(() => get().completeQuiz(), 500)
          }
        },

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

        goToQuestion: (index: number) => {
          const validIndex = Math.max(0, Math.min(index, QUIZ_QUESTIONS.length - 1))
          
          set(state => ({
            quizState: {
              ...state.quizState,
              currentQuestionIndex: validIndex
            }
          }))
        },

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

        resetQuiz: () => {
          set({
            quizState: initialQuizState,
            result: null,
            profile: null,
            progress: initialProgress
          })
        },

        getCurrentQuestion: () => {
          const state = get()
          return QUIZ_QUESTIONS[state.quizState.currentQuestionIndex] || null
        },

        getProgress: () => {
          const state = get()
          const answeredCount = state.quizState.answers.length
          
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

        canGoNext: () => {
          const state = get()
          return state.quizState.currentQuestionIndex < QUIZ_QUESTIONS.length - 1
        },

        canGoPrevious: () => {
          const state = get()
          return state.quizState.currentQuestionIndex > 0
        },

        isAnswered: (questionIndex?: number) => {
          const state = get()
          const index = questionIndex ?? state.quizState.currentQuestionIndex
          const question = QUIZ_QUESTIONS[index]
          
          if (!question) return false
          
          return state.quizState.answers.some(answer => answer.questionId === question.id)
        }
      }),
      {
        name: 'playstyle-quiz-storage',
        skipHydration: true,
        partialize: (state) => ({
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
