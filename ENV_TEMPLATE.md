# 🔐 .env.local 파일 생성 가이드

## 빠른 시작

### 1. 파일 생성

프로젝트 루트 디렉토리에 `.env.local` 파일을 만드세요:

```
playstyle-profiler/
├── src/
├── public/
├── .env.local          ← 여기에 생성!
├── package.json
└── ...
```

### 2. 내용 복사

`.env.local` 파일을 열고 아래 내용을 **그대로 복사**하세요:

```env
# Firebase 설정
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Firebase 설정 값으로 교체

#### 3-1. Firebase Console 접속
1. https://console.firebase.google.com/ 접속
2. 프로젝트 선택 (없으면 "프로젝트 추가" 클릭)

#### 3-2. 설정 복사
1. ⚙️ 프로젝트 설정 클릭 (왼쪽 상단)
2. "일반" 탭 선택
3. 아래로 스크롤하여 "내 앱" 섹션
4. 웹 앱이 없다면 "</>" 아이콘 클릭하여 추가
5. "SDK 설정 및 구성" 선택
6. 다음과 같은 설정이 표시됨:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",                           // ← 이 값을 복사
  authDomain: "playstyle-profiler.firebaseapp.com",
  projectId: "playstyle-profiler",
  storageBucket: "playstyle-profiler.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
  measurementId: "G-ABC123XYZ"
};
```

#### 3-3. .env.local에 붙여넣기

위에서 복사한 값들을 `.env.local`에 붙여넣으세요:

```env
# Firebase 설정
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...                           # apiKey 값
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=playstyle-profiler.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=playstyle-profiler
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=playstyle-profiler.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ABC123XYZ
```

### 4. 서버 재시작

**중요!** 환경 변수를 변경하면 반드시 서버를 재시작해야 합니다:

```bash
# Ctrl + C로 현재 서버 종료
# 그리고 다시 실행
npm run dev
```

### 5. 확인

브라우저에서 다음 주소로 이동:

```
http://localhost:3000/test-firebase
```

페이지 상단에 **"✅ Firebase 설정 완료"** 메시지가 표시되면 성공! 🎉

---

## 💡 팁

### Windows에서 파일 생성하기

#### 방법 1: VS Code
1. VS Code에서 프로젝트 열기
2. 탐색기에서 루트 디렉토리 우클릭
3. "새 파일" 클릭
4. `.env.local` 입력

#### 방법 2: 메모장
1. 메모장 열기
2. 내용 붙여넣기
3. "다른 이름으로 저장"
4. 파일 이름: `.env.local`
5. 파일 형식: "모든 파일"
6. 인코딩: UTF-8
7. 프로젝트 루트 디렉토리에 저장

#### 방법 3: 터미널 (PowerShell)
```powershell
# 프로젝트 루트에서
New-Item -Path .env.local -ItemType File
```

### 주의사항

⚠️ **절대로 Git에 커밋하지 마세요!**
- `.env.local` 파일은 `.gitignore`에 포함되어 있습니다
- API 키는 민감한 정보입니다
- 공개 저장소에 올리면 보안 위험!

✅ **제대로 설정되었는지 확인:**
- 파일 이름: `.env.local` (정확히 이 이름)
- 위치: 프로젝트 루트 디렉토리
- 모든 변수가 `NEXT_PUBLIC_`로 시작
- `=` 양쪽에 공백 없음
- 따옴표 없음

---

## 🆘 문제 해결

### "Firebase 설정 오류" 메시지가 뜬다면?

1. **파일 위치 확인**
   ```
   C:\workspace\playstyle-profiler\.env.local  ✅ 올바름
   C:\workspace\playstyle-profiler\src\.env.local  ❌ 잘못됨
   ```

2. **파일 이름 확인**
   ```
   .env.local      ✅ 올바름
   .env            ❌ 잘못됨
   env.local       ❌ 잘못됨
   .env.local.txt  ❌ 잘못됨
   ```

3. **서버 재시작 확인**
   - 환경 변수를 변경하면 반드시 재시작!
   - `Ctrl + C` → `npm run dev`

4. **값 확인**
   - `your-api-key-here` 같은 placeholder가 남아있지 않은지
   - Firebase Console에서 복사한 실제 값으로 교체했는지

---

## 📚 다음 단계

✅ `.env.local` 파일 생성 완료!

이제 다음 문서들을 참고하세요:
- `FIREBASE_USAGE.md` - 사용 방법 및 예시
- `FIREBASE_SETUP.md` - 상세한 Firebase 설정 가이드

테스트 페이지에서 확인:
```
http://localhost:3000/test-firebase
```

