# 배움여권 프로젝트 컨텍스트 복구 보고서

작성 목적: 이 문서는 새로운 Codex 세션이나 다른 PC에서 `baeum_passport` 프로젝트 작업을 이어가기 위한 최신 컨텍스트 복구 문서다.  
작성 기준: 현재 파일 시스템의 실제 구현 상태를 기준으로 정리했다. 기존 `docs/PROJECT_ANALYSIS_REPORT.md`는 오래된 문서이며 일부 인코딩이 깨져 있어 최신 기준 문서로 사용하기 어렵다.

## 1. 프로젝트 개요

### 프로젝트 목적

배움여권은 학생이 세계 여러 나라를 여행하듯 학습하는 교육용 웹 애플리케이션이다. 사용자는 여권을 발급받고, 세계지도에서 대륙과 대표 국가를 탐색하며, 입국 심사, 학습지, 사증 수집 흐름을 경험한다.

### 프로젝트 컨셉

- 실제 여권을 모티브로 한 UI.
- 네이비 + 골드 색상 중심의 배움여권 테마.
- 로그인/회원가입 화면의 펼쳐진 여권 디자인을 핵심 공통 디자인 기준으로 사용.
- 세계 여행 여권 안에서 지도, 국가 정보, 입국 심사, 학습지, 사증을 순차적으로 경험하는 구조.
- `/worldmap`은 현재 가장 많이 리디자인된 페이지이며, 펼쳐진 여권 구조와 책갈피 네비게이션을 사용한다.

### 사용 기술 스택

- Frontend: Next.js 14 App Router
- UI: React 18, TypeScript, Tailwind CSS
- Icons: lucide-react
- State persistence: browser `localStorage`
- Image handling: Next Image
- Static assets:
  - `frontend/public/images/world_map.png`
  - `frontend/public/images/asia.png`
  - `frontend/public/images/europe.png`
  - `frontend/public/images/africa.png`
  - `frontend/public/images/north_america.png`
  - `frontend/public/images/south_america.png`
  - `frontend/public/images/oseania.png`
- Remote image domain:
  - `flagcdn.com` is allowed in `frontend/next.config.mjs` for country flag images.

### 프로젝트 구조

```text
C:\Project\baeum_passport
├─ backend/
│  └─ README.md
├─ docs/
│  ├─ ASSET_ATTRIBUTIONS.md
│  ├─ PROJECT_ANALYSIS_REPORT.md
│  ├─ PROJECT_CONTEXT_RESTORE_REPORT.md
│  └─ test.txt
└─ frontend/
   ├─ public/images/
   ├─ src/app/
   ├─ src/components/
   ├─ src/lib/
   ├─ package.json
   ├─ next.config.mjs
   ├─ tailwind.config.ts
   └─ tsconfig.json
```

### 현재 저장소 상태

- 이 문서 작성 직전 `git status --short` 결과는 비어 있었음.
- 기존 문서 `docs/PROJECT_ANALYSIS_REPORT.md`는 보존.
- 새 문서 파일은 `docs/PROJECT_CONTEXT_RESTORE_REPORT.md`.

## 2. 현재 구현된 페이지

### 메인

- Route: `/`
- File: `frontend/src/app/page.tsx`
- 주요 컴포넌트:
  - `PassportCover`
  - `PassportOpen`
- 구현된 기능:
  - 첫 화면에서 닫힌 여권 커버 표시.
  - 로그인/회원가입 선택 시 펼쳐진 여권 UI로 전환.
  - `PassportMode = "login" | "signup"` 상태로 로그인/회원가입 폼 전환.
  - 부드러운 전환 타이머 사용.
- 현재 UI 상태:
  - 여권 커버 + 펼쳐진 여권 디자인이 가장 안정적인 기준 UI.
  - 커버 하단의 `KOR/JPN/AUS VISA` 배지는 제거됨.
  - 커버 중앙 텍스트는 `배움여권` 위, `Learning Passport` 아래 구조이며 간격 조정됨.
- 완료도: 85%
- 수정 필요:
  - 일부 소스 출력에서 한글 인코딩이 깨져 보이는 문자열이 존재한다. 실제 화면 표시 여부 확인 필요.

### 로그인

