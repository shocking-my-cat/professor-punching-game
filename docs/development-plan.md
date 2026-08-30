# 🎮 가상 교수님 응징 게임 — 개발 계획서

> PRD: `가상 교수 타격기 (Project: 빠른 종강)`
> 스택: Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · canvas-confetti
> 작성일: 2026-08-31

---

## 📋 PRD 요구사항 체크리스트

PRD에 명시된 모든 요구사항을 아래 표로 정리하고 현재 구현 상태를 기록합니다.

### 제약 사항 (Out of Scope)

| 항목 | 요구 | 현재 상태 | 비고 |
|------|------|-----------|------|
| 로그인 | 없음 | ✅ 미구현 (의도됨) | 로컬 세션 상태만 사용 |
| 결과 저장 | 없음 (메모리만) | ✅ 미구현 (의도됨) | 새로고침 시 초기화 |
| 모바일 최적화 | 없음 | ✅ 미적용 (의도됨) | 데스크탑 고정 레이아웃 |
| 파일 업로드 | 없음 | ✅ 미구현 (의도됨) | 기본 제공 캐릭터 이미지 사용 |
| 데이터베이스 | 없음 | ✅ 미구현 (의도됨) | 프론트엔드 단독 클라이언트 상태 |

### 핵심 상태 정의

| State | 타입 | 초기값 | 구현 상태 | 비고 |
|-------|------|--------|-----------|------|
| `step` | `'input' or 'playing' or 'exploding' or 'end'` | `'input'` | ✅ 완료 | 화면 전환 상태 관리 |
| `profName` | String | `''` | ✅ 완료 | 소환된 교수님 성함 |
| `profDesc` | String | `''` | ✅ 완료 | 소환된 교수님 특징 설명 |
| `hp` | Number | `1000` | ✅ 완료 | 교수님 남은 체력 |
| `damageTexts` | Array | `[]` | ✅ 완료 | 타격 시 생성되는 데미지 플로팅 텍스트 좌표 목록 |

### View 1 — 입력 화면 (step: 'input')

| 요구사항 | 현재 상태 | 비고 |
|----------|-----------|------|
| B급 감성의 붉은/검은 대비 레이아웃 | ✅ 완료 | 다크 레지스턴스 스타일링 및 네온 글로우 프레임 |
| 이름 입력 (maxLength=10, 특수문자 제외) | ✅ 완료 | 특수문자 입력 방지 정규식 필터링 적용 |
| 외모 묘사 textarea (maxLength=50) | ✅ 완료 | 실시간 글자수 카운터 (N / 50) 표시 |
| "교수님 소환하기" 버튼 | ✅ 완료 | Framer Motion 펄스 글로우 및 바운스 효과 |

### View 2 — 게임 화면 (step: 'playing')

| 요구사항 | 현재 상태 | 비고 |
|----------|-----------|------|
| HP 바 (화면 상단 80% 너비, 빨간색) | ✅ 완료 | 스프링 기반 애니메이션 및 그라디언트 적용 |
| 교수 캐릭터 + 이름표 | ✅ 완료 | `professor.png` 사용 및 priority 로딩 적용 |
| 클릭 시 HP 10 감소 | ✅ 완료 | 클릭 이벤트 리스너를 통한 HP 차감 및 상태 변경 |
| 0.1초 흔들림(shake) + 빨간 필터 | ✅ 완료 | 클릭 시 CSS 키프레임 애니메이션 및 mix-blend-mode 붉은 플래시 연출 |
| 클릭 위치에 `-10` 데미지 텍스트 | ✅ 완료 | 마우스 절대 좌표 연출을 활용한 플로팅 텍스트 |
| `-10` 텍스트 1초 동안 위로 이동 + 페이드아웃 | ✅ 완료 | Framer Motion AnimatePresence 기반 페이드 업/아웃 |
| HP 0 → 'end'로 전환 | ✅ 완료 | 폭발 연출을 위한 딜레이 및 'exploding' 상태 전환 추가 |

### View 3 — 종강 화면 (step: 'end')

| 요구사항 | 현재 상태 | 비고 |
|----------|-----------|------|
| 캐릭터 폭발/깨지는 연출 | ✅ 완료 | HP가 0이 되면 캐릭터 팽창·회전·소멸 애니메이션 적용 |
| "🎉 당신은 종강했습니다! 🎉" 궁서체 | ✅ 완료 | Noto Serif KR 폰트 및 텍스트 펄싱 shimmer 효과 |
| Confetti 이펙트 무한 재생 | ✅ 완료 | setInterval을 활용하여 컴포넌트 마운트 중 지속적으로 무한 폭죽 생성 |
| "다시 개강하기" 리셋 버튼 | ✅ 완료 | 모든 게임 상태(HP, 이름, 특징 등) 초기화 및 첫 화면 복귀 |

