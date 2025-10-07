/**
 * Firestore 데이터 타입 정의
 * 
 * 왜 타입을 정의하나요?
 * - TypeScript의 타입 안전성 활용
 * - 자동완성으로 개발 속도 향상
 * - 오타 방지 및 버그 감소
 */

import type { Timestamp } from 'firebase/firestore'

/**
 * Firestore 문서 기본 인터페이스
 * 
 * 모든 Firestore 문서는 id를 가짐
 */
export interface IFirestoreDocument {
  id: string
}

/**
 * 타임스탬프 필드 인터페이스
 * 
 * 생성/수정 시간을 추적하는 모든 문서에 사용
 */
export interface ITimestamps {
  createdAt: Timestamp | Date
  updatedAt?: Timestamp | Date
}

/**
 * 퀴즈 결과 저장 인터페이스
 * 
 * Firestore 'quiz-results' 컬렉션에 저장될 데이터 구조
 */
export interface IQuizResult extends IFirestoreDocument, ITimestamps {
  // 사용자 식별 (익명 사용자면 세션 ID)
  userId?: string
  sessionId: string
  
  // MBTI 결과
  mbtiType: string // 'INTJ', 'ENFP' 등
  
  // 각 차원별 점수
  scores: {
    EI: number // Extraversion vs Introversion (0-100)
    SN: number // Sensing vs Intuition (0-100)
    TF: number // Thinking vs Feeling (0-100)
    JP: number // Judging vs Perceiving (0-100)
  }
  
  // 전체 답변 데이터
  answers: Array<{
    questionId: string
    selectedOption: string
    category: string
  }>
  
  // 통계용
  completionTime?: number // 소요 시간 (초)
  isCompleted: boolean
}

/**
 * 사용자 프로필 인터페이스 (선택사항)
 * 
 * 사용자 정보를 저장하고 싶을 때 사용
 */
export interface IUserProfile extends IFirestoreDocument, ITimestamps {
  // 기본 정보
  email?: string
  displayName?: string
  photoURL?: string
  
  // 통계
  quizCount: number // 퀴즈를 몇 번 했는지
  lastQuizResultId?: string // 마지막 퀴즈 결과 ID
  
  // 설정
  preferences?: {
    language?: string
    theme?: 'light' | 'dark'
  }
}

/**
 * 통계 데이터 인터페이스
 * 
 * 전체 사용자 통계를 저장
 */
export interface IStatistics extends IFirestoreDocument, ITimestamps {
  // MBTI 유형별 통계
  mbtiDistribution: Record<string, number> // { 'INTJ': 150, 'ENFP': 230, ... }
  
  // 총 참여자 수
  totalParticipants: number
  
  // 가장 인기 있는 유형
  mostCommonType: string
}

/**
 * Firestore 쿼리 필터 타입
 * 
 * 데이터를 검색할 때 사용하는 필터 옵션
 */
export interface IFirestoreQueryFilter {
  field: string
  operator: '==' | '!=' | '>' | '>=' | '<' | '<='
  value: string | number | boolean | Date
}

/**
 * Firestore 쿼리 옵션
 * 
 * 데이터를 가져올 때 사용하는 옵션
 */
export interface IFirestoreQueryOptions {
  // 정렬
  orderBy?: {
    field: string
    direction: 'asc' | 'desc'
  }
  
  // 제한
  limit?: number
  
  // 필터
  where?: IFirestoreQueryFilter[]
}

/**
 * 사용 예시:
 * 
 * // 퀴즈 결과 저장
 * const result: IQuizResult = {
 *   id: 'auto-generated-id',
 *   sessionId: 'session-123',
 *   mbtiType: 'INTJ',
 *   scores: {
 *     EI: 65,
 *     SN: 70,
 *     TF: 80,
 *     JP: 55
 *   },
 *   answers: [...],
 *   isCompleted: true,
 *   createdAt: new Date(),
 * }
 * 
 * await setDocument('quiz-results', result.id, result)
 */