- Route:
  - `/` 내부 펼쳐진 여권 로그인 폼
  - 별도 legacy route `/login`
- Files:
  - `frontend/src/components/passport/LoginForm.tsx`
  - `frontend/src/app/login/page.tsx`
- 구현된 기능:
  - ID/password 입력.
  - 실제 인증 검증 없이 `localStorage`에 user 저장.
  - 로그인 후 `/worldmap` 이동.
- 현재 UI 상태:
  - `/` 내부 로그인은 펼쳐진 여권 오른쪽 페이지에 표시.
  - `/login`은 별도 카드형 레이아웃이며 최신 공통 여권형 레이아웃은 아님.
- 완료도: 60%
- 수정 필요:
  - 실제 인증 없음.
  - `/login` legacy 페이지와 `/` 내부 로그인 UX 통합 필요.

### 회원가입

- Route:
  - `/` 내부 펼쳐진 여권 회원가입 폼
  - 별도 legacy route `/signup`
- Files:
  - `frontend/src/components/passport/SignupForm.tsx`
  - `frontend/src/app/signup/page.tsx`
- 구현된 기능:
  - 학년, 반, 번호, 성, 이름, 생년월일, 성별 입력.
  - `localStorage`에 user 저장.
  - `/` 내부 회원가입은 저장 후 `/worldmap` 이동.
  - legacy `/signup`은 저장 후 `/login` 이동.
- 현재 UI 상태:
  - `/` 내부 회원가입은 펼쳐진 여권 UI.
  - legacy `/signup`은 카드형 UI.
- 완료도: 65%
- 수정 필요:
  - 실제 계정 생성 API 없음.
  - 저장 데이터와 로그인 규칙 통일 필요.

### worldmap

- Route: `/worldmap`
- File: `frontend/src/app/worldmap/page.tsx`
- 주요 컴포넌트:
  - `WorldMapGraphic`
  - `PassportBookmarks`
  - `ContinentExplorer`
  - `CountryDetail`
  - `EmptyCountryState`
  - `InfoTile`
- 구현된 기능:
  - 펼쳐진 여권 UI로 표시.
  - 좌측 페이지:
    - 초기 상태: 태평양 중심 `world_map.png` 표시.
    - 대륙 선택 후: 대륙별 전용 이미지 표시.
    - 대륙 정보 표시: 인구, 면적, 국가 수.
    - 대표 국가 목록 및 국기 이미지 버튼 표시.
    - 대륙 상세 상태에서 `세계지도` 돌아가기 버튼 표시.
  - 우측 페이지:
    - 국가 선택 전: 안내 텍스트와 워터마크.
    - 대표 국가 선택 후: 국가명, 국기, 수도, 언어, 통화, 인구, 면적, 위치, 교육용 소개 표시.
    - 한국 선택 시 인구/면적 비교 문구 숨김.
    - 다른 국가 선택 시 `대한민국의 약 n배` 비교 문구 표시.
  - 책갈피 네비게이션:
    - 세계지도: `/worldmap`
    - 사증: `/stamp`
    - 학습지: 선택 국가 기준 `/workbook/[country]`
    - 여행정보: 선택 국가 기준 `/travel-info/[country]`
- 현재 UI 상태:
  - 가장 최신 요구사항이 반영된 페이지.
  - 기존 좌측 사이드바는 사용하지 않음.
  - 전체 세계지도 대륙 클릭 영역은 투명 SVG path로 동작.
  - 대륙명 라벨은 줄바꿈 방지 처리됨.
  - 대륙 선택 후 전용 대륙 PNG가 `object-contain`으로 표시됨.
  - 우측 하단의 `MAP / CONTINENT / FLAG / RECORD` 스탬프 4칸은 제거됨.
- 완료도: 80%
- 수정 필요:
  - 대표 국가를 대륙 이미지 위에 색상 표시하는 기능은 아직 계획 단계.
  - 대륙별 대표 국가 위치 오버레이 좌표 필요.
  - 모바일에서는 기존 CSS 규칙 때문에 좌측 페이지가 숨겨질 수 있어 worldmap의 핵심 흐름 확인 필요.

### stamp

