'use client'

import { useEffect } from 'react'
import { useQuizStore } from '@/store/quizStore'
import { QuizScreen } from '@/components/QuizScreen'

/**
 * 실제 퀴즈 페이지
 * 
 * /quiz 경로로 접근할 수 있는 메인 퀴즈 페이지입니다.
 */
export default function QuizPage() {
  const { startQuiz } = useQuizStore()

  // 페이지 진입 시 퀴즈 시작
  useEffect(() => {
    startQuiz()
  }, [startQuiz])

  return <QuizScreen />
}
