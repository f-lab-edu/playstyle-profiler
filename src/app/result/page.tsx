'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useQuizStore } from '@/store/quizStore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShareButtons } from '@/components/ShareButtons'
import { Sparkles, RotateCcw } from 'lucide-react'
import { submitQuizResult } from '@/actions/submit'

/**
 * 결과 페이지
 * 
 * 퀴즈 완료 후 MBTI 결과를 표시하는 페이지입니다.
 * Phase 6에서 더 상세한 내용을 추가할 예정입니다.
 */
export default function ResultPage() {
  const router = useRouter()
  const { result, profile, resetQuiz, quizState } = useQuizStore()
  const [isSubmitted, setIsSubmitted] = useState(false)

  // 퀴즈를 완료하지 않았으면 퀴즈 페이지로 리다이렉트
  useEffect(() => {
    if (!quizState.isCompleted || !result) {
      router.push('/quiz')
    }
  }, [quizState.isCompleted, result, router])

  // 결과를 Vercel KV에 제출
  useEffect(() => {
    const submitResult = async () => {
      // 이미 제출했거나 결과가 없으면 리턴
      if (isSubmitted || !result) return

      try {
        const response = await submitQuizResult(result)

        if (response.success) {
          setIsSubmitted(true)
          console.log('결과가 성공적으로 제출되었습니다.')
        } else {
          console.error('결과 제출 실패:', response.error)
        }
      } catch (error) {
        console.error('결과 제출 중 오류:', error)
      }
    }

    submitResult()
  }, [result, isSubmitted])

  const handleRestart = () => {
    resetQuiz()
    router.push('/quiz')
  }

  if (!result || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">결과를 불러오는 중...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/10 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 결과 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 text-primary"
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl font-bold">
            분석 완료!
          </h1>
          
          <p className="text-lg text-muted-foreground">
            당신의 플레이스타일 유형이 결정되었습니다
          </p>
        </motion.div>

        {/* MBTI 결과 카드 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="border-2 shadow-2xl">
            <CardHeader className="text-center space-y-4 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="flex justify-center">
                <Badge variant="outline" className="text-2xl px-6 py-2 font-bold">
                  {result.mbtiType}
                </Badge>
              </div>
              <CardTitle className="text-3xl">{profile.title}</CardTitle>
              <CardDescription className="text-base">
                {profile.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* 강점 */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="text-primary">💪</span>
                  강점
                </h3>
                <ul className="space-y-2">
                  {profile.strengths.map((strength, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="text-primary mt-1">•</span>
                      <span>{strength}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* 약점 */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="text-primary">⚠️</span>
                  주의할 점
                </h3>
                <ul className="space-y-2">
                  {profile.weaknesses.map((weakness, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="text-muted-foreground mt-1">•</span>
                      <span className="text-muted-foreground">{weakness}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* 추천 게임 */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="text-primary">🎮</span>
                  추천 게임
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.recommendedGames.map((game, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + index * 0.05 }}
                    >
                      <Badge variant="secondary">{game}</Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 액션 버튼들 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="space-y-4"
        >
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleRestart}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              다시 테스트하기
            </Button>
          </div>

          {/* 공유 버튼 */}
          <ShareButtons mbtiType={result.mbtiType} profileTitle={profile.title} />
        </motion.div>

        {/* 상세 통계 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">상세 분석</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.entries(result.percentages).map(([dimension, percentage]) => (
                  <div key={dimension} className="text-center p-3 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-primary">
                      {Math.round(percentage)}%
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {dimension}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center text-sm text-muted-foreground pt-4 border-t">
                소요 시간: {Math.floor(result.completionTime / 60)}분 {result.completionTime % 60}초
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
