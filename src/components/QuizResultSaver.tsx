/**
 * 퀴즈 결과 저장 컴포넌트
 * 
 * Firebase Hooks를 사용한 실제 예시
 */

'use client'

import { useState } from 'react'
import { Button, Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { useFirestoreWrite } from '@/hooks/useFirestore'
import type { IQuizResult as IFirestoreQuizResult } from '@/types/firestore'

interface IQuizResultSaverProps {
  mbtiType: string
  scores: {
    EI: number
    SN: number
    TF: number
    JP: number
  }
}

/**
 * 사용 예시:
 * 
 * <QuizResultSaver 
 *   mbtiType="INTJ"
 *   scores={{ EI: 65, SN: 70, TF: 80, JP: 55 }}
 * />
 */
export function QuizResultSaver({ mbtiType, scores }: IQuizResultSaverProps) {
  const { save, loading, error, success } = useFirestoreWrite('quiz-results')
  const [savedId, setSavedId] = useState<string | null>(null)

  const handleSave = async () => {
    // 고유 ID 생성
    const resultId = `result-${Date.now()}`
    
    // 퀴즈 결과 데이터 구성
    const quizResult: Partial<IFirestoreQuizResult> = {
      sessionId: `session-${Date.now()}`,
      mbtiType,
      scores,
      answers: [
        // 실제로는 퀴즈 스토어에서 가져옴
        {
          questionId: 'q1',
          selectedOption: 'option-a',
          category: 'gameplay_style',
        },
      ],
      isCompleted: true,
      createdAt: new Date(),
    }

    // Firestore에 저장
    const id = await save(resultId, quizResult)
    
    if (id) {
      setSavedId(id)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>퀴즈 결과 저장</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 결과 정보 */}
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-semibold">MBTI 유형:</span> {mbtiType}
          </p>
          <div className="text-sm">
            <span className="font-semibold">점수:</span>
            <ul className="mt-1 space-y-1 pl-4">
              <li>E-I: {scores.EI}</li>
              <li>S-N: {scores.SN}</li>
              <li>T-F: {scores.TF}</li>
              <li>J-P: {scores.JP}</li>
            </ul>
          </div>
        </div>

        {/* 저장 버튼 */}
        <Button onClick={handleSave} disabled={loading} className="w-full">
          {loading ? '저장 중...' : '결과 저장하기'}
        </Button>

        {/* 성공 메시지 */}
        {success && savedId && (
          <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-200">
            <p className="font-semibold">✅ 저장 완료!</p>
            <p className="mt-1">ID: {savedId}</p>
            <p className="mt-2 text-xs">
              Firebase Console에서 확인할 수 있습니다
            </p>
          </div>
        )}

        {/* 에러 메시지 */}
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200">
            <p className="font-semibold">❌ 저장 실패</p>
            <p className="mt-1">{error.message}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

