# 🔗 공유 기능 구현 가이드 (Phase 9-1)

## ✨ 구현 완료 내역

### 공유 기능 컴포넌트

**파일:** `src/components/ShareButtons.tsx`

### 주요 기능

1. **URL 복사** 📋
   - Clipboard API 사용
   - 클립보드에 결과 URL 복사
   - 복사 완료 피드백 애니메이션

2. **카카오톡 공유** 💬
   - Kakao JavaScript SDK 사용
   - 피드 형식으로 공유
   - 커스텀 이미지 및 버튼

3. **X (트위터) 공유** 🐦
   - Twitter Intent API 사용
   - 새 창에서 트윗 작성

## 🎯 사용된 기술

### 1. Clipboard API
```typescript
const handleCopyUrl = async () => {
  const url = window.location.origin + `/result?type=${mbtiType}`
  await navigator.clipboard.writeText(url)
  
  // 피드백 표시
  setIsCopied(true)
  setTimeout(() => setIsCopied(false), 2000)
}
```

**장점:**
- 브라우저 내장 API
- 비동기 처리로 부드러운 UX
- 권한 요청 자동 처리

### 2. Kakao SDK 통합

**SDK 로드:**
```html
<!-- src/app/layout.tsx -->
<script
  src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
  integrity="sha384-TiCUE00h+f9W8mR4aOCx1MRJ+Dn9Qg3EQ0HkLLJHJRAc8r7r/LsV0pq5hx6YJlx+"
  crossOrigin="anonymous"
  async
/>
```

**공유 구현:**
```typescript
window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY)

window.Kakao.Share.sendDefault({
  objectType: 'feed',
  content: {
    title: ' 플레이스타일 MBTI 결과',
    description: `나는 ${mbtiType} - ${profileTitle}!`,
    imageUrl: window.location.origin + '/og-image.png',
    link: {
      mobileWebUrl: url,
      webUrl: url,
    },
  },
  buttons: [
    { title: '내 결과 보기', link: { ... } },
    { title: '나도 테스트하기', link: { ... } },
  ],
})
```

### 3. TypeScript 타입 정의

**파일:** `src/types/kakao.d.ts`

```typescript
interface Window {
  Kakao: {
    init: (appKey: string) => void
    isInitialized: () => boolean
    cleanup: () => void
    Share: {
      sendDefault: (settings: {...}) => void
    }
  }
}
```

**왜 필요한가요?**
- Kakao SDK는 공식 TypeScript 타입이 없음
- 타입 안전성 확보
- IDE 자동완성 지원

## 🔧 설정 방법

### 1. Kakao API Key 발급