- Route: `/stamp`
- File: `frontend/src/app/stamp/page.tsx`
- 구현된 기능:
  - 대표 국가 전체 목록 표시.
  - `workbookCompleted`에 포함된 국가는 사증 획득 상태로 표시.
  - 미완료 국가는 국기 이모지와 대기 상태 표시.
- 현재 UI 상태:
  - `DashboardShell` 기반 대시보드형 페이지.
  - 아직 펼쳐진 여권 UI로 전환되지 않음.
  - 좌측 사이드바는 제거된 상태.
- 완료도: 55%
- 수정 필요:
  - worldmap과 동일한 여권형 공통 레이아웃으로 전환 필요.

### workbook

- Route: `/workbook/[country]`
- File: `frontend/src/app/workbook/[country]/page.tsx`
- 구현된 기능:
  - 대표 국가 상세 학습지 표시.
  - 국가 개요, 수도, 언어, 면적, 인구, 위치, 전통 의상, 음식, 집 표시.
  - 학습 메모 작성.
  - 완료 시 `workbookCompleted`, `workbookNotes` 저장 후 `/stamp` 이동.
- 현재 UI 상태:
  - `DashboardShell` 기반 카드/패널 UI.
  - 여권형 공통 레이아웃 전환 전.
- 완료도: 65%
- 수정 필요:
  - 여권형 좌/우 페이지 구조로 전환.
  - 책갈피 네비게이션 연결.

### travel-info

- Route: `/travel-info/[country]`
- File: `frontend/src/app/travel-info/[country]/page.tsx`
- 구현된 기능:
  - 사용자가 추가한 여행 국가 정보 입력.
  - 입력 항목:
    - 국가명
    - 국기 이미지
    - 표시 이름
    - 면적
    - 인구 수
    - 사용 언어
    - 수도
    - 소속 대륙
    - 지도 이미지
  - 저장 후 `/worldmap` 이동.
- 현재 UI 상태:
  - `DashboardShell` 기반 form page.
  - 이미지를 실제 미리보기하지 않고 URL/설명 입력 형태.
- 완료도: 50%
- 수정 필요:
  - 여권형 공통 레이아웃 전환.
  - 이미지 업로드/미리보기/삭제 미구현.

### immi

- Route: `/immi/[country]`
- File: `frontend/src/app/immi/[country]/page.tsx`
- 구현된 기능:
  - 대표 국가 입국 심사 페이지.
  - 국가명, 수도, 언어, 인사말 표시.
  - 인사말 따라 쓰기 입력.
  - 단순 색상 팔레트와 3분할 국기 색칠 UI.
  - 완료 시 `immigrationCompleted`에 저장 후 `/worldmap` 이동.
- 현재 UI 상태:
  - `DashboardShell` 기반 대시보드형 UI.
  - 실제 음성 인식은 미구현.
  - 실제 국가별 국기 도안이 아니라 3분할 색칠 UI.
- 완료도: 55%
- 수정 필요:
  - 여권형 공통 레이아웃 전환.
  - 실제 입국 심사 UX 고도화.
  - 음성 인식 또는 발음 검사 구현 여부 결정 필요.

## 3. 현재 라우팅 구조

```text
frontend/src/app
├─ layout.tsx
├─ page.tsx                    -> /
├─ login/
│  └─ page.tsx                 -> /login
├─ signup/
│  └─ page.tsx                 -> /signup
├─ worldmap/
│  └─ page.tsx                 -> /worldmap
├─ stamp/
│  └─ page.tsx                 -> /stamp
├─ immi/
│  └─ [country]/
│     └─ page.tsx              -> /immi/[country]
├─ workbook/
│  └─ [country]/
│     └─ page.tsx              -> /workbook/[country]
└─ travel-info/
   └─ [country]/
      └─ page.tsx              -> /travel-info/[country]
```

## 4. 컴포넌트 구조

### Layout / Shell

- `frontend/src/app/layout.tsx`
  - `html lang="ko"`
  - `#root-shell`
  - `h-screen overflow-hidden`
- `frontend/src/components/DashboardShell.tsx`
  - Header 포함 대시보드형 레이아웃.
  - `stamp`, `workbook`, `travel-info`, `immi`에서 사용.
  - 내부에 좌우 padding과 `max-w-[1480px]` 컨테이너 있음.
