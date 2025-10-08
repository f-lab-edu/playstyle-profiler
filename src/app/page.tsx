'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Play, Clock, HelpCircle, Sparkles } from 'lucide-react'

/**
 * 홈페이지 (랜딩 페이지)
 * 
 * 퀴즈 소개 및 시작 버튼을 제공하는 메인 페이지입니다.
 */
export default function HomePage() {
  const router = useRouter()

  const handleStartQuiz = () => {
    router.push('/quiz')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/10">
      <div className="container mx-auto px-4 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto">
          {/* 메인 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 text-primary"
            >
              <Sparkles className="w-12 h-12" />
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
              <span className="block text-foreground">게임 플레이스타일</span>
              <span className="block text-primary mt-2">MBTI 분석</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              당신의 게임 플레이 방식을 분석하여
              <br className="hidden sm:block" />
              MBTI 성격 유형과 연결해드립니다
            </p>

            {/* 시작 버튼 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="pt-4"
            >
              <Button
                size="lg"
                onClick={handleStartQuiz}
                className="text-lg px-8 py-6 gap-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <Play className="w-5 h-5" />
                테스트 시작하기
              </Button>
            </motion.div>
          </motion.div>

          {/* 정보 카드들 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="grid sm:grid-cols-3 gap-4 mb-12"
          >
            <Card className="border-2">
              <CardContent className="pt-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">약 5분 소요</h3>
                <p className="text-sm text-muted-foreground">
                  짧은 시간에 빠르게 완료
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6 text-center">
                <HelpCircle className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">16개 질문</h3>
                <p className="text-sm text-muted-foreground">
                  핵심 질문으로 정확한 분석
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6 text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">16가지 유형</h3>
                <p className="text-sm text-muted-foreground">
                  MBTI 기반 상세 분석
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* 테스트 내용 미리보기 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Card className="border-2">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-center mb-4">
                  무엇을 알 수 있나요?
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Badge variant="outline" className="mb-2">플레이 스타일</Badge>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 당신의 게임 접근 방식</li>
                      <li>• 선호하는 플레이 유형</li>
                      <li>• 팀에서의 역할</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <Badge variant="outline" className="mb-2">맞춤 추천</Badge>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 추천 게임 장르</li>
                      <li>• 어울리는 무기/전략</li>
                      <li>• 성향에 맞는 팁</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <Button
                    variant="outline"
                    onClick={handleStartQuiz}
                    className="gap-2"
                  >
                    지금 바로 시작하기
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
