/**
 * Zod 스키마를 사용한 입력 검증
 *
 * 이 파일은 애플리케이션 전반에서 사용되는 입력 검증 스키마를 정의합니다.
 * Zod를 사용하여 런타임 타입 안전성을 보장합니다.
 */

import { z } from 'zod'

// ============================================
// MBTI 관련 스키마
// ============================================

/**
 * MBTI 타입 스키마
 * 16가지 MBTI 타입을 검증합니다.
 */
export const mbtiTypeSchema = z.enum([
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP'
])

/**
 * MBTI 차원 스키마
 * E/I, S/N, T/F, J/P 차원을 검증합니다.
 */
export const mbtiDimensionSchema = z.enum(['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P'])

/**
 * 퀴즈 결과 스키마
 * 사용자가 퀴즈를 완료한 후 제출하는 결과 데이터를 검증합니다.
 */
export const quizResultSchema = z.object({
  mbtiType: mbtiTypeSchema,
  scores: z.record(z.string(), z.number()),
  percentages: z.record(z.string(), z.number().min(0).max(100)),
  dominantTraits: z.array(mbtiDimensionSchema),
  completionTime: z.number().positive('완료 시간은 양수여야 합니다'),
  totalQuestions: z.number().int().positive('총 질문 수는 양의 정수여야 합니다')
})

// ============================================
// 질문 관련 스키마
// ============================================

/**
 * 질문 카테고리 스키마
 */
export const questionCategorySchema = z.enum([
  'gameplay_style',
  'team_play',
  'problem_solving',
  'game_preference',
  'social_interaction',
  'achievement'
])

/**
 * 점수 스키마
 * MBTI 차원별 점수를 검증합니다 (-2 ~ 2 범위)
 */
export const scoreSchema = z.object({
  dimension: mbtiDimensionSchema,
  value: z.number().min(-2).max(2, '점수는 -2에서 2 사이여야 합니다')
})

/**
 * 선택지 스키마
 */
export const optionSchema = z.object({
  id: z.string().min(1, '선택지 ID는 비어있을 수 없습니다'),
  text: z.string().min(1, '선택지 텍스트는 비어있을 수 없습니다'),
  description: z.string().optional(),
  scores: z.array(scoreSchema).min(1, '최소 하나의 점수가 필요합니다')
})

/**
 * 질문 스키마
 */
export const questionSchema = z.object({
  id: z.string().min(1, '질문 ID는 비어있을 수 없습니다'),
  question: z.string().min(1, '질문 내용은 비어있을 수 없습니다'),
  description: z.string().optional(),
  options: z.array(optionSchema).min(2, '최소 2개의 선택지가 필요합니다'),
  category: questionCategorySchema
})

/**
 * 답변 스키마
 */
export const answerSchema = z.object({
  questionId: z.string().min(1, '질문 ID는 비어있을 수 없습니다'),
  optionId: z.string().min(1, '선택지 ID는 비어있을 수 없습니다'),
  timestamp: z.date()
})

// ============================================
// 타입 추론
// ============================================

export type QuizResultInput = z.infer<typeof quizResultSchema>
export type QuestionInput = z.infer<typeof questionSchema>
export type AnswerInput = z.infer<typeof answerSchema>
export type OptionInput = z.infer<typeof optionSchema>
export type ScoreInput = z.infer<typeof scoreSchema>

// ============================================
// 검증 헬퍼 함수
// ============================================

/**
 * 퀴즈 결과 검증
 * @param data 검증할 데이터
 * @returns 검증 결과 (성공 시 data, 실패 시 error)
 */
export function validateQuizResult(data: unknown) {
  return quizResultSchema.safeParse(data)
}

/**
 * 질문 검증
 * @param data 검증할 데이터
 * @returns 검증 결과
 */
export function validateQuestion(data: unknown) {
  return questionSchema.safeParse(data)
}

/**
 * 답변 검증
 * @param data 검증할 데이터
 * @returns 검증 결과
 */
export function validateAnswer(data: unknown) {
  return answerSchema.safeParse(data)
}

/**
 * MBTI 타입 검증
 * @param data 검증할 데이터
 * @returns 검증 결과
 */
export function validateMBTIType(data: unknown) {
  return mbtiTypeSchema.safeParse(data)
}