1. [Kakao Developers](https://developers.kakao.com/) 접속
2. "내 애플리케이션" → "애플리케이션 추가하기"
3. 앱 생성 후 "JavaScript 키" 복사
4. "플랫폼" 설정에서 웹 사이트 도메인 등록
   - 개발: `http://localhost:3000`
   - 프로덕션: `https://yourdomain.com`

### 2. 환경 변수 설정

`.env.local` 파일 생성:
```bash
NEXT_PUBLIC_KAKAO_API_KEY=your_kakao_javascript_key_here
```

**주의사항:**
- `NEXT_PUBLIC_` 접두사 필수 (클라이언트에서 접근)
- `.env.local`은 `.gitignore`에 포함되어 있음
- `.env.local.example` 파일은 참고용

### 3. Vercel 배포 시

Vercel 대시보드에서:
1. Project Settings → Environment Variables
2. `NEXT_PUBLIC_KAKAO_API_KEY` 추가
3. Production, Preview, Development 모두 선택
4. Save

## 🎨 UI/UX 특징

### 1. 접을 수 있는 메뉴

```typescript
const [showShareMenu, setShowShareMenu] = useState(false)

<AnimatePresence>
  {showShareMenu && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      {/* 공유 옵션들 */}
    </motion.div>
  )}
</AnimatePresence>
```

**장점:**
- 깔끔한 UI
- 필요할 때만 표시
- 부드러운 애니메이션

### 2. 복사 완료 피드백

```typescript
{isCopied ? (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: 'spring', stiffness: 500 }}
  >
    <Check className="w-5 h-5 text-primary" />
  </motion.div>
) : (
  <LinkIcon className="w-5 h-5 text-primary" />
)}
```

**효과:**
- 아이콘 전환 애니메이션
- 명확한 시각적 피드백
- 2초 후 자동으로 원래 상태로

### 3. 플랫폼별 아이콘 및 색상

```typescript
// URL 복사: 파란색
<div className="bg-primary/10">
  <LinkIcon className="text-primary" />
</div>

// 카카오톡: 노란색
<div className="bg-yellow-400">
  <MessageCircle className="text-yellow-900" />
</div>

// X (트위터): 파란색
<div className="bg-blue-400">
  <svg className="text-white">...</svg>
</div>
```

## 📱 테스트 방법

### 1. URL 복사 테스트

```bash
# 개발 서버 실행
npm run dev

# 브라우저에서
http://localhost:3000/result
```

**체크리스트:**
- [ ] "결과 공유하기" 버튼 클릭
- [ ] "URL 복사" 버튼 클릭
- [ ] 체크 아이콘으로 변경 확인
- [ ] "링크가 복사되었습니다!" 메시지 확인
- [ ] 다른 곳에 붙여넣기 (Ctrl+V) 테스트
- [ ] 2초 후 원래 상태로 돌아오는지 확인

### 2. 카카오톡 공유 테스트

**전제조건:**
- Kakao API Key 설정 완료
- 웹 플랫폼 도메인 등록 완료

**테스트:**
- [ ] "카카오톡 공유" 버튼 클릭
- [ ] 카카오톡 공유 다이얼로그 표시
- [ ] 제목/설명 확인
- [ ] 버튼 동작 확인
- [ ] 모바일에서도 테스트

**모바일 테스트 (권장):**
```bash
# 로컬 네트워크 IP로 접속
# 예: http://192.168.0.10:3000

# 또는 ngrok 사용
npx ngrok http 3000
```

### 3. X (트위터) 공유 테스트

- [ ] "X (트위터) 공유" 버튼 클릭
- [ ] 새 창에서 트윗 작성 페이지 열림
- [ ] 텍스트와 URL 자동 입력 확인

## 🔍 디버깅 팁

### 1. Kakao SDK 로드 확인

브라우저 콘솔에서:
```javascript
console.log(window.Kakao)
// Kakao 객체가 출력되어야 함

console.log(window.Kakao.isInitialized())
// true 출력되어야 함
```

### 2. 환경 변수 확인

```javascript
console.log(process.env.NEXT_PUBLIC_KAKAO_API_KEY)
// undefined가 아니어야 함
```

**문제 해결:**
- `.env.local` 파일 위치 확인 (프로젝트 루트)
- 개발 서버 재시작 (`npm run dev`)
- `NEXT_PUBLIC_` 접두사 확인

### 3. CORS 에러

**증상:**
```
Access to fetch at '...' from origin '...' has been blocked by CORS
```

**해결:**
- Kakao Developers에서 웹 플랫폼 도메인 등록
- `http://localhost:3000` 추가
- 프로덕션 도메인도 추가

## 🎯 고급 기능 (향후 개선)

### 1. 결과 이미지 생성

```typescript
// html2canvas 사용
import html2canvas from 'html2canvas'

const generateResultImage = async () => {
  const element = document.getElementById('result-card')
  const canvas = await html2canvas(element)
  return canvas.toDataURL('image/png')
}
```

### 2. 다양한 공유 옵션

- **Facebook 공유**
- **LinkedIn 공유**
- **Instagram 스토리** (이미지 필요)
- **네이버 블로그**

### 3. 공유 통계 추적

```typescript
// Vercel KV에 공유 횟수 저장
const trackShare = async (platform: string) => {
  await fetch('/api/stats/share', {
    method: 'POST',
    body: JSON.stringify({ platform, mbtiType }),
  })
}
```

## 📊 컴포넌트 구조

```
ShareButtons
├── 공유하기 메인 버튼
│   └── Share2 아이콘
│
└── AnimatePresence (공유 메뉴)
    └── Card
        ├── URL 복사 버튼
        │   ├── LinkIcon / Check 아이콘
        │   └── 복사 상태 표시
        │
        ├── 카카오톡 공유 버튼
        │   ├── MessageCircle 아이콘 (노란색)
        │   └── 설명 텍스트
        │
        └── X (트위터) 공유 버튼
            ├── Twitter 로고 SVG
            └── 설명 텍스트
```

## 💡 사용 예시

### Result 페이지에서 사용

```tsx
import { ShareButtons } from '@/components/ShareButtons'

<ShareButtons 
  mbtiType={result.mbtiType} 
  profileTitle={profile.title} 
/>
```

### Props 설명

```typescript
interface IShareButtonsProps {
  mbtiType: MBTIType        // MBTI 유형 (예: 'INTJ')
  profileTitle: string      // 프로필 제목 (예: '전략적 마스터마인드')
}
```

## 🚀 다음 단계

- [ ] Open Graph 이미지 생성
- [ ] 공유 통계 추적
- [ ] 추가 SNS 플랫폼 지원
- [ ] 공유 성공/실패 알림 개선
- [ ] 모바일 최적화

## 📚 참고 자료

- [Kakao Developers - JavaScript SDK](https://developers.kakao.com/docs/latest/ko/javascript/getting-started)
- [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
- [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
- [Twitter Intent](https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent)
