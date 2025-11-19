'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import { useQuizStore } from '@/store/quizStore'
import { QUIZ_QUESTIONS } from '@/data/questions'
import { QuestionCard } from './QuestionCard'
import { QuizNavigation } from './QuizNavigation'
import { QuizProgress } from './QuizProgress'

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

  useEffect(() => {
    useQuizStore.persist.rehydrate()
    setHydrated(true)
  }, [])

  const currentAnswer = quizState.answers.find(
    answer => answer.questionId === currentQuestion?.id
  )

  const handleSelect = (optionId: string) => {
    if (!currentQuestion) return

    answerQuestion({
      questionId: currentQuestion.id,
      optionId,
      timestamp: new Date(),
    })
  }

  const handleNext = () => {
    const isLastQuestion = quizState.currentQuestionIndex === QUIZ_QUESTIONS.length - 1
    const allAnswered = quizState.answers.length === QUIZ_QUESTIONS.length
    
    if (isLastQuestion && isAnswered()) {
      if (allAnswered) {
        console.log('퀴즈 완료 처리 시작')
        completeQuiz()
      } else {
        console.warn('아직 답변하지 않은 질문이 있습니다.')
      }
    } else if (canGoNext()) {
      nextQuestion()
    }
  }

  const handlePrevious = () => {
    if (canGoPrevious()) {
      previousQuestion()
    }
  }

  useEffect(() => {
    if (quizState.isCompleted) {
      const timer = setTimeout(() => {
        router.push('/result')
      }, 500)
      
      return () => {
        clearTimeout(timer)
      }
    }
    
    return undefined
  }, [quizState.isCompleted, router])

  // Hydration이 완료될 때까지 로딩 표시
  if (!hydrated || !currentQuestion) {
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
