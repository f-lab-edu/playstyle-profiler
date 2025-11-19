'use client'

import { motion } from 'framer-motion'
import { Progress } from '@/components/ui'
import { useQuizStore } from '@/store/quizStore'

export function QuizProgress() {
  const { quizState, progress } = useQuizStore()
  const currentQuestionNumber = quizState.currentQuestionIndex + 1
  const isFirstQuestion = quizState.currentQuestionIndex === 0
  
  return (
    <div className="w-full space-y-3">
      {/* 상단: 질문 번호와 퍼센트 표시 */}
      <div className="flex items-center justify-between text-sm">
        {/* 현재 질문 번호 */}
        <motion.div 
          key={currentQuestionNumber}
          initial={isFirstQuestion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isFirstQuestion ? 0 : 0.3 }}
          className="font-medium text-muted-foreground"
        >
          질문 <span className="text-primary font-bold text-base">{currentQuestionNumber}</span>
          {' '}/ {progress.total}
        </motion.div>
        
        {/* 진행률 퍼센트 */}
        <motion.div
          key={progress.percentage}
          initial={isFirstQuestion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: isFirstQuestion ? 0 : 0.3,
            type: 'spring',
            stiffness: 200
          }}
          className="font-semibold text-primary"
        >
          {progress.percentage}%
        </motion.div>
      </div>

      {/* Progress 바 */}
      <div className="relative">
        <Progress 
          value={progress.percentage} 
          className="h-2.5 bg-secondary/50"
        />
        
        {/* Progress 바 위에 그림자 효과 (선택사항) */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      </div>

      {/* 답변 완료 개수 (선택사항) */}
      <motion.div
        initial={{ opacity: isFirstQuestion ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: isFirstQuestion ? 0 : 0.2 }}
        className="text-xs text-center text-muted-foreground"
      >
        {progress.current > 0 && (
          <>
            <span className="text-primary font-medium">{progress.current}개</span>
            {' '}답변 완료
          </>
        )}
      </motion.div>
    </div>
  )
}