- `frontend/src/components/Header.tsx`
  - 대시보드 페이지 상단 헤더.
  - 브랜드 영역, 사용자명, 로그아웃 버튼.
- `frontend/src/components/Sidebar.tsx`
  - 파일은 남아 있음.
  - 현재 주요 페이지에서 렌더링하지 않음.
  - 과거 `세계지도/사증` 사이드탭 용도.

### Passport Components

- `frontend/src/components/passport/PassportCover.tsx`
  - 닫힌 여권 커버.
  - 로그인/회원가입 선택 버튼.
- `frontend/src/components/passport/PassportOpen.tsx`
  - 펼쳐진 여권 구조.
  - 좌측 안내 페이지 + 우측 로그인/회원가입 폼.
- `frontend/src/components/passport/LoginForm.tsx`
  - 여권 내부 로그인 폼.
- `frontend/src/components/passport/SignupForm.tsx`
  - 여권 내부 회원가입 폼.

### World Map Components

- `frontend/src/components/WorldMapGraphic.tsx`
  - 전체 세계지도 이미지 표시.
  - 대륙별 투명 SVG 클릭 영역.
  - 대륙명 라벨 표시.
  - `selected: ContinentKey | null`
  - `onSelect(continent)` callback.

### Data / Storage

- `frontend/src/lib/countries.ts`
  - `ContinentKey`
  - `RepresentativeCountry`
  - `continents`
  - `representativeCountries`
  - `countryPath`
  - `findCountry`
  - `isRepresentativeCountry`
- `frontend/src/lib/storage.ts`
  - `localStorage` 기반 상태 저장.
  - key: `baeum-passport-state`
  - user, immigrationCompleted, workbookCompleted, addedCountries, travelInfo, workbookNotes 저장.

## 5. 디자인 시스템

### 색상 시스템

`frontend/tailwind.config.ts` 기준:

```ts
passport: {
  navy: "#102a5f",
  blue: "#1f4f9a",
  ink: "#13213c",
  paper: "#f8f1df",
  gold: "#d6a83b",
  stamp: "#b43b4a",
  teal: "#1c8d8a",
}
```

### 배경 / 종이 질감

- `body`
  - 네이비 계열 gradient.
  - 골드 radial highlight.
- `.paper-surface`
  - 종이색 오버레이.
  - 반복 선 패턴으로 종이 질감 표현.
- `.passport-entry`
  - 메인/여권형 페이지의 배경.

### 폰트

- 별도 웹폰트는 설정되어 있지 않음.
- 브라우저 기본 폰트 + Tailwind font weight 중심.
- 주요 텍스트는 `font-black`, `font-bold` 사용.

### spacing

- 카드/패널: 주로 `p-4`, `p-5`, `p-7`.
- 여권 페이지: `.passport-page`에서 `padding: clamp(18px, 3vw, 34px)`.
- 지도/카드 gap: `gap-3`, `gap-4`.

### animation

- `.passport-soft-enter`: 360ms soft card enter.
- `.passport-open-content`: 320ms form enter.
- `.tab-fade`: 180ms fade.
- `.passport-cover-closed.is-soft-transitioning`: scale transition.

### hover

- 버튼 hover:
  - `hover:bg-passport-blue/10`
  - `hover:bg-passport-navy`
  - `hover:bg-white/10`
- 책갈피 hover:
  - 오른쪽으로 `translateX(6px)`
  - 골드 gradient 강화.
- 대표 국가 버튼 hover:
  - 살짝 위로 이동.
  - 골드 border.
  - shadow.

### card / border / shadow

- 카드 radius는 대체로 `rounded-md`, `rounded-lg`.
- 여권 페이지 radius:
  - 좌측 `18px 0 0 18px`
  - 우측 `0 18px 18px 0`
- 여권 shadow:
  - `drop-shadow(0 34px 70px rgba(16, 42, 95, 0.3))`
- custom shadow:
  - `shadow-passport = 0 24px 60px rgba(16, 42, 95, 0.22)`

### 버튼 디자인

- primary: 네이비/블루 배경 + 흰색 텍스트.
- secondary: border + blue text + soft hover.
- stamp/action: `passport-stamp` 배경.
- icon은 lucide-react 사용.

## 6. 공통 레이아웃 구조

