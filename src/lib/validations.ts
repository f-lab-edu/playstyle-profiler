import { z } from 'zod'

export const mbtiTypeSchema = z.enum([
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP'
])

export const mbtiDimensionSchema = z.enum(['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P'])

export const quizResultSchema = z.object({
  mbtiType: mbtiTypeSchema,
  scores: z.record(z.string(), z.number()),
  percentages: z.record(z.string(), z.number().min(0).max(100)),
  dominantTraits: z.array(mbtiDimensionSchema),
  completionTime: z.number().positive('완료 시간은 양수여야 합니다'),
  totalQuestions: z.number().int().positive('총 질문 수는 양의 정수여야 합니다')
})

export const questionCategorySchema = z.enum([
  'gameplay_style',
  'team_play',
  'problem_solving',
  'game_preference',
  'social_interaction',
  'achievement'
])

export const scoreSchema = z.object({
  dimension: mbtiDimensionSchema,
  value: z.number().min(-2).max(2, '점수는 -2에서 2 사이여야 합니다')
})

export const optionSchema = z.object({
  id: z.string().min(1, '선택지 ID는 비어있을 수 없습니다'),
  text: z.string().min(1, '선택지 텍스트는 비어있을 수 없습니다'),
  description: z.string().optional(),
  scores: z.array(scoreSchema).min(1, '최소 하나의 점수가 필요합니다')
})

export const questionSchema = z.object({
  id: z.string().min(1, '질문 ID는 비어있을 수 없습니다'),
  question: z.string().min(1, '질문 내용은 비어있을 수 없습니다'),
  description: z.string().optional(),
  options: z.array(optionSchema).min(2, '최소 2개의 선택지가 필요합니다'),
  category: questionCategorySchema
})

export const answerSchema = z.object({
  questionId: z.string().min(1, '질문 ID는 비어있을 수 없습니다'),
  optionId: z.string().min(1, '선택지 ID는 비어있을 수 없습니다'),
  timestamp: z.date()
})

export type QuizResultInput = z.infer<typeof quizResultSchema>
export type QuestionInput = z.infer<typeof questionSchema>
export type AnswerInput = z.infer<typeof answerSchema>
export type OptionInput = z.infer<typeof optionSchema>
export type ScoreInput = z.infer<typeof scoreSchema>

export function validateQuizResult(data: unknown) {
  return quizResultSchema.safeParse(data)
}

export function validateQuestion(data: unknown) {
  return questionSchema.safeParse(data)
}

export function validateAnswer(data: unknown) {
  return answerSchema.safeParse(data)
}

export function validateMBTIType(data: unknown) {
  return mbtiTypeSchema.safeParse(data)
}
