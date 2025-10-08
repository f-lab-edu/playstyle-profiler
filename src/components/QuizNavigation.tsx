'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface IQuizNavigationProps {
  canGoPrevious: boolean
  canGoNext: boolean
  isAnswered: boolean
  onPrevious: () => void
  onNext: () => void
  currentIndex: number
  totalQuestions: number
  answeredCount: number
}

/**
 * QuizNavigation 컴포넌트
 * 
 * 왜 이렇게 만들었나요?
 * - 퀴즈 진행을 위한 네비게이션 UI를 분리하여 관심사 분리
 * - 버튼 비활성화 조건을 명확하게 표현
 * - 진행 상태를 시각적으로 피드백
 * 
 * 주요 기능:
 * - 이전/다음 버튼 제공
 * - 답변 여부에 따른 다음 버튼 활성화/비활성화
 * - 첫/마지막 질문에서 적절한 버튼 비활성화
 * - 답변 상태 표시
 */
export function QuizNavigation({
  canGoPrevious,
  canGoNext,
  isAnswered,
  onPrevious,
  onNext,
  currentIndex,
  totalQuestions,
  answeredCount,
}: IQuizNavigationProps) {
  const isLastQuestion = currentIndex === totalQuestions - 1
  
  // 다음 버튼 활성화 조건
  // - 마지막 질문: 현재 답변했으면 활성화 (완료하기)
  // - 그 외: 답변했고 && 다음 질문이 있으면 활성화
  const canProceedNext = isLastQuestion ? isAnswered : (isAnswered && canGoNext)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="space-y-4"
    >
      {/* 네비게이션 버튼들 */}
      <div className="flex items-center justify-between gap-4">
        {/* 이전 버튼 */}
        <Button
          variant="outline"
          size="lg"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className={cn(
            'min-w-[120px] transition-all duration-200',
            canGoPrevious && 'hover:scale-105'
          )}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          이전 질문
        </Button>

        {/* 중앙 상태 표시 */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <AnimatePresence mode="wait">
            {!isAnswered ? (
              <motion.div
                key="not-answered"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-sm text-muted-foreground text-center"
              >
                답변을 선택해주세요
              </motion.div>
            ) : (
              <motion.div
                key="answered"
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 25,
                }}
                className="flex items-center gap-2 text-sm font-medium text-primary"
              >
                <CheckCircle2 className="w-4 h-4" />
                답변 완료
              </motion.div>
            )}
          </AnimatePresence>

          {/* 진행률 표시 */}
          <div className="text-xs text-muted-foreground">
            진행: {answeredCount}/{totalQuestions}
          </div>
        </div>

        {/* 다음 버튼 또는 완료하기 버튼 */}
        <Button
          size="lg"
          onClick={onNext}
          disabled={!canProceedNext}
          className={cn(
            'min-w-[120px] transition-all duration-200',
            canProceedNext && 'hover:scale-105',
            !isAnswered && 'cursor-not-allowed',
            isLastQuestion && isAnswered && 'bg-green-600 hover:bg-green-700'
          )}
        >
          {isLastQuestion ? '완료하기' : '다음 질문'}
          {isLastQuestion ? (
            <CheckCircle2 className="w-4 h-4 ml-2" />
          ) : (
            <ChevronRight className="w-4 h-4 ml-2" />
          )}
        </Button>
      </div>

      {/* 답변하지 않았을 때 힌트 메시지 */}
      <AnimatePresence>
        {!isAnswered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="text-center text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
              💡 답변을 선택하면 다음 질문으로 넘어갈 수 있어요
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
