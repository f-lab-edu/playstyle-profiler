# 🚀 Vercel 자동 배포 설정 가이드

## 📋 목차
1. [Git 저장소 준비](#1-git-저장소-준비)
2. [GitHub에 푸시](#2-github에-푸시)
3. [Vercel 계정 생성](#3-vercel-계정-생성)
4. [Vercel에 프로젝트 연결](#4-vercel에-프로젝트-연결)
5. [환경 변수 설정](#5-환경-변수-설정)
6. [자동 배포 확인](#6-자동-배포-확인)
7. [커스텀 도메인 설정 (선택)](#7-커스텀-도메인-설정-선택)

---

## 1. Git 저장소 준비

### 1-1. 현재 변경사항 확인
```bash
git status
```

### 1-2. 변경된 파일 스테이징
```bash
# 모든 파일 추가
git add .

# 또는 특정 파일만 추가
git add src/components/ShareButtons.tsx
git add src/app/layout.tsx
```

### 1-3. 커밋
```bash
git commit -m "feat: 공유 기능 구현 및 퀴즈 시스템 완성

- QuizScreen, QuizNavigation, QuestionCard 구현
- 결과 페이지 및 공유 기능 추가
- Kakao SDK 통합
- URL 복사, 카카오톡, X(트위터) 공유 기능"
```

### 1-4. .gitignore 확인
프로젝트 루트에 `.gitignore` 파일이 있는지 확인하고, 다음 내용이 포함되어 있는지 확인:

```gitignore
# dependencies
node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

**중요:** `.env.local` 파일은 절대 커밋하지 마세요! 🚨

---

## 2. GitHub에 푸시

### 2-1. GitHub 저장소 생성 (아직 없다면)

1. [GitHub](https://github.com) 로그인
2. 우측 상단 "+" 버튼 → "New repository" 클릭
3. Repository 정보 입력:
   - **Repository name**: `playstyle-profiler`
   - **Description**: "게임 플레이스타일 MBTI 분석 웹 애플리케이션"
   - **Public** 또는 **Private** 선택
   - ⚠️ **Initialize 옵션은 모두 체크 해제** (기존 프로젝트가 있으므로)
4. "Create repository" 클릭

### 2-2. 원격 저장소 연결

GitHub 저장소 생성 후 표시되는 명령어를 사용:

```bash
# 원격 저장소 추가 (아직 없다면)
git remote add origin https://github.com/your-username/playstyle-profiler.git

# 또는 SSH 사용
git remote add origin git@github.com:your-username/playstyle-profiler.git

# 원격 저장소 확인
git remote -v
```

### 2-3. GitHub에 푸시

```bash
# 현재 브랜치 확인
git branch

# main 브랜치로 푸시 (첫 푸시)
git push -u origin main

# 또는 master 브랜치인 경우
git push -u origin master

# 이후 푸시는 간단하게
git push
```

**브랜치 이름 변경이 필요한 경우:**
```bash
# master를 main으로 변경
git branch -M main
git push -u origin main
```

---

## 3. Vercel 계정 생성

### 3-1. Vercel 가입

1. [Vercel](https://vercel.com) 접속
2. "Sign Up" 클릭
3. **GitHub 계정으로 연결** (권장)
   - "Continue with GitHub" 클릭
   - GitHub 인증 허용
   - Vercel이 저장소에 접근할 수 있도록 권한 부여

**왜 GitHub 연결이 좋은가요?**
- 저장소 자동 감지
- 푸시 시 자동 배포
- PR 미리보기 배포
- 간편한 설정

---

## 4. Vercel에 프로젝트 연결

### 4-1. 새 프로젝트 생성

1. Vercel 대시보드 접속
2. "Add New..." → "Project" 클릭
3. "Import Git Repository" 섹션에서 `playstyle-profiler` 저장소 찾기
4. "Import" 클릭

### 4-2. 프로젝트 설정

**Configure Project** 화면에서:

```
Project Name: playstyle-profiler (자동 입력됨)
Framework Preset: Next.js (자동 감지)
Root Directory: ./ (기본값)
Build Command: (기본값 사용 - next build)
Output Directory: (기본값 사용 - .next)
Install Command: (기본값 사용 - npm install)
```

### 4-3. 환경 변수 추가 (중요!)

**Environment Variables** 섹션에서:

```
Name: NEXT_PUBLIC_KAKAO_API_KEY
Value: your_kakao_javascript_key_here
```

**다른 환경 변수가 있다면 모두 추가:**
```
KV_REST_API_URL=your_kv_url (선택사항)
KV_REST_API_TOKEN=your_kv_token (선택사항)
```

### 4-4. 배포 시작

1. "Deploy" 버튼 클릭
2. 배포 진행 상황 모니터링
3. 성공하면 축하 메시지와 함께 배포 URL 표시
   ```
   예: https://playstyle-profiler.vercel.app
   ```

---

## 5. 환경 변수 설정

### 5-1. 배포 후 환경 변수 추가/수정

배포 후에도 환경 변수를 추가하거나 수정할 수 있습니다:

1. Vercel 프로젝트 대시보드
2. "Settings" 탭
3. "Environment Variables" 메뉴
4. 환경 변수 추가/수정
5. 적용할 환경 선택:
   - **Production**: 프로덕션 배포
   - **Preview**: PR 및 브랜치 배포
   - **Development**: 로컬 개발 (vercel dev)

### 5-2. 환경 변수 변경 후

환경 변수를 변경한 후에는:
1. "Redeploy" 버튼 클릭
2. 또는 새로운 커밋을 푸시

---

## 6. 자동 배포 확인

### 6-1. 자동 배포 테스트

**간단한 변경 사항 만들기:**

```bash
# 1. 파일 수정 (예: README.md)
echo "# Playstyle Profiler" > README.md

# 2. 커밋
git add README.md
git commit -m "docs: README 업데이트"

# 3. 푸시
git push
```

### 6-2. Vercel에서 확인

1. Vercel 대시보드 확인
2. 자동으로 새 배포가 시작됨
3. 배포 로그 실시간 확인 가능
4. 배포 완료 후 자동으로 URL 업데이트

### 6-3. 배포 프로세스

```
Git Push
   ↓
GitHub 저장소 업데이트
   ↓
Vercel Webhook 트리거
   ↓
자동 빌드 시작
   ↓
빌드 성공
   ↓
자동 배포
   ↓
배포 완료 (URL 업데이트)
```

**배포 시간:** 보통 1-3분 소요

---

## 7. 커스텀 도메인 설정 (선택)

### 7-1. 도메인 연결

1. Vercel 프로젝트 → "Settings" → "Domains"
2. "Add" 버튼 클릭
3. 도메인 입력 (예: `playstyle.yourdomain.com`)
4. Vercel이 제공하는 DNS 설정 복사

### 7-2. DNS 설정

**A 레코드 방식:**
```
Type: A
Name: @ (또는 서브도메인)
Value: 76.76.21.21
```

**CNAME 방식:**
```
Type: CNAME
Name: www (또는 서브도메인)
Value: cname.vercel-dns.com
```

### 7-3. SSL 인증서

Vercel이 자동으로 Let's Encrypt SSL 인증서 발급
- HTTPS 자동 지원
- 무료
- 자동 갱신

---

## 8. 추가 설정

### 8-1. 브랜치 배포

**Preview 배포:**
- `main` 외의 브랜치 푸시 시 자동 Preview URL 생성
- PR 생성 시 자동으로 Preview 댓글 추가

**예시:**
```bash
# 새 브랜치 생성
git checkout -b feature/new-feature

# 변경 사항 커밋
git add .
git commit -m "feat: 새로운 기능"

# 푸시
git push origin feature/new-feature

# → Vercel이 자동으로 Preview URL 생성
# 예: https://playstyle-profiler-git-feature-new-feature-username.vercel.app
```

### 8-2. Kakao Developers 도메인 등록

배포 후 Kakao Developers에 프로덕션 도메인 추가:

1. [Kakao Developers](https://developers.kakao.com)
2. 앱 선택 → "플랫폼"
3. 웹 플랫폼에 Vercel URL 추가:
   ```
   https://playstyle-profiler.vercel.app
   ```

### 8-3. 빌드 최적화

**vercel.json** (선택사항):
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["icn1"]
}
```

---

## 9. 배포 체크리스트

### 배포 전
- [ ] `.env.local` 파일이 `.gitignore`에 포함됨
- [ ] 모든 변경사항 커밋
- [ ] GitHub에 푸시

### Vercel 설정
- [ ] GitHub 계정으로 Vercel 가입
- [ ] 저장소 Import
- [ ] 환경 변수 설정 (`NEXT_PUBLIC_KAKAO_API_KEY`)
- [ ] 첫 배포 성공

### 배포 후
- [ ] 배포된 사이트 접속 확인
- [ ] 환경 변수 적용 확인
- [ ] 퀴즈 기능 테스트
- [ ] 공유 기능 테스트 (특히 카카오톡)
- [ ] Kakao Developers에 도메인 추가
- [ ] 모바일에서 테스트

### 자동 배포 확인
- [ ] 새 커밋 푸시
- [ ] Vercel에서 자동 배포 시작 확인
- [ ] 배포 완료 후 사이트 업데이트 확인

---

## 10. 문제 해결

### ❌ 빌드 실패

**원인:** TypeScript 오류, 의존성 문제 등

**해결:**
```bash
# 로컬에서 빌드 테스트
npm run build

# 빌드 성공하면 푸시
git push
```

### ❌ 환경 변수가 작동하지 않음

**확인 사항:**
1. `NEXT_PUBLIC_` 접두사 확인
2. Vercel에서 환경 변수 설정 확인
3. 환경 변수 변경 후 재배포

### ❌ 카카오톡 공유가 작동하지 않음

**해결:**
1. Kakao Developers에 Vercel 도메인 추가
2. `https://your-app.vercel.app` 정확히 입력
3. 환경 변수 `NEXT_PUBLIC_KAKAO_API_KEY` 확인

### ❌ GitHub 연결 오류

**해결:**
```bash
# 원격 저장소 URL 확인
git remote -v

# 잘못되었다면 변경
git remote set-url origin https://github.com/username/repo.git
```

---

## 11. 유용한 명령어

### Git
```bash
# 상태 확인
git status

# 변경사항 확인
git diff

# 커밋 히스토리
git log --oneline

# 브랜치 확인
git branch

# 마지막 커밋 수정
git commit --amend
```

### Vercel CLI (선택사항)
```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 로컬에서 배포
vercel

# 프로덕션 배포
vercel --prod

# 로그 확인
vercel logs
```

---

## 12. 다음 단계

배포 완료 후:
- [ ] Analytics 설정 (Vercel Analytics)
- [ ] 성능 모니터링
- [ ] SEO 최적화
- [ ] Open Graph 이미지 추가
- [ ] 사용자 피드백 수집

---

## 📚 참고 자료

- [Vercel 공식 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [GitHub 기본 가이드](https://docs.github.com/en/get-started)
- [Git 명령어 치트시트](https://education.github.com/git-cheat-sheet-education.pdf)

---

## 🎉 완료!

이제 Git에 푸시할 때마다 Vercel에 자동으로 배포됩니다!

```bash
git add .
git commit -m "feat: 새로운 기능"
git push
# → Vercel이 자동으로 배포 시작! 🚀
```
