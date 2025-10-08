/**
 * Kakao JavaScript SDK 타입 정의
 * 
 * Kakao SDK는 TypeScript 타입 정의가 없으므로
 * 필요한 부분만 직접 정의합니다.
 */

interface Window {
  Kakao: {
    init: (appKey: string) => void
    isInitialized: () => boolean
    cleanup: () => void
    Share: {
      sendDefault: (settings: {
        objectType: 'feed'
        content: {
          title: string
          description: string
          imageUrl: string
          link: {
            mobileWebUrl: string
            webUrl: string
          }
        }
        buttons?: Array<{
          title: string
          link: {
            mobileWebUrl: string
            webUrl: string
          }
        }>
      }) => void
    }
  }
}
