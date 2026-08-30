# 🎮 개강뻐ㅋ킹웹사이트 — 개발 계획서

> PRD: `가상 교수 타격기 (Project: 빠른 종강)`
> 스택: Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · canvas-confetti
> 작성일: 2026-08-31

---

## 📋 PRD 요구사항 체크리스트

PRD에 명시된 모든 요구사항을 아래 표로 정리하고 현재 구현 상태를 기록합니다.

### 제약 사항 (Out of Scope)

| 항목 | 요구 | 현재 상태 |
|------|------|-----------|
| 로그인 | 없음 | ✅ 미구현 |
| 결과 저장 | 없음 (메모리만) | ✅ 미구현 |
| 모바일 최적화 | 없음 | ✅ 미적용 |
| 파일 업로드 | 없음 | ✅ 미구현 |
| 데이터베이스 | 없음 | ✅ 미구현 |

### 핵심 상태 정의

| State | 타입 | 초기값 | 구현 상태 |
|-------|------|--------|-----------|
| `step` | `'input' or 'playing' or 'end'` | `'input'` | ✅ 완료 |
| `profName` | String | `''` | ✅ 완료 |
| `profDesc` | String | `''` | ✅ 완료 |
| `hp` | Number | `1000` | ✅ 완료 |
| `clicks` (damageTexts) | Array | `[]` | ✅ 완료 |

### View 1 — 입력 화면 (step: 'input')

| 요구사항 | 현재 상태 | 비고 |
|----------|-----------|------|
| B급 감성의 붉은/검은 대비 레이아웃 | ✅ 완료 | 다크 붉은 팔레트 적용 |
| 이름 입력 (maxLength=10, 특수문자 제외) | ⚠️ 부분 | maxLength는 OK, 특수문자 필터 미구현 |
| 외모 묘사 textarea (maxLength=50) | ✅ 완료 | 글자수 카운터 포함 |
| "교수님 소환하기" 버튼 | ✅ 완료 | Framer Motion 펄스 효과 |

### View 2 — 게임 화면 (step: 'playing')

| 요구사항 | 현재 상태 | 비고 |
|----------|-----------|------|
| HP 바 (화면 상단 80% 너비, 빨간색) | ✅ 완료 | 그라디언트 + spring 애니메이션 |
| 교수 캐릭터 + 이름표 | ✅ 완료 | professor.png 사용 |
| 클릭 시 HP 10 감소 | ✅ 완료 | — |
| 0.1초 흔들림(shake) + 빨간 필터 | ✅ 완료 | CSS 키프레임 + AnimatePresence |
| 클릭 위치에 `-10` 데미지 텍스트 | ✅ 완료 | 좌표 추출 후 Float 표시 |
| `-10` 텍스트 1초 동안 위로 이동 + 페이드아웃 | ✅ 완료 | Framer Motion |
| HP 0 → 'end'로 전환 | ✅ 완료 | 120ms 딜레이 후 전환 |

### View 3 — 종강 화면 (step: 'end')

| 요구사항 | 현재 상태 | 비고 |
|----------|-----------|------|
| 캐릭터 폭발/깨지는 연출 | ❌ 미구현 | end로 즉시 전환, 폭발 없음 |
| "🎉 당신은 종강했습니다! 🎉" 궁서체 | ✅ 완료 | Noto Serif KR 적용 |
| Confetti 이펙트 무한 재생 | ⚠️ 부분 | 3초 후 종료됨 (무한X) |
| "다시 개강하기" 리셋 버튼 | ✅ 완료 | — |

---

## 🏃 스프린트 계획

총 **3개 스프린트**로 나누어 진행합니다.
각 스프린트는 1일 분량(약 2~4시간)을 기준으로 합니다.

---

### Sprint 1 — PRD 미구현 버그 수정 & 입력 유효성 강화

> **목표:** PRD에서 요구하지만 아직 구현되지 않은 핵심 기능 보완

#### 작업 목록

- [x] **S1-01** 이름 입력 특수문자 필터링 구현
  - `onChange` 핸들러에서 정규식 `/[^가-힣a-zA-Z0-9\s]/g` 로 제거
  - 파일: `components/input-screen.tsx`

- [x] **S1-02** Confetti 무한 재생으로 변경
  - `duration` 상한 제거, `interval`을 컴포넌트 언마운트 시까지 유지
  - 파일: `components/end-screen.tsx`

- [x] **S1-03** 종강 화면 진입 시 "교수 폭발" 전환 연출 구현
  - `'exploding'` 중간 상태 추가 (120ms 후 exploding → 950ms 후 end)
  - 캐릭터: scale [1→1.35→1.6] + rotate [-8°→12°] + opacity 0 (0.75s)
  - 파일: `components/playing-screen.tsx`, `app/page.tsx`

- [x] **S1-04** 빌드 검증
  - `npm run build` 성공 (타입 오류 0, 경고 0)

#### 완료 기준 (DoD)
- PRD 체크리스트의 모든 ⚠️ 항목이 ✅ 로 변경
- `pnpm build` 성공

