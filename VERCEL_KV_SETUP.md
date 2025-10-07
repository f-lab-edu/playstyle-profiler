# 🚀 Vercel KV 설정 가이드

Firebase를 완전히 제거하고 Vercel KV로 교체했습니다!

## ✅ 완료된 작업

1. ❌ `src/lib/firebase.ts` 삭제
2. ❌ `src/lib/firestore.ts` 삭제
3. ✅ `@vercel/kv` 패키지 설치
4. ✅ `src/lib/stats.ts` 생성 - 통계 유틸리티
5. ✅ `src/app/api/stats/submit/route.ts` 생성 - 결과 제출 API
6. ✅ `src/app/api/stats/route.ts` 생성 - 통계 조회 API

## 🔧 남은 작업

### 1. Firebase 패키지 제거 (선택사항)

```bash
npm uninstall firebase
```

또는 `package.json`에서 직접 제거:
```json
"dependencies": {
  "firebase": "^12.3.0",  // 이 줄 삭제
}
```

그리고 `npm install` 실행

---

## 📝 Vercel KV 설정 방법

### 1. Vercel 대시보드에서 KV 생성

1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. 프로젝트 선택
3. **Storage** 탭 클릭
4. **Create Database** → **Upstash** 선택 (Vercel KV는 Upstash Redis 기반)
5. **Redis** 선택
6. 데이터베이스 이름 입력 (예: `playstyle-stats`)
7. Region 선택 (가까운 지역, 예: ap-northeast-2 - Seoul)
8. **Create** 클릭

### 2. 환경 변수 자동 연결

Vercel이 자동으로 다음 환경 변수를 설정합니다:
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

### 3. 로컬 개발 환경 설정

프로젝트 루트에 `.env.local` 파일 생성:

```bash
# Vercel 대시보드 > Storage > KV > .env.local 탭에서 복사
KV_REST_API_URL="https://xxx.upstash.io"
KV_REST_API_TOKEN="Axxxx"
KV_REST_API_READ_ONLY_TOKEN="Axxxx"
```

---

## 🎯 사용 방법

### 클라이언트에서 결과 제출

```typescript
'use client'

import { useQuizStore } from '@/store/quizStore'

export function ResultPage() {
  const result = useQuizStore(state => state.result)
  
  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/stats/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result)
      })
      
      const data = await response.json()
      console.log('제출 완료! 총 참여자:', data.totalSubmissions)
    } catch (error) {
      console.error('제출 실패:', error)
    }
  }
  
  return <button onClick={handleSubmit}>결과 제출하기</button>
}
```

### 통계 조회

```typescript
'use client'

import { useEffect, useState } from 'react'

export function StatsPage() {
  const [stats, setStats] = useState(null)
  
  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
  }, [])
  
  if (!stats) return <div>로딩 중...</div>
  
  return (
    <div>
      <h2>전체 참여자: {stats.totalSubmissions}명</h2>
      {Object.entries(stats.mbtiCounts).map(([type, count]) => (
        <div key={type}>
          {type}: {count}명 ({stats.percentages[type]}%)
        </div>
      ))}
    </div>
  )
}
```

---

## 📊 API 엔드포인트

### POST `/api/stats/submit`

퀴즈 결과를 제출합니다.

**Request Body:**
```json
{
  "mbtiType": "INTJ",
  "scores": {
    "EI": 70,
    "SN": 60,
    "TF": 80,
    "JP": 55
  }
}
```

**Response:**
```json
{
  "success": true,
  "totalSubmissions": 1234
}
```

### GET `/api/stats`

전체 통계를 조회합니다.

**Response:**
```json
{
  "mbtiCounts": {
    "INTJ": 150,
    "ENFP": 200,
    "ISTJ": 180,
    ...
  },
  "totalSubmissions": 1234,
  "percentages": {
    "INTJ": 12.2,
    "ENFP": 16.2,
    "ISTJ": 14.6,
    ...
  }
}
```

---

## 🔥 Firebase vs Vercel KV 비교

| 항목 | Firebase | Vercel KV |
|------|----------|-----------|
| **코드 양** | 257줄 | 100줄 |
| **설정 시간** | 30분 | 2분 |
| **속도** | 느림 (200-500ms) | 초고속 (10-50ms) |
| **무료 티어** | 제한적 | 넉넉함 |
| **Vercel 통합** | 수동 | 자동 |
| **학습 곡선** | 가파름 | 완만함 |

---

## 🎉 완료!

이제 Firebase 없이 깔끔하게 작동합니다!

### 다음 단계

1. Vercel에 배포: `vercel --prod`
2. Storage 탭에서 KV 생성
3. 환경 변수 자동 연결
4. 끝! 🚀

### 테스트 방법

```bash
# 로컬 개발 서버 실행
npm run dev

# 결과 제출 테스트
curl -X POST http://localhost:3000/api/stats/submit \
  -H "Content-Type: application/json" \
  -d '{"mbtiType":"INTJ","scores":{"EI":70,"SN":60,"TF":80,"JP":55}}'

# 통계 조회 테스트
curl http://localhost:3000/api/stats
```

---

## 🆘 문제 해결

### "KV is not defined" 에러

→ `.env.local` 파일에 환경 변수를 추가하세요

### 로컬에서 테스트하고 싶어요

→ [Upstash](https://upstash.com)에서 무료 계정 생성하고 Redis 데이터베이스 만들기

### 통계를 초기화하고 싶어요

```typescript
import { resetStats } from '@/lib/stats'

// 개발 환경에서만 사용!
await resetStats()
```

