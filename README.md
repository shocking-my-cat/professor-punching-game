# 👊 가상 교수님 응징 게임 (Virtual Professor Punching Game)

대학생들의 학업 스트레스 해소를 위해 제작된 **B급 감성 웹 클릭 게임**입니다.  
원하는 교수님의 성함과 특징을 입력하여 가상으로 소환하고, 클릭하여 HP를 0으로 깎아 "종강"을 맞이해 보세요!

---

## ✨ 주요 기능 및 비주얼 연출

1. **소환 입력 (Input Screen)**
   - 교수님 성함 입력 필터링 (한글, 영문, 숫자, 공백 허용 / 특수문자 자동 제거)
   - B급 오락실 감성의 CRT 스캔라인 오버레이 & 네온 글로우 스타일링
   - 키보드 Enter 키 제출 및 웹 접근성(A11y) 지원

2. **응징 클릭 (Playing Screen)**
   - 타격 시 캐릭터 쉐이크 애니메이션 및 데미지 플로팅 텍스트 (`-10`)
   - **HP 위기 연출 (HP Crisis Feedback)**
     - HP ≤ 30%: 화면 테두리 붉은 펄스 효과 & HP 바 색상 오렌지 변환
     - HP ≤ 10%: HP 바 진붉은색 변환 & 하트 아이콘 바운스
   - **HP 0 폭발 연출**: HP가 0이 되면 캐릭터가 커지면서 회전·폭발 효과 후 종강 화면으로 전환

3. **종강 축하 (End Screen)**
   - 럭셔리 골드 테마 배경 및 텍스트 shimmer 효과
   - 무한 폭축(Canvas Confetti) 및 반짝이는 별 파티클 연출
   - '다시 개강하기' 버튼으로 리셋 가능

---

## 🛠️ 기술 스택 (Tech Stack)

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Vanilla CSS Animation Tokens
- **Animation**: Framer Motion, Canvas Confetti
- **Analytics & Deployment**: Vercel Analytics, Vercel

---

## 🚀 로컬 실행 방법 (Local Development)

```bash
# 1. 저장소 클론
git clone https://github.com/shocking-my-cat/professor-punching-game.git
cd professor-punching-game/virtual-professor-punching-game

# 2. 패키지 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:3000` 으로 접속하여 실행 결과를 확인합니다.

---

## 📦 프로덕션 빌드 (Production Build)

```bash
npm run build
npm run start
```

---

## 📄 개발 관리 문서

개발 일정 및 스프린트 계획은 [`docs/development-plan.md`](./docs/development-plan.md) 파일에서 관리됩니다.