### 여권 컨셉

- 닫힌 여권: `PassportCover`.
- 펼쳐진 여권: `.passport-book-open`.
- 펼쳐진 여권은 2열 grid:
  - `.passport-page-left`
  - `.passport-page-right`

### 현재 공통화 상태

- 로그인/회원가입은 `PassportOpen`으로 여권형 UI를 사용.
- `/worldmap`은 별도 구현으로 여권형 UI를 사용.
- `/stamp`, `/workbook`, `/travel-info`, `/immi`는 아직 `DashboardShell` 기반.

### 책갈피 네비게이션

- 현재 구현 위치: `frontend/src/app/worldmap/page.tsx`의 `PassportBookmarks`.
- 책갈피 항목:
  - 세계지도
  - 사증
  - 학습지
  - 여행정보
- 책갈피는 여권 오른쪽 바깥쪽에 꽂힌 형태:
  - `.passport-bookmarks`
  - `.passport-bookmark`

### 스크롤 정책

- 전역:
  - `html`, `body`: `height: 100vh`, `overflow: hidden`.
  - root shell: `h-screen overflow-hidden`.
- 페이지 전체 스크롤 금지.
- 필요한 내부 영역만 `.scroll-area`로 스크롤 허용.

## 7. 세계지도(worldmap) 페이지 상세 분석

### 현재 구현 상태

- `/worldmap`은 프로젝트에서 가장 최신 디자인 요구사항이 반영된 페이지.
- `DashboardShell`을 사용하지 않고 직접 `passport-entry paper-surface` + `passport-book-open` 구조를 사용.
- 좌측 페이지는 지도 탐색, 우측 페이지는 안내/국가 상세 역할.

### 세계지도 구조

- 전체 지도:
  - `frontend/public/images/world_map.png`
  - 태평양 중심 세계지도.
  - 비율: 3:2.
  - `WorldMapGraphic`에서 `aspect-[3/2]`로 표시.
- 대륙별 지도:
  - `asia.png`
  - `europe.png`
  - `africa.png`
  - `north_america.png`
  - `south_america.png`
  - `oseania.png`
  - 모두 `frontend/public/images` 아래 위치.
  - `ContinentExplorer`에서 `object-contain`으로 표시.

### 대륙 선택 방식

- `WorldMapGraphic.tsx`의 `continentAreas` 배열에 SVG path가 정의되어 있음.
- 현재 `viewBox="0 0 1536 1024"`로 `world_map.png` 크기와 맞춤.
- path는 클릭 영역으로만 사용.
- `.continent-area-shape`는 fill/stroke가 투명.
- 대륙명 라벨은 화면에 표시되며 `whitespace-nowrap` 적용.
- 라벨 위치는 각 대륙의 `labelPosition: { left, top }`에서 조정.

### 대륙 정보 표시 방식

- 대륙 선택 후 좌측 페이지 하단에 표시:
  - 인구
  - 면적
  - 국가 수
- `InfoTile compact` 옵션으로 작은 높이 적용.
- 대륙명 옆에 `대표 국가` 텍스트 표시.

### 대표 국가 표시 방식

- 대륙별 대표 국가:
  - 아시아: 한국, 일본, 중국
  - 유럽: 영국, 프랑스, 독일
  - 아프리카: 이집트
  - 북아메리카: 미국, 멕시코
  - 남아메리카: 브라질
  - 오세아니아: 호주
- 대표 국가 버튼:
  - flagcdn.com 국기 이미지 사용.
  - 클릭 시 `selectedCountry` 설정.
  - 우측 페이지에 국가 상세 표시.

### 국가 상세 표시 방식

- 표시 항목:
  - 국기
  - 국가명
  - 수도
  - 언어
  - 통화
  - 인구
  - 면적
  - 위치
  - 소개
- 한국은 비교 기준이므로 인구/면적 비교 문구 숨김.
- 다른 국가는 대한민국 대비 배수 표시.

### 개선 예정 사항

- 대륙 지도 위에 대표 국가 위치별 색상 오버레이/마커 추가.
- 대륙별 지도 좌우 여백을 이미지 바다색으로 채우기 계획 존재.
- 모바일 worldmap 여권형 흐름 재검토.
- 대륙별 지도와 대표 국가 위치의 정확도 보정.
- 모든 다른 페이지를 여권형 공통 레이아웃으로 전환.

