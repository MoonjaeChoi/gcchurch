# 과천교회 사역 블로그

과천교회 남선교회협의회, 안수집사회, 청년부의 활동을 기록하고 관리하는 웹사이트입니다.

## 주요 기능

### 📊 부서별 대시보드
- **남선교회협의회**, **안수집사회**, **청년부** 3개 부서의 독립적인 대시보드
- 출석률, 예산 집행 현황, 행사 기록 등 주요 지표 시각화
- 월별 출석 추이 및 예산 집행 차트 (Recharts)

### 📝 블로그 시스템
- 마크다운 기반 포스트 작성
- 부서별, 태그별 분류
- 풍부한 메타데이터 (참석 인원, 예산 등)

### 📈 데이터 시각화
- 출석 추이 차트
- 예산 집행 현황 차트
- 부서별 통계

### 🎨 UI/UX
- shadcn/ui 컴포넌트 사용
- 반응형 디자인
- 다크모드 지원

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Markdown**: gray-matter, remark
- **Deployment**: GitHub Pages

## 프로젝트 구조

```
gcchurch/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 배포 설정
├── content/
│   └── posts/                  # 마크다운 블로그 포스트
├── src/
│   ├── app/                    # Next.js App Router 페이지
│   │   ├── departments/[id]/   # 부서별 페이지
│   │   ├── blog/               # 블로그 목록 및 상세
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/             # React 컴포넌트
│   │   ├── ui/                 # shadcn/ui 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── AttendanceChart.tsx
│   │   └── BudgetChart.tsx
│   ├── data/                   # JSON 데이터 파일
│   │   ├── departments.json
│   │   ├── events.json
│   │   ├── attendance.json
│   │   └── budget.json
│   ├── lib/                    # 유틸리티 함수
│   │   ├── data.ts
│   │   ├── posts.ts
│   │   └── utils.ts
│   └── types/                  # TypeScript 타입 정의
│       └── index.ts
├── next.config.js
├── tailwind.config.ts
└── package.json
```

## 로컬 개발

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 빌드

```bash
npm run build
```

정적 파일이 `out/` 디렉토리에 생성됩니다.

## 데이터 관리

### 블로그 포스트 작성

`content/posts/` 디렉토리에 마크다운 파일을 추가하세요.

**파일명 형식**: `YYYY-MM-DD-title.md`

**예시**:
```markdown
---
title: "청년부 겨울 수련회"
date: "2025-01-19"
department: "youth"
tags: ["수련회", "친교"]
excerpt: "2박 3일간 강원도 평창에서 수련회를 진행했습니다."
attendees: 28
budget: 1500000
---

# 청년부 겨울 수련회

본문 내용...
```

### 데이터 추가/수정

JSON 파일을 직접 수정하거나 GitHub 웹 에디터를 사용하세요:

- **부서 정보**: `src/data/departments.json`
- **행사**: `src/data/events.json`
- **출석**: `src/data/attendance.json`
- **예산**: `src/data/budget.json`

## GitHub Pages 배포

### 초기 설정

1. GitHub 저장소 Settings > Pages로 이동
2. Source를 "GitHub Actions"로 설정
3. `main` 브랜치에 푸시하면 자동 배포

### 커스텀 도메인 (선택)

1. Settings > Pages > Custom domain에 도메인 입력
2. DNS 설정 (CNAME 레코드)

### 배포 확인

GitHub Actions 탭에서 배포 진행 상황 확인 가능

## 부서 ID

- **남선교회협의회**: `men-mission`
- **안수집사회**: `deacons`
- **청년부**: `youth`

## 라이선스

이 프로젝트는 과천교회 내부 사용을 위한 것입니다.

## 문의

프로젝트 관련 문의사항은 Issues를 통해 남겨주세요.
