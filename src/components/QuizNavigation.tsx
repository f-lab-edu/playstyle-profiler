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
  const isFirstQuestion = currentIndex === 0
  
  const canProceedNext = isLastQuestion ? isAnswered : (isAnswered && canGoNext)

  return (
    <motion.div
      initial={isFirstQuestion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: isFirstQuestion ? 0 : 0.3, duration: isFirstQuestion ? 0 : 0.4 }}
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
