'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import { useQuizStore } from '@/store/quizStore'
import { QUIZ_QUESTIONS } from '@/data/questions'
import { QuestionCard } from './QuestionCard'
import { QuizNavigation } from './QuizNavigation'
import { QuizProgress } from './QuizProgress'

/**
 * QuizScreen 컴포넌트
 * 
 * 왜 이렇게 만들었나요?
 * - 퀴즈의 모든 로직과 UI를 하나의 컴포넌트에 통합
 * - Zustand 스토어와 연결하여 상태 관리
 * - QuestionCard, QuizNavigation, QuizProgress를 조합
 * 
 * 주요 기능:
 * - 질문 표시 및 선택 처리
 * - 네비게이션 (이전/다음)
 * - 진행률 추적
 * - 자동 퀴즈 완료
 */
export function QuizScreen() {
  const router = useRouter()
  const [hydrated, setHydrated] = useState(false)
  
  const {
    quizState,
    getCurrentQuestion,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    canGoNext,
    canGoPrevious,
    isAnswered,
    completeQuiz,
  } = useQuizStore()

  const currentQuestion = getCurrentQuestion()

  // skipHydration 사용 시 수동으로 hydration 실행
  useEffect(() => {
    useQuizStore.persist.rehydrate()
    setHydrated(true)
  }, [])

  // 현재 질문에 대한 답변 찾기
  const currentAnswer = quizState.answers.find(
    answer => answer.questionId === currentQuestion?.id
  )

  // 답변 선택 핸들러
  const handleSelect = (optionId: string) => {
    if (!currentQuestion) return

    answerQuestion({
      questionId: currentQuestion.id,
      optionId,
      timestamp: new Date(),
    })
  }

  // 다음 질문으로 이동 또는 퀴즈 완료
  const handleNext = () => {
    const isLastQuestion = quizState.currentQuestionIndex === QUIZ_QUESTIONS.length - 1
    const allAnswered = quizState.answers.length === QUIZ_QUESTIONS.length
    
    if (isLastQuestion && isAnswered()) {
      // 마지막 질문이고 현재 질문에 답변했으면
      // 모든 질문에 답변했는지 확인하고 퀴즈 완료
      if (allAnswered) {
        console.log('퀴즈 완료 처리 시작')
        completeQuiz()
      } else {
        console.warn('아직 답변하지 않은 질문이 있습니다.')
      }
    } else if (canGoNext()) {
      // 그 외에는 다음 질문으로
      nextQuestion()
    }
  }

  // 이전 질문으로 이동
  const handlePrevious = () => {
    if (canGoPrevious()) {
      previousQuestion()
    }
  }

  // 퀴즈 완료 시 자동으로 결과 페이지로 이동
  useEffect(() => {
    if (quizState.isCompleted) {
      // 약간의 지연 후 결과 페이지로 이동 (애니메이션 완료 대기)
      const timer = setTimeout(() => {
        router.push('/result')
      }, 500)
      
      return () => {
        clearTimeout(timer)
      }
    }
    
    return undefined
  }, [quizState.isCompleted, router])

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">질문을 불러오는 중...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 헤더: 제목 */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">
            플레이스타일 분석 퀴즈
          </h1>
          <p className="text-muted-foreground">
            당신의 게임 플레이 성향을 알아보세요
          </p>
        </div>

        {/* 진행률 바 */}
        <QuizProgress />

        {/* 질문 카드 - AnimatePresence로 전환 애니메이션 */}
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            currentIndex={quizState.currentQuestionIndex}
            totalQuestions={QUIZ_QUESTIONS.length}
            selectedOptionId={currentAnswer?.optionId || ''}
            onSelect={handleSelect}
          />
        </AnimatePresence>

        {/* 네비게이션 */}
        <QuizNavigation
          canGoPrevious={canGoPrevious()}
          canGoNext={canGoNext()}
          isAnswered={isAnswered()}
          onPrevious={handlePrevious}
          onNext={handleNext}
          currentIndex={quizState.currentQuestionIndex}
          totalQuestions={QUIZ_QUESTIONS.length}
          answeredCount={quizState.answers.length}
        />
      </div>
    </div>
  )
}
