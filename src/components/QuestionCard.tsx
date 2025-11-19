'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { IQuestion, IOption } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface IQuestionCardProps {
  question: IQuestion
  currentIndex: number
  totalQuestions: number
  selectedOptionId?: string
  onSelect: (optionId: string) => void
}

interface IOptionButtonProps {
  option: IOption
  isSelected: boolean
  onSelect: () => void
}

function OptionButton({ option, isSelected, onSelect }: IOptionButtonProps) {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
      className={cn(
        'w-full text-left p-4 rounded-lg border-2 transition-colors duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        !isSelected && [
          'bg-card border-border',
          'hover:bg-accent hover:border-accent-foreground/20',
        ],
        isSelected && [
          'bg-primary/10 border-primary',
          'shadow-md shadow-primary/20',
        ]
      )}
    >
      <div className="flex items-start gap-3">
        <motion.div
          initial={false}
          animate={{
            scale: isSelected ? 1 : 0.8,
            opacity: isSelected ? 1 : 0.3,
          }}
          transition={{ duration: 0.2 }}
          className={cn(
            'flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2',
            isSelected
              ? 'bg-primary border-primary text-primary-foreground'
              : 'border-border'
          )}
        >
          {isSelected && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 15,
              }}
            >
              <Check className="w-3 h-3" />
            </motion.div>
          )}
        </motion.div>

        <div className="flex-1 space-y-1">
          <motion.p
            className={cn(
              'font-medium text-sm sm:text-base',
              isSelected ? 'text-primary' : 'text-foreground'
            )}
            animate={{
              x: isSelected ? 2 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            {option.text}
          </motion.p>

          {option.description && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isSelected ? 0.9 : 0.6,
                height: 'auto',
              }}
              className="text-xs sm:text-sm text-muted-foreground"
            >
              {option.description}
            </motion.p>
          )}
        </div>
      </div>
    </motion.button>
  )
}

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionId,
  onSelect,
}: IQuestionCardProps) {
  const categoryLabels: Record<string, string> = {
    gameplay_style: '게임플레이 스타일',
    team_play: '팀플레이',
    problem_solving: '문제 해결',
    game_preference: '게임 선호도',
    social_interaction: '사회적 상호작용',
    achievement: '성취 방식',
  }

  const isFirstQuestion = currentIndex === 0
  
  return (
    <motion.div
      key={question.id}
      initial={isFirstQuestion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{
        duration: isFirstQuestion ? 0 : 0.4,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="w-full"
    >
      <Card className="overflow-hidden border-2 shadow-lg">
        {/* 카드 헤더: 질문 정보 */}
        <CardHeader className="space-y-4 bg-gradient-to-br from-primary/5 to-primary/10">
          {/* 상단: 질문 번호와 카테고리 */}
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-sm">
              {categoryLabels[question.category] || question.category}
            </Badge>
            <motion.span
              key={currentIndex}
              initial={isFirstQuestion ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: isFirstQuestion ? 0 : 0.1 }}
              className="text-sm font-medium text-muted-foreground"
            >
              {currentIndex + 1} / {totalQuestions}
            </motion.span>
          </div>

          {/* 질문 제목 */}
          <CardTitle className="text-xl sm:text-2xl leading-tight">
            {question.question}
          </CardTitle>

          {/* 질문 설명 (있는 경우) */}
          {question.description && (
            <CardDescription className="text-base">
              {question.description}
            </CardDescription>
          )}
        </CardHeader>

        {/* 카드 본문: 선택지 목록 */}
        <CardContent className="p-6 space-y-3">
          {question.options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={isFirstQuestion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: isFirstQuestion ? 0 : index * 0.08,
                duration: isFirstQuestion ? 0 : 0.3,
              }}
            >
              <OptionButton
                option={option}
                isSelected={selectedOptionId === option.id}
                onSelect={() => onSelect(option.id)}
              />
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}