## 8. 구현 완료 기능 체크리스트

### 완료

- [x] Next.js App Router 기반 프론트엔드 구조.
- [x] Tailwind CSS passport 색상 시스템.
- [x] 닫힌 여권 커버 UI.
- [x] 펼쳐진 여권 로그인/회원가입 UI.
- [x] `localStorage` 기반 사용자 상태 저장.
- [x] `/worldmap` 여권형 2페이지 레이아웃.
- [x] `/worldmap` 책갈피 네비게이션.
- [x] 전체 세계지도 표시.
- [x] 투명 SVG 대륙 클릭 영역.
- [x] 대륙별 전용 지도 이미지 표시.
- [x] 대륙 정보 표시.
- [x] 대표 국가 버튼 표시.
- [x] 대표 국가 클릭 시 우측 국가 상세 표시.
- [x] 한국 선택 시 대한민국 비교 문구 숨김.
- [x] 대륙 상세에서 세계지도 돌아가기 버튼.
- [x] `stamp` 페이지에서 workbook 완료 여부 기반 사증 표시.
- [x] `workbook` 메모 저장.
- [x] `immi` 완료 저장.
- [x] `travel-info` 사용자 입력 저장.

### 미완료

- [ ] 백엔드 서버 구현.
- [ ] PostgreSQL 연동.
- [ ] 실제 로그인 인증.
- [ ] 보호 라우팅.
- [ ] 사진 업로드/삭제.
- [ ] 실제 음성 인식.
- [ ] 국가별 실제 국기 색칠 도안.
- [ ] 모든 페이지의 여권형 공통 레이아웃 전환.
- [ ] 대표 국가 지도 위 색상 오버레이.

### 수정 필요

- [ ] 일부 파일 출력에서 한글 문자열이 인코딩 깨짐처럼 보임. 실제 화면 검증 필요.
- [ ] `oseania.png` 파일명은 오타로 보이나 실제 파일명이므로 코드에서 그대로 사용 중.
- [ ] `Sidebar.tsx`는 현재 사용하지 않지만 파일이 남아 있음.
- [ ] `/login`, `/signup` legacy 페이지가 `/` 내부 여권형 폼과 중복됨.
- [ ] `/worldmap` 모바일에서 좌측 페이지가 숨겨지는 기존 여권 CSS 정책 재검토 필요.

## 9. 미구현 기능

### worldmap

- 대륙 지도 위 대표 국가 색상 표시.
- 대표 국가 위치 좌표 정밀 조정.
- 대륙 지도 좌우 여백 바다색 적용.
- 대륙별 이미지 비율/배치 최종 검수.
- 모바일 UX 개선.

### stamp

- 여권형 2페이지 레이아웃 전환.
- 책갈피 네비게이션 적용.
- 사증 획득 조건/표현 고도화.
- 추가 국가 사증 처리 정책 결정.

### workbook

- 여권형 2페이지 레이아웃 전환.
- 학습지 편집/저장 UX 개선.
- 국가별 추가 자료/이미지 표시.

### travel-info

- 여권형 2페이지 레이아웃 전환.
- 이미지 URL 실제 미리보기.
- 업로드/삭제 기능.
- 추가 국가 저장 후 worldmap 목록과의 연결 강화.

### immi

- 여권형 2페이지 레이아웃 전환.
- 음성 입력 실제 구현.
- 국가별 국기 도안 기반 색칠.
- 입국 심사 완료 후 흐름 개선.

### auth/backend

- Spring Boot 또는 다른 백엔드 여부 결정.
- PostgreSQL 스키마 설계.
- 회원가입/로그인 API.
- 세션/토큰 인증.
- localStorage에서 서버 저장소로 이전.

## 10. 현재 진행 중인 작업

최근 작업 흐름:

