'use client'

import { useEffect } from 'react'
import { useQuizStore } from '@/store/quizStore'
import { QuizScreen } from '@/components/QuizScreen'
import { Button } from '@/components/ui/button'

/**
 * 질문 화면 테스트 페이지
 * 
 * QuizScreen 컴포넌트를 테스트하는 페이지입니다.
 * 실제 퀴즈 페이지와 동일한 기능을 제공합니다.
 */
export default function TestQuestionPage() {
  const { startQuiz, resetQuiz, quizState } = useQuizStore()

  // 컴포넌트 마운트 시 퀴즈 초기화
  useEffect(() => {
    if (quizState.isCompleted) {
      // 완료된 퀴즈가 있으면 리셋
      resetQuiz()
    }
    startQuiz()
  }, [])

  return (
    <div>
      <QuizScreen />
      
      {/* 디버그 패널 */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={resetQuiz}
          className="shadow-lg"
        >
          퀴즈 초기화
        </Button>
      </div>
    </div>
  )
}
