'use client'

import { useEffect, useRef, useMemo, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useQuizStore } from '@/store/quizStore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShareButtons } from '@/components/ShareButtons'
import { Sparkles, RotateCcw } from 'lucide-react'
import { submitQuizResult } from '@/actions/submit'
import { PLAYSTYLE_PROFILES } from '@/data/profiles'
import type { MBTIType, IQuizResult, IPlaystyleProfile } from '@/types'

function ResultPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { result: storeResult, profile: storeProfile, resetQuiz, quizState } = useQuizStore()
  const hasSubmittedRef = useRef(false)

  const mbtiTypeFromUrl = searchParams.get('type') as MBTIType | null

  const result: IQuizResult | null = useMemo(() => {
    if (mbtiTypeFromUrl && PLAYSTYLE_PROFILES[mbtiTypeFromUrl]) {
      return {
        mbtiType: mbtiTypeFromUrl,
        scores: {
          E: 50,
          I: 50,
          S: 50,
          N: 50,
          T: 50,
          F: 50,
          J: 50,
          P: 50,
        },
        percentages: {
          E: 50,
          I: 50,
          S: 50,
          N: 50,
          T: 50,
          F: 50,
          J: 50,
          P: 50,
        },
        dominantTraits: [],
        completionTime: 0,
        totalQuestions: 0,
      }
    }
    return storeResult
  }, [mbtiTypeFromUrl, storeResult])

  const profile: IPlaystyleProfile | null = useMemo(() => {
    if (mbtiTypeFromUrl && PLAYSTYLE_PROFILES[mbtiTypeFromUrl]) {
      return PLAYSTYLE_PROFILES[mbtiTypeFromUrl]
    }
    return storeProfile
  }, [mbtiTypeFromUrl, storeProfile])

  useEffect(() => {
    if (!mbtiTypeFromUrl && (!quizState.isCompleted || !storeResult)) {
      router.push('/quiz')
    }
  }, [mbtiTypeFromUrl, quizState.isCompleted, storeResult, router])

  useEffect(() => {
    if (mbtiTypeFromUrl) return
    
    if (hasSubmittedRef.current || !storeResult) return

    const submitResult = async () => {
      if (hasSubmittedRef.current) return
      hasSubmittedRef.current = true

      try {
        const response = await submitQuizResult(storeResult)

        if (response.success) {
          console.log('결과가 성공적으로 제출되었습니다.')
        } else {
          console.error('결과 제출 실패:', response.error)
          hasSubmittedRef.current = false
        }
      } catch (error) {
        console.error('결과 제출 중 오류:', error)
        hasSubmittedRef.current = false
      }
    }

    submitResult()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mbtiTypeFromUrl, storeResult])

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

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">결과를 불러오는 중...</p>
      </div>
    }>
      <ResultPageContent />
    </Suspense>
  )
}
