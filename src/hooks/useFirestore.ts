/**
 * Firestore 커스텀 훅
 * 
 * React 컴포넌트에서 Firestore를 쉽게 사용할 수 있는 훅들
 */

'use client'

import { useState, useEffect } from 'react'
import { getDocument, getDocuments, setDocument, updateDocument, deleteDocument } from '@/lib/firestore'
import type { DocumentData, QueryConstraint } from 'firebase/firestore'

/**
 * 단일 문서를 가져오는 훅
 * 
 * @param collectionName - 컬렉션 이름
 * @param documentId - 문서 ID (null이면 실행 안 함)
 * @returns 문서 데이터, 로딩 상태, 에러
 * 
 * 사용 예시:
 * const { data, loading, error } = useDocument('users', userId)
 * 
 * if (loading) return <div>로딩 중...</div>
 * if (error) return <div>에러: {error.message}</div>
 * return <div>사용자: {data?.name}</div>
 */
export function useDocument<T = DocumentData>(
  collectionName: string,
  documentId: string | null
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!documentId) {
      setLoading(false)
      return
    }

    const fetchDocument = async () => {
      try {
        setLoading(true)
        setError(null)
        const doc = await getDocument<T>(collectionName, documentId)
        setData(doc)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchDocument()
  }, [collectionName, documentId])

  return { data, loading, error }
}

/**
 * 여러 문서를 가져오는 훅
 * 
 * @param collectionName - 컬렉션 이름
 * @param constraints - 쿼리 조건
 * @returns 문서 배열, 로딩 상태, 에러
 * 
 * 사용 예시:
 * const { data, loading, error } = useCollection('quiz-results', [
 *   where('userId', '==', currentUserId),
 *   orderBy('createdAt', 'desc'),
 *   limit(10)
 * ])
 */
export function useCollection<T = DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[] = []
) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setLoading(true)
        setError(null)
        const docs = await getDocuments<T>(collectionName, constraints)
        setData(docs)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchCollection()
  }, [collectionName, JSON.stringify(constraints)])

  return { data, loading, error }
}

/**
 * Firestore 쓰기 작업을 위한 훅
 * 
 * @param collectionName - 컬렉션 이름
 * @returns 저장, 업데이트, 삭제 함수와 상태
 * 
 * 사용 예시:
 * const { save, update, remove, loading, error } = useFirestoreWrite('quiz-results')
 * 
 * const handleSave = async () => {
 *   await save('result-123', { mbtiType: 'INTJ', score: 95 })
 * }
 */
export function useFirestoreWrite(collectionName: string) {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  /**
   * 문서 저장
   */
  const save = async <T extends DocumentData>(
    documentId: string,
    data: T
  ): Promise<string | null> => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)
      
      const id = await setDocument(collectionName, documentId, data)
      
      setSuccess(true)
      return id
    } catch (err) {
      setError(err as Error)
      return null
    } finally {
      setLoading(false)
    }
  }

  /**
   * 문서 업데이트
   */
  const update = async <T extends Partial<DocumentData>>(
    documentId: string,
    data: T
  ): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)
      
      await updateDocument(collectionName, documentId, data)
      
      setSuccess(true)
      return true
    } catch (err) {
      setError(err as Error)
      return false
    } finally {
      setLoading(false)
    }
  }

  /**
   * 문서 삭제
   */
  const remove = async (documentId: string): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)
      
      await deleteDocument(collectionName, documentId)
      
      setSuccess(true)
      return true
    } catch (err) {
      setError(err as Error)
      return false
    } finally {
      setLoading(false)
    }
  }

  return { save, update, remove, loading, error, success }
}

/**
 * 사용 예시:
 * 
 * // 퀴즈 결과 페이지에서
 * function QuizResultPage() {
 *   const { save, loading, error, success } = useFirestoreWrite('quiz-results')
 *   
 *   const handleSubmit = async () => {
 *     const result = {
 *       mbtiType: 'INTJ',
 *       scores: { EI: 65, SN: 70, TF: 80, JP: 55 },
 *       createdAt: new Date()
 *     }
 *     
 *     await save(`result-${Date.now()}`, result)
 *   }
 *   
 *   return (
 *     <div>
 *       <button onClick={handleSubmit} disabled={loading}>
 *         {loading ? '저장 중...' : '결과 저장'}
 *       </button>
 *       {success && <p>✅ 저장되었습니다!</p>}
 *       {error && <p>❌ 에러: {error.message}</p>}
 *     </div>
 *   )
 * }
 * 
 * // 사용자 결과 목록
 * function UserResults({ userId }: { userId: string }) {
 *   const { data, loading, error } = useCollection('quiz-results', [
 *     where('userId', '==', userId),
 *     orderBy('createdAt', 'desc')
 *   ])
 *   
 *   if (loading) return <div>로딩 중...</div>
 *   if (error) return <div>에러: {error.message}</div>
 *   
 *   return (
 *     <ul>
 *       {data.map(result => (
 *         <li key={result.id}>{result.mbtiType}</li>
 *       ))}
 *     </ul>
 *   )
 * }
 */

