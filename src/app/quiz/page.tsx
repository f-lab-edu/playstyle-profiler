'use client'

import { useEffect } from 'react'
import { useQuizStore } from '@/store/quizStore'
import { QuizScreen } from '@/components/QuizScreen'

export default function QuizPage() {
  const { startQuiz } = useQuizStore()

  useEffect(() => {
    startQuiz()
  }, [startQuiz])

  return <QuizScreen />
}