- `/worldmap`을 펼쳐진 여권 UI로 리디자인.
- 대륙별 전용 지도 이미지 추가 및 연결.
- 전체 세계지도는 태평양 중심 `world_map.png`로 교체.
- 대륙 클릭 영역을 현재 `world_map.png` 기준으로 재조정.
- 클릭 영역은 투명하게 처리.
- 대륙명 라벨 줄바꿈 방지.
- 대륙 선택 후 전용 대륙 이미지 표시.
- 대륙 상세 상태에서 세계지도 돌아가기 버튼 추가.
- 대표 국가 정보 타일 높이 조정.
- `대표 국가` 배지를 텍스트로 변경하고 대륙명 오른쪽에 배치.
- 한국 선택 시 비교 문구 제거.
- 우측 안내 스탬프 4칸 제거.

현재 바로 이어서 할 만한 작업:

1. 대륙 지도 위 대표 국가 색상 오버레이 구현.
2. 대륙별 지도 좌우 여백을 바다색으로 채우기.
3. `/worldmap` 모바일 레이아웃 점검.
4. `stamp` 페이지 여권형 전환.

## 11. 향후 개발 계획

### Priority 1

- `/worldmap` polish:
  - 대표 국가 지도 위 색상 마커/오버레이.
  - 대륙 지도 배경 바다색 처리.
  - 대륙별 라벨/클릭 영역 최종 조정.
  - 모바일 동작 확인.
- 깨진 한글 문자열 표시 여부 확인 및 정리.
- `npm.cmd run lint`, `npm.cmd run build` 정기 검증.

### Priority 2

- 여권형 공통 레이아웃 컴포넌트 추출:
  - `PassportBookLayout`
  - `PassportBookmarks`
  - `PassportPage`
- `stamp`, `workbook`, `travel-info`, `immi`를 여권형 레이아웃으로 전환.
- 기존 `DashboardShell` 사용 범위 축소 또는 유지 정책 결정.

### Priority 3

- 백엔드/DB 도입 여부 결정.
- 인증 설계.
- 이미지 업로드/삭제.
- 음성 인식.
- 실제 국가 데이터 확장.
- 접근성/반응형 QA.

## 12. Codex 작업 시 반드시 유지해야 하는 규칙

- 전체 페이지 스크롤 금지.
- 필요한 경우 내부 영역만 `.scroll-area`로 스크롤 허용.
- 여권 디자인 유지.
- 네이비/골드 테마 유지.
- 로그인/회원가입의 펼쳐진 여권 디자인을 공통 디자인 기준으로 사용.
- `/worldmap`은 태평양 중심 세계지도 기준.
- 전체 세계지도 파일은 `frontend/public/images/world_map.png`.
- 대륙별 지도 파일명:
  - `asia.png`
  - `europe.png`
  - `africa.png`
  - `north_america.png`
  - `south_america.png`
  - `oseania.png`
- `oseania.png`는 오타처럼 보여도 현재 실제 파일명이므로 코드와 문서에서 그대로 사용.
- `WorldMapGraphic.tsx`의 대륙 클릭 영역은 투명 SVG path.
- 대륙 라벨 위치는 `labelPosition.left/top`으로 조정.
- `representativeCountries`의 국가명은 라우팅에 사용되므로 임의 변경 금지.
- `flagcdn.com` 원격 이미지 설정은 유지.
- 기존 사용자 변경을 되돌리지 말 것.
- 기존 `docs/PROJECT_ANALYSIS_REPORT.md`는 오래된 문서로 보존하고, 최신 복구 문서는 이 파일을 기준으로 사용할 것.

## 주요 파일 빠른 참조

```text
frontend/src/app/page.tsx
frontend/src/app/worldmap/page.tsx
frontend/src/components/WorldMapGraphic.tsx
frontend/src/components/passport/PassportCover.tsx
frontend/src/components/passport/PassportOpen.tsx
frontend/src/components/passport/LoginForm.tsx
frontend/src/components/passport/SignupForm.tsx
frontend/src/lib/countries.ts
frontend/src/lib/storage.ts
frontend/src/app/globals.css
frontend/tailwind.config.ts
frontend/next.config.mjs
```

## 검증 명령

```powershell
cd C:\Project\baeum_passport\frontend
npm.cmd run lint
npm.cmd run build
```

마지막으로 확인된 빌드 상태:

- 최근 여러 변경 후 `npm.cmd run lint` 통과.
- 최근 여러 변경 후 `npm.cmd run build` 통과.
- 이 문서는 코드 변경 없이 문서만 생성하는 목적이다.
