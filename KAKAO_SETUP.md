# 🔑 Kakao API 설정 가이드

## 1. Kakao Developers 계정 생성

1. [Kakao Developers](https://developers.kakao.com/) 접속
2. 카카오 계정으로 로그인
3. "시작하기" 클릭

## 2. 애플리케이션 등록

### 앱 생성

1. "내 애플리케이션" 메뉴 클릭
2. "애플리케이션 추가하기" 버튼 클릭
3. 앱 정보 입력:
   - **앱 이름**: "플레이스타일 MBTI" (또는 원하는 이름)
   - **회사명**: 개인 프로젝트의 경우 공란 가능
4. "저장" 클릭

### JavaScript 키 확인

앱을 생성하면 자동으로 키가 발급됩니다:

1. 생성한 앱 클릭
2. "앱 키" 메뉴에서 **JavaScript 키** 복사
   ```
   예시: 1234567890abcdef1234567890abcdef
   ```

## 3. 플랫폼 설정

카카오톡 공유 기능을 사용하려면 웹 플랫폼을 등록해야 합니다.

### 개발 환경

1. "플랫폼" 메뉴 클릭
2. "Web 플랫폼 등록" 클릭
3. **사이트 도메인** 입력:
   ```
   http://localhost:3000
   ```
4. "저장" 클릭

### 프로덕션 환경

배포 후 실제 도메인도 등록:
```
https://your-domain.vercel.app
```

**주의사항:**
- `http://`와 `https://` 구분 필수
- 포트 번호 포함 시 정확히 입력
- 여러 도메인 등록 가능

## 4. 환경 변수 설정

### 로컬 개발

프로젝트 루트에 `.env.local` 파일 생성:

```bash
# .env.local
NEXT_PUBLIC_KAKAO_API_KEY=your_javascript_key_here
```

**예시:**
```bash
NEXT_PUBLIC_KAKAO_API_KEY=1234567890abcdef1234567890abcdef
```

### Vercel 배포

1. Vercel 프로젝트 대시보드 접속
2. **Settings** → **Environment Variables** 클릭
3. 변수 추가:
   - **Name**: `NEXT_PUBLIC_KAKAO_API_KEY`
   - **Value**: JavaScript 키 붙여넣기
   - **Environment**: Production, Preview, Development 모두 선택
4. "Save" 클릭
5. 재배포 (Redeploy)

### 다른 플랫폼 배포

**Netlify:**
```
Site settings → Build & deploy → Environment → Environment variables
```

**Railway:**
```
Variables → New Variable
```

**AWS Amplify:**
```
App settings → Environment variables
```

## 5. 카카오톡 공유 메시지 커스터마이징

### 기본 설정 (필수)

`src/components/ShareButtons.tsx`에서 수정 가능:

```typescript
window.Kakao.Share.sendDefault({
  objectType: 'feed',
  content: {
    title: '🎮 플레이스타일 MBTI 결과',           // 제목
    description: `나는 ${mbtiType} - ${profileTitle}!`,  // 설명
    imageUrl: window.location.origin + '/og-image.png',  // 이미지
    link: {
      mobileWebUrl: url,
      webUrl: url,
    },
  },
  buttons: [
    {
      title: '내 결과 보기',
      link: { ... }
    }
  ],
})
```

### Open Graph 이미지 추가 (선택)

카카오톡에서 표시될 이미지:

1. `public/og-image.png` 파일 생성
2. 권장 크기: **1200 x 630px**
3. 파일 크기: 1MB 이하
4. 형식: PNG, JPG

**이미지가 없으면?**
- 카카오톡이 자동으로 기본 이미지 표시
- 또는 사이트의 favicon 사용

## 6. 테스트

### 로컬 테스트

```bash
npm run dev
```

브라우저에서:
1. `http://localhost:3000/result` 접속
2. "결과 공유하기" 클릭
3. "카카오톡 공유" 클릭
4. 공유 다이얼로그 확인

### 모바일 테스트 (권장)

카카오톡 앱은 모바일에서만 제대로 동작하므로:

**방법 1: 로컬 네트워크**
```bash
# 컴퓨터의 IP 확인
# Windows: ipconfig
# Mac/Linux: ifconfig

# 모바일에서 접속
http://192.168.0.10:3000
```

**방법 2: ngrok 사용**
```bash
npx ngrok http 3000

# ngrok URL을 Kakao Developers 플랫폼에 추가
https://xxxx-xxx-xxx.ngrok.io
```

## 7. 문제 해결

### ❌ "Kakao is not defined"

**원인:** SDK가 로드되지 않음

**해결:**
1. `src/app/layout.tsx` 확인
2. 스크립트 태그 존재 여부 확인
3. 브라우저 콘솔에서 `window.Kakao` 확인

### ❌ "Invalid API key"

**원인:** 잘못된 JavaScript 키

**해결:**
1. Kakao Developers에서 키 재확인
2. `.env.local` 파일 확인
3. 개발 서버 재시작

### ❌ "Unauthorized redirect_uri"

**원인:** 도메인이 등록되지 않음

**해결:**
1. Kakao Developers → 플랫폼 설정
2. 현재 접속 중인 도메인 추가
3. `http://`와 `https://` 구분 확인

### ❌ 공유 창이 열리지 않음

**원인:** 팝업 차단

**해결:**
1. 브라우저 팝업 차단 해제
2. Chrome: 주소창 오른쪽 팝업 아이콘 확인
3. 사이트별 설정에서 팝업 허용

### ❌ 모바일에서 카카오톡 앱이 열리지 않음

**원인:** 카카오톡 앱이 설치되지 않음

**해결:**
- 웹 버전으로 대체 (자동)
- 또는 카카오톡 앱 설치 유도

## 8. 보안 주의사항

### ✅ 해야 할 것

- `NEXT_PUBLIC_` 접두사 사용
- JavaScript 키만 사용 (REST API 키 X)
- `.env.local`을 `.gitignore`에 추가

### ❌ 하지 말아야 할 것

- REST API 키를 클라이언트에 노출
- Admin 키를 클라이언트에 노출
- `.env.local`을 Git에 커밋

## 9. 배포 체크리스트

- [ ] Kakao Developers 앱 생성
- [ ] JavaScript 키 발급
- [ ] 웹 플랫폼 도메인 등록 (개발/프로덕션)
- [ ] `.env.local` 파일 생성
- [ ] 환경 변수 설정 (로컬)
- [ ] Vercel 환경 변수 추가
- [ ] 로컬에서 테스트
- [ ] 배포 후 프로덕션에서 테스트
- [ ] 모바일에서 카카오톡 공유 테스트

## 10. 참고 자료

- [Kakao Developers - JavaScript SDK](https://developers.kakao.com/docs/latest/ko/javascript/getting-started)
- [Kakao Developers - 메시지 API](https://developers.kakao.com/docs/latest/ko/message/js-link)
- [Next.js - Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
