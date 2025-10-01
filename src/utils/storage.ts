import { IQuizResult, IAnswer } from '../types'

const STORAGE_KEYS = {
  QUIZ_RESULT: 'playstyle_quiz_result',
  QUIZ_ANSWERS: 'playstyle_quiz_answers',
  QUIZ_START_TIME: 'playstyle_quiz_start_time',
  USER_PREFERENCES: 'playstyle_user_preferences',
  THEME: 'playstyle_theme'
} as const

/**
 * 로컬 스토리지 유틸리티 클래스
 */
export class LocalStorage {
  /**
   * 안전하게 로컬 스토리지에 데이터를 저장합니다
   */
  static set<T>(key: string, value: T): boolean {
    try {
      if (typeof window === 'undefined') return false
      
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(key, serializedValue)
      return true
    } catch (error) {
      console.error('로컬 스토리지 저장 실패:', error)
      return false
    }
  }

  /**
   * 안전하게 로컬 스토리지에서 데이터를 가져옵니다
   */
  static get<T>(key: string, defaultValue?: T): T | null {
    try {
      if (typeof window === 'undefined') return defaultValue || null
      
      const item = localStorage.getItem(key)
      if (item === null) return defaultValue || null
      
      return JSON.parse(item) as T
    } catch (error) {
      console.error('로컬 스토리지 읽기 실패:', error)
      return defaultValue || null
    }
  }

  /**
   * 로컬 스토리지에서 데이터를 삭제합니다
   */
  static remove(key: string): boolean {
    try {
      if (typeof window === 'undefined') return false
      
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('로컬 스토리지 삭제 실패:', error)
      return false
    }
  }

  /**
   * 로컬 스토리지를 완전히 초기화합니다
   */
  static clear(): boolean {
    try {
      if (typeof window === 'undefined') return false
      
      localStorage.clear()
      return true
    } catch (error) {
      console.error('로컬 스토리지 초기화 실패:', error)
      return false
    }
  }

  /**
   * 특정 키가 존재하는지 확인합니다
   */
  static has(key: string): boolean {
    try {
      if (typeof window === 'undefined') return false
      
      return localStorage.getItem(key) !== null
    } catch (error) {
      console.error('로컬 스토리지 확인 실패:', error)
      return false
    }
  }
}

/**
 * 퀴즈 결과를 저장합니다
 */
export function saveQuizResult(result: IQuizResult): boolean {
  return LocalStorage.set(STORAGE_KEYS.QUIZ_RESULT, {
    ...result,
    savedAt: new Date().toISOString()
  })
}

/**
 * 저장된 퀴즈 결과를 가져옵니다
 */
export function getQuizResult(): IQuizResult | null {
  return LocalStorage.get<IQuizResult>(STORAGE_KEYS.QUIZ_RESULT)
}

/**
 * 퀴즈 답변들을 저장합니다
 */
export function saveQuizAnswers(answers: IAnswer[]): boolean {
  return LocalStorage.set(STORAGE_KEYS.QUIZ_ANSWERS, answers)
}

/**
 * 저장된 퀴즈 답변들을 가져옵니다
 */
export function getQuizAnswers(): IAnswer[] {
  return LocalStorage.get<IAnswer[]>(STORAGE_KEYS.QUIZ_ANSWERS, [])
}

/**
 * 퀴즈 시작 시간을 저장합니다
 */
export function saveQuizStartTime(startTime: Date): boolean {
  return LocalStorage.set(STORAGE_KEYS.QUIZ_START_TIME, startTime.toISOString())
}

/**
 * 저장된 퀴즈 시작 시간을 가져옵니다
 */
export function getQuizStartTime(): Date | null {
  const timeString = LocalStorage.get<string>(STORAGE_KEYS.QUIZ_START_TIME)
  return timeString ? new Date(timeString) : null
}

/**
 * 사용자 테마 설정을 저장합니다
 */
export function saveTheme(theme: 'light' | 'dark'): boolean {
  return LocalStorage.set(STORAGE_KEYS.THEME, theme)
}

/**
 * 저장된 테마 설정을 가져옵니다
 */
export function getTheme(): 'light' | 'dark' | null {
  return LocalStorage.get<'light' | 'dark'>(STORAGE_KEYS.THEME)
}

/**
 * 사용자 선호도를 저장합니다
 */
export function saveUserPreferences(preferences: Record<string, any>): boolean {
  return LocalStorage.set(STORAGE_KEYS.USER_PREFERENCES, preferences)
}

/**
 * 저장된 사용자 선호도를 가져옵니다
 */
export function getUserPreferences(): Record<string, any> {
  return LocalStorage.get<Record<string, any>>(STORAGE_KEYS.USER_PREFERENCES, {})
}

/**
 * 퀴즈 관련 모든 데이터를 삭제합니다
 */
export function clearQuizData(): boolean {
  const keys = [
    STORAGE_KEYS.QUIZ_RESULT,
    STORAGE_KEYS.QUIZ_ANSWERS,
    STORAGE_KEYS.QUIZ_START_TIME
  ]
  
  let success = true
  keys.forEach(key => {
    if (!LocalStorage.remove(key)) {
      success = false
    }
  })
  
  return success
}

/**
 * 스토리지 사용량을 확인합니다 (바이트 단위)
 */
export function getStorageUsage(): number {
  try {
    if (typeof window === 'undefined') return 0
    
    let totalSize = 0
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        totalSize += localStorage[key].length + key.length
      }
    }
    return totalSize
  } catch (error) {
    console.error('스토리지 사용량 확인 실패:', error)
    return 0
  }
}

/**
 * 스토리지가 거의 가득 찼는지 확인합니다
 */
export function isStorageAlmostFull(): boolean {
  try {
    const testKey = '_storage_test_'
    const testData = 'x'.repeat(1024) // 1KB 테스트 데이터
    
    localStorage.setItem(testKey, testData)
    localStorage.removeItem(testKey)
    
    return false
  } catch (error) {
    return true
  }
}