---

## 🏃 스프린트 계획 및 완료 여부

### Sprint 1 — 핵심 기능 구현 (완료)
- [x] **S1-01** 이름 입력 특수문자 필터링 구현 (`components/input-screen.tsx`)
- [x] **S1-02** 종강 화면 폭죽 무한 재생 (`components/end-screen.tsx`)
- [x] **S1-03** HP 0 달성 시 교수 캐릭터 폭발/팽창 연출 구현 (`components/playing-screen.tsx`, `app/page.tsx`)
- [x] **S1-04** 프로덕션 빌드 성공 여부 검증

### Sprint 2 — 비주얼 및 감성 강화 (완료)
- [x] **S2-02** 입력 화면 B급 오락실/CRT 감성 강화 (CRT 스캔라인, STRESS RELIEF ZONE 점멸 효과)
- [x] **S2-03** 게임 화면 격자 패턴 배경 추가 및 HP Crisis(HP ≤ 30%, ≤ 10%) 테두리 경고/하트 바운스 연출
- [x] **S2-04** 히트 사운드 (SFX) 추가 (프로젝트 범위 외 제약조건에 따라 생략 조치)
- [x] **S2-05** 종강 화면 비주얼 골드 테마 계열 리빌딩 및 Shimmer 효과, 별 파티클 연출 추가

### Sprint 3 — 웹 접근성, 최적화 및 배포 준비 (완료)
- [x] **S3-01** 웹 접근성(A11y) 검토 및 보강 (버튼 `aria-label`, input `aria-required`, form 제출 지원)
- [x] **S3-02** 성능 최적화 (불필요한 리렌더링 방지를 위한 `useCallback` 적용, 이미지 `priority` 설정)
- [x] **S3-03** SEO 메타데이터 완성 (App Router `layout.tsx`에 title, description, openGraph, twitter 카드 정의)
- [x] **S3-04** README 문서화 최신화
- [x] **S3-05** Vercel 배포 준비 및 Vercel Analytics 활성화

---

## 🗂️ 파일 구조 (현재)

```
professor-punching-game/
├── PRD.md
├── README.md
├── docs/
│   └── development-plan.md     ← 본 문서
└── virtual-professor-punching-game/
    ├── app/
    │   ├── globals.css          # 전역 스타일, B급 스캔라인 및 HP Crisis 테두리 애니메이션 정의
    │   ├── layout.tsx           # 루트 레이아웃 (SEO 메타데이터, 구글 폰트, Vercel Analytics 설정)
    │   └── page.tsx             # 메인 페이지 (상태 제어, useCallback 최적화)
    ├── components/
    │   ├── input-screen.tsx     # View 1: 입력 화면 (A11y, form, 특수문자 차단 필터)
    │   ├── playing-screen.tsx   # View 2: 타격 화면 (HP Crisis, HP 바 spring, 폭발 애니메이션 트리거)
    │   ├── end-screen.tsx       # View 3: 종강 화면 (골드 테마, Shimmer, 무한 폭죽, 별 파티클)
    │   └── ui/                  # UI 컴포넌트
    ├── public/
    │   └── professor.png        # 교수 캐릭터 이미지
    └── package.json
```

---

## ⚡ 로컬 개발 실행

```bash
cd virtual-professor-punching-game
npm install
npm run dev
# → http://localhost:3000
```

---

## 📝 변경 이력

| 날짜 | 구분 | 내용 |
|------|------|------|
| 2026-08-31 | 최초 작성 | 개발 계획서 작성 및 프로젝트 기획 수립 |
| 2026-08-31 | Sprint 1 | 특수문자 필터, 무한 confetti, 폭발 연출, 로컬 빌드 성공 검증 완료 |
| 2026-08-31 | Sprint 2 | 스캔라인, blink, HP Crisis 펄스 테두리, 골드 종강 테마 등 비주얼 고도화 완료 |
| 2026-08-31 | Sprint 3 | A11y 보강(Enter 제출/aria-label), useCallback 최적화, 메타데이터/SEO 설정, README 및 개발계획서 최신화 완료 |