---

### Sprint 2 — 비주얼 폴리싱 & B급 감성 강화

> **목표:** "와" 소리 나는 첫인상 — 디자인 완성도 극대화

#### 작업 목록

- [ ] **S2-01** 교수 캐릭터 이미지 개선
  - 현재 `professor.png`는 단일 이미지 — 외모 묘사(`profDesc`)에 따라 변화하는 로직 추가 (룩업 테이블 또는 랜덤 아바타 세트)
  - 추가 교수 캐릭터 에셋 4~6종 생성 (AI 이미지 생성 활용)
  - 파일: `public/`, `components/playing-screen.tsx`

- [ ] **S2-02** 입력 화면 B급 감성 강화
  - 배경에 미세한 노이즈 텍스처 또는 스캔라인 CSS 오버레이 추가
  - 헤더 "STRESS RELIEF ZONE" 텍스트 깜박임(blink) 효과
  - 파일: `app/globals.css`, `components/input-screen.tsx`

- [ ] **S2-03** 게임 화면 분위기 강화
  - 배경에 낮은 투명도의 반복 패턴(격자 or 붉은 빗금) 추가
  - HP가 30% 이하일 때 HP 바 색상 변화 + 화면 테두리 경고 펄스
  - 파일: `app/globals.css`, `components/playing-screen.tsx`

- [ ] **S2-04** 히트 사운드 (SFX) 추가 *(선택)*
  - 클릭 시 짧은 타격음 재생 (`new Audio()` 또는 Web Audio API)
  - `public/sfx/hit.mp3` 에셋 추가
  - 파일: `components/playing-screen.tsx`

- [ ] **S2-05** 종강 화면 비주얼 강화
  - "종강!" 텍스트 등장 후 폭죽 burst 효과 추가 (confetti 타이밍 동기화)
  - 배경 색상을 어두운 톤에서 밝은 노란/금색 계열로 전환
  - 파일: `components/end-screen.tsx`

#### 완료 기준 (DoD)
- 각 화면 캡처 or 녹화 영상으로 비주얼 품질 확인
- 반응형이 아닌 데스크탑 고정 레이아웃 유지 (PRD 제약)

---

### Sprint 3 — 퀄리티 보장 & 배포 준비

> **목표:** 안정성 검증 및 프로덕션 배포

#### 작업 목록

- [ ] **S3-01** 접근성(A11y) 기본 검토
  - 버튼 `aria-label` 적절한지 확인
  - 키보드로 입력→소환 가능한지 확인 (Enter 키 제출)
  - 파일: `components/input-screen.tsx`

- [ ] **S3-02** 성능 최적화
  - `professor.png` (800KB) 최적화 → WebP 변환 또는 `next/image` 최적화 설정 확인
  - 불필요한 re-render 방지 (`useCallback` 적용)
  - 파일: `app/page.tsx`, `components/playing-screen.tsx`

- [ ] **S3-03** SEO / 메타데이터 완성
  - `app/layout.tsx`에 `title`, `description`, `og:image` 적절히 설정
  - 파일: `app/layout.tsx`

- [ ] **S3-04** README 업데이트
  - 프로젝트 소개, 로컬 실행 방법, 스크린샷 추가
  - 파일: `README.md`

- [ ] **S3-05** Vercel 배포
  - `@vercel/analytics` 이미 의존성 포함 → Analytics 활성화 확인
  - `vercel --prod` 또는 GitHub 연동 자동 배포

#### 완료 기준 (DoD)
- `pnpm build` + `pnpm start`로 프로덕션 모드 로컬 정상 동작
- Vercel 배포 URL 접속 확인

---

## 🗂️ 파일 구조 (현재)

`
professor-punching-game/
├── PRD.md
├── README.md
├── docs/
│   └── development-plan.md     ← 이 파일
└── virtual-professor-punching-game/
    ├── app/
    │   ├── globals.css          # 전역 스타일, 색상 토큰, 커스텀 애니메이션
    │   ├── layout.tsx           # 루트 레이아웃 (폰트, 메타데이터)
    │   └── page.tsx             # 메인 페이지 (상태 관리 허브)
    ├── components/
    │   ├── input-screen.tsx     # View 1: 이름/외모 입력
    │   ├── playing-screen.tsx   # View 2: 타격 게임
    │   ├── end-screen.tsx       # View 3: 종강 화면
    │   └── ui/                  # shadcn/ui 컴포넌트
    ├── lib/
    ├── public/
    │   └── professor.png        # 교수 캐릭터 이미지 (800KB)
    └── package.json
`

---

## ⚡ 로컬 개발 실행

`ash
cd virtual-professor-punching-game
pnpm install
pnpm dev
# → http://localhost:3000
`

---

## 📝 변경 이력

| 날짜 | 스프린트 | 내용 |
|------|----------|------|
| 2026-08-31 | — | 개발 계획서 최초 작성 |
| 2026-08-31 | Sprint 1 | ✅ 완료: 특수문자 필터, confetti 무한재생, 교수 폭발 연출, 빌드 검증 |
