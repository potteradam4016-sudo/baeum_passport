# Baeum Passport Frontend Technical Analysis Report

> Purpose: This document analyzes the current `frontend` codebase as a technical reference for future integration with a Spring Boot + PostgreSQL backend. It focuses on how the frontend currently works, what data is stored in the browser, and which parts must be connected to backend APIs.

## 1. Project Overview

Baeum Passport is an educational web application where students explore countries on a world map, complete country workbooks, collect passport-style stamps, and manage their own travel information. The UI is based on a real passport concept, using a navy/gold theme and a shared open-passport layout.

| Item | Description |
| --- | --- |
| Framework | Next.js App Router |
| Next.js Version | `^14.2.5` |
| React Version | `^18.3.1` |
| Language | TypeScript |
| Styling | Tailwind CSS + global custom CSS in `frontend/src/app/globals.css` |
| Icons | `lucide-react` |
| State Management | Local React state with `useState`, `useEffect`, and `useMemo` |
| Data Persistence | Browser `localStorage` under the key `baeum-passport-state` |
| Current Authentication | No real authentication; login/signup data is stored in localStorage |
| Planned Backend | Spring Boot + PostgreSQL |

The frontend currently works as a backend-less prototype. Authentication, workbook records, stamp completion, and travel information are all persisted in localStorage. During backend integration, `frontend/src/lib/storage.ts` will be the main replacement or abstraction target.

## 2. Directory Structure Analysis

```text
frontend/
├── public/
│   └── images/
│       ├── world_map.png
│       ├── asia.png, europe.png, ...
│       └── stamp/*.png
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── worldmap/page.tsx
│   │   ├── workbook/page.tsx
│   │   ├── workbook/[country]/page.tsx
│   │   ├── stamp/page.tsx
│   │   ├── travel-info/page.tsx
│   │   ├── travel-info/[country]/page.tsx
│   │   ├── immi/[country]/page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── DashboardShell.tsx
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── WorldMapGraphic.tsx
│   │   └── passport/
│   │       ├── PassportCover.tsx
│   │       ├── PassportOpen.tsx
│   │       ├── LoginForm.tsx
│   │       └── SignupForm.tsx
│   └── lib/
│       ├── countries.ts
│       └── storage.ts
├── package.json
├── package-lock.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

| Path | Role |
| --- | --- |
| `frontend/src/app` | Next.js App Router pages and global CSS |
| `frontend/src/components` | Shared UI components and passport-specific form components |
| `frontend/src/lib/storage.ts` | localStorage state model and persistence utilities |
| `frontend/src/lib/countries.ts` | Static continent/country data and country utility functions |
| `frontend/public/images` | Static map, continent, and stamp image assets |

## 3. Page Structure Analysis

| Route | File | Role | Current Status |
| --- | --- | --- | --- |
| `/` | `frontend/src/app/page.tsx` | Main passport cover and login/signup entry | Implemented |
| `/login` | `frontend/src/app/login/page.tsx` | Standalone login page | Implemented; overlaps with passport login |
| `/signup` | `frontend/src/app/signup/page.tsx` | Standalone signup page | Implemented; overlaps with passport signup |
| `/worldmap` | `frontend/src/app/worldmap/page.tsx` | Continent/country exploration and immigration entry | Implemented |
| `/workbook` | `frontend/src/app/workbook/page.tsx` | Workbook country selection | Implemented |
| `/workbook/[country]` | `frontend/src/app/workbook/[country]/page.tsx` | Country-specific workbook and stamp completion | Implemented |
| `/travel-info` | `frontend/src/app/travel-info/page.tsx` | User-created travel country list | Implemented |
| `/travel-info/[country]` | `frontend/src/app/travel-info/[country]/page.tsx` | Country-specific travel information editor | Implemented |
| `/stamp` | `frontend/src/app/stamp/page.tsx` | Passport stamp collection page | Implemented |
| `/immi/[country]` | `frontend/src/app/immi/[country]/page.tsx` | Immigration check page | Placeholder screen implemented |

## 4. Component Structure Analysis

| Component | File | Role | Parent / Usage | Reusability |
| --- | --- | --- | --- | --- |
| `PassportCover` | `components/passport/PassportCover.tsx` | Closed passport cover with login/signup buttons | `/` | Main page only |
| `PassportOpen` | `components/passport/PassportOpen.tsx` | Open passport login/signup layout | `/` | Main page only |
| `LoginForm` | `components/passport/LoginForm.tsx` | Passport-style login form | `PassportOpen` | Target for auth API integration |
| `SignupForm` | `components/passport/SignupForm.tsx` | Passport-style signup form | `PassportOpen` | Target for auth API integration |
| `WorldMapGraphic` | `components/WorldMapGraphic.tsx` | World map image with continent selection buttons | `/worldmap` | World map only |
| `DashboardShell` | `components/DashboardShell.tsx` | Legacy dashboard shell with header | Older/standalone pages | Usage reduced |
| `Header` | `components/Header.tsx` | User display and logout button | `DashboardShell` | Must be updated for backend auth |
| `Sidebar` | `components/Sidebar.tsx` | Legacy side navigation | Limited current usage | Candidate for removal or consolidation |

### Page-Local Components

| Page | Internal Components | Role |
| --- | --- | --- |
| `/worldmap` | `PassportBookmarks`, `ContinentExplorer`, `CountryDetail`, `InfoTile` | Bookmark navigation, continent country list, country detail |
| `/workbook/[country]` | `BasicInfoPage`, `FlagObservationPage`, `MapLocationPage`, `CountryResearchPage`, `DeepResearchPage`, `CompletePage`, `MissingFieldsModal`, `AlreadyStampedModal` | Five-page workbook, validation, duplicate stamp warning |
| `/travel-info` | `InfoPoint`, `AddCountryForm`, `TravelInfoList`, `PassportBookmarks` | Travel-info introduction, country add form, country list |
| `/travel-info/[country]` | `DeleteConfirmModal`, `TravelHeader`, `Field`, `TextArea`, `ImageUrlField` | Travel-info detail editor, save/delete flow |
| `/stamp` | `StampPageSide`, `PassportStampImage`, `StampWatermark`, `PageFooter` | Stamp image placement and page turning |

### Component Tree

```text
HomePage (/)
├── PassportCover
└── PassportOpen
    ├── LoginForm
    └── SignupForm

WorldMapPage (/worldmap)
├── PassportBookmarks
├── WorldMapGraphic
├── ContinentExplorer
└── CountryDetail / EmptyCountryState

WorkbookPage (/workbook/[country])
├── PassportBookmarks
├── BasicInfoPage / MapLocationPage / DeepResearchPage
├── FlagObservationPage / CountryResearchPage / CompletePage
├── PageFooter
├── MissingFieldsModal
└── AlreadyStampedModal

StampPage (/stamp)
├── PassportBookmarks
├── StampPageSide
│   ├── StampWatermark
│   └── PassportStampImage[]
└── PageFooter

TravelInfoIndexPage (/travel-info)
├── PassportBookmarks
├── InfoPoint[]
├── AddCountryForm
└── TravelInfoList

TravelInfoPage (/travel-info/[country])
├── PassportBookmarks
├── TravelHeader
├── Field / TextArea / ImageUrlField
└── DeleteConfirmModal
```

## 5. Routing Structure Analysis

The app uses Next.js App Router. Most pages are client components using `"use client"`. Navigation is handled through `next/link` and `useRouter()`.

### Main User Flow

```text
Home /
├─ Select Login
│  └─ Login success → /worldmap
└─ Select Signup
   └─ Signup success → /worldmap

/worldmap
└─ Select continent
   └─ Select representative country
      ├─ Immigration button → /immi/[country]
      ├─ Workbook bookmark → /workbook
      ├─ Stamp bookmark → /stamp
      └─ Travel Info bookmark → /travel-info

/workbook
└─ Select country
   └─ /workbook/[country]
      ├─ Auto-save while editing
      ├─ Missing required fields → validation modal
      ├─ Already stamped country → duplicate warning modal
      └─ Complete → /stamp

/travel-info
└─ Add custom country name
   └─ /travel-info/[country]
      ├─ Save → /travel-info
      └─ Delete → confirm modal → /travel-info
```

### Conditional Routing

| Condition | Location | Behavior |
| --- | --- | --- |
| Direct access to Korea workbook | `/workbook/[country]` | Redirects to `/workbook` |
| Korea selected on world map | `/worldmap` | Immigration button is hidden |
| Workbook required fields missing | `/workbook/[country]` | Shows missing-field modal |
| Country already has stamp | `/workbook/[country]` | Shows duplicate stamp modal |
| Invalid immigration country | `/immi/[country]` | Redirects to `/worldmap` |

## 6. Data Persistence Analysis

Primary file: `frontend/src/lib/storage.ts`

All user state is currently stored in browser localStorage under one JSON key: `baeum-passport-state`.

```text
localStorage["baeum-passport-state"]
└─ PassportState
   ├─ user
   ├─ immigrationCompleted
   ├─ workbookCompleted
   ├─ addedCountries
   ├─ travelInfo
   ├─ workbookNotes
   └─ workbookRecords
```

| Function | Role | Data | Usage |
| --- | --- | --- | --- |
| `loadState()` | Reads the full state from localStorage | `PassportState` | Auth, workbook, stamp, travel info |
| `saveState(state)` | Writes the full state to localStorage | `PassportState` | Auth, logout, workbook save/complete, travel info save/delete |
| `updateState(updater)` | Reads, updates, and writes state | Currently unused | Candidate wrapper for future state updates |
| `addUnique(items, value)` | Adds to an array without duplication | Completion lists | Workbook completion and legacy immigration completion |

### localStorage Usage Diagram

```text
LoginForm / LoginPage
└─ saveState({ user })

SignupForm / SignupPage
└─ saveState({ user })

Header
└─ saveState({ user: null })

WorkbookPage
├─ loadState().workbookRecords[country]
├─ saveState({ workbookRecords, workbookNotes })
└─ saveState({ workbookCompleted, workbookRecords, workbookNotes })

StampPage
└─ loadState().workbookCompleted

TravelInfoIndexPage
├─ loadState().travelInfo
└─ saveState({ travelInfo[country] })

TravelInfoPage
├─ loadState().travelInfo[country]
├─ saveState({ travelInfo[country] })
└─ saveState({ travelInfo: delete country })
```

## 7. Type and Data Model Analysis

### `User`

```ts
type User = {
  id: string;
  name: string;
  grade?: string;
  classNumber?: string;
  studentNumber?: string;
  birthDate?: string;
  gender?: string;
};
```

There is currently no auth token, role, server-side user primary key, or session model. Backend integration will require either JWT/cookie session handling and a stable server-side user ID.

### `WorkbookRecord`

Country-specific workbook input data.

Main field groups:
- Basic facts: `capital`, `language`, `population`, `area`
- Korea comparison: `populationComparison`, `areaComparison`
- Images and observation: `flagImage`, `mapImage`, `flagObservation`
- Location: `continent`, `mapLocation`
- Research and comparison: `greeting`, `researchTopic`, `similarityWithKorea`, `differenceFromKorea`
- Optional fields: `question`, `sources`

The current stamp completion rule requires all fields except `question` and `sources` to be non-empty.

### `TravelCountryInfo`

User-created travel preparation record.

Main field groups:
- Identity: `countryName`, `displayName`
- Images/basic info: `flagImage`, `mapImage`, `continent`
- Travel planning: `travelPurpose`, `placesToVisit`, `localPhrase`, `landmark`, `foodToTry`, `packingList`, `cautions`, `weatherNote`, `freeMemo`

### `PassportState`

The full localStorage state model. During backend integration, this should be split into API-specific DTOs instead of being persisted as one frontend-owned object.

## 8. Country Data Structure Analysis

Primary file: `frontend/src/lib/countries.ts`

### Continent Data

`continents` is a static `Record<ContinentKey, ...>`.

| Field | Meaning |
| --- | --- |
| `name` | Continent display name |
| `population` | Continent population display string |
| `area` | Continent area display string |
| `countryCount` | Number of countries |
| `color` | UI color |
| `countries` | Representative country names for the continent |

### Representative Country Data

`RepresentativeCountry` is the base model for the world map and workbook country list.

| Field | Meaning |
| --- | --- |
| `name` | Country name |
| `continent` | Continent key |
| `flag`, `flagImage` | Emoji flag and external flag image |
| `capital`, `language`, `currency` | Basic country facts |
| `area`, `areaComparison` | Area and comparison with Korea |
| `population`, `populationComparison` | Population and comparison with Korea |
| `greeting` | Local greeting |
| `overview` | Country overview |
| `mapNote` | Location note |
| `clothing`, `food`, `house` | Legacy cultural fields; no longer used in the workbook UI |
| `color` | UI color |

### Utility Functions

| Function | Role |
| --- | --- |
| `countryPath(name)` | Encodes country names for URL paths |
| `isKoreaCountry(country)` | Detects Korea using `flagImage.includes("/kr.")` |
| `isWorkbookEligibleCountry(country)` | Excludes Korea from workbook/immigration eligibility |
| `workbookCountries` | Representative countries excluding Korea |
| `findCountry(name)` | Finds a representative country by name |
| `isRepresentativeCountry(name)` | Checks whether a name belongs to the representative country list |

When moving to a backend, this data can be migrated to database seed data or exposed through country APIs. However, the current world map UI is tightly coupled to frontend static data and map positioning.

## 9. Expected API Integration Points

| Feature | Current Method | API Needed | Expected Endpoint |
| --- | --- | --- | --- |
| Login | Save `user` to localStorage | Required | `POST /api/auth/login` |
| Signup | Save `user` to localStorage | Required | `POST /api/auth/signup` |
| Logout | Remove `user` from localStorage | Required | `POST /api/auth/logout` or client token/session removal |
| Current user | Not implemented | Required | `GET /api/users/me` |
| Representative countries | Static `countries.ts` | Optional | `GET /api/countries/representative` |
| Continents | Static `countries.ts` | Optional | `GET /api/continents` |
| Workbook record lookup | localStorage `workbookRecords` | Required | `GET /api/workbooks/{country}` |
| Workbook auto-save | localStorage immediate save | Required | `PUT /api/workbooks/{country}` |
| Workbook completion | Add to `workbookCompleted` | Required | `POST /api/workbooks/{country}/complete` |
| Stamp list | Read `workbookCompleted` | Required | `GET /api/stamps` |
| Travel-info list | localStorage `travelInfo` | Required | `GET /api/travel-info` |
| Travel-info creation | Create `travelInfo[country]` | Required | `POST /api/travel-info` |
| Travel-info detail | Read `travelInfo[country]` | Required | `GET /api/travel-info/{id}` |
| Travel-info save | Update detail in localStorage | Required | `PUT /api/travel-info/{id}` |
| Travel-info delete | Delete localStorage key | Required | `DELETE /api/travel-info/{id}` |
| Immigration activity | Placeholder page | Future | `POST /api/immigration/{country}/complete` |

### Recommended API Integration Priority

1. Authentication: `signup`, `login`, `logout`, `me`
2. Workbook: fetch, auto-save, complete
3. Stamps: fetch completed stamp records
4. Travel information: list, create, update, delete
5. Country and continent data API
6. Immigration activity API

## 10. Authentication Structure Analysis

The current authentication flow is not secure authentication. It only stores form data in localStorage.

### Current Login Flow

```text
LoginForm or /login
→ enter id/password
→ loadState()
→ saveState({ user: { id, name }})
→ router.push("/worldmap")
```

There is no password validation, server verification, token issuance, session persistence, or route protection.

### Current Signup Flow

```text
SignupForm or /signup
→ enter grade/class/student number/name/birth date/gender
→ create localStorage user
→ passport signup form: navigate to /worldmap
→ standalone /signup page: navigate to /login
```

The passport signup form and the standalone signup page have different post-submit behavior. This should be unified before or during backend integration.

### Backend Integration Decisions

| Topic | Recommendation |
| --- | --- |
| Auth method | Spring Security + JWT or httpOnly cookie session |
| Token storage | Prefer httpOnly cookies; avoid localStorage token storage because of XSS risk |
| User restoration | Use `GET /api/users/me` on app startup |
| Route protection | Redirect unauthenticated users away from `/worldmap`, `/workbook`, `/stamp`, and `/travel-info` |

## 11. UI/UX Structure Analysis

The design system is primarily implemented in `frontend/src/app/globals.css`.

| Element | Implementation |
| --- | --- |
| Closed passport cover | `.passport-cover-closed`, used on `/` |
| Open passport | `.passport-book-open`, `.passport-page-left`, `.passport-page-right` |
| Large explorer/workbook size | `.passport-explorer-book`, `.workbook-book` |
| Bookmarks | `.passport-bookmarks`, `.passport-bookmark` |
| Page turning | `.workbook-turn-button`, `PageFooter` |
| Paper texture | `.paper-surface`, repeating gradients |
| Internal scroll | `.scroll-area` |
| Watermark | `.passport-map-watermark` and page-specific icon watermarks |

### UX by Feature

| Feature | UX Pattern |
| --- | --- |
| Main | Closed passport cover opens into login/signup passport |
| World map | Left page for continent/country selection, right page for country detail |
| Workbook | Book-like spread: `[1|2]`, `[3|4]`, `[5|complete]` |
| Stamp | Stamp PNG images placed on blank passport pages |
| Travel info | Left introduction page, right country add/list page; detail pages use two-page travel planning layout |
| Immigration | Large non-passport activity window; currently placeholder only |

## 12. Files to Modify During API Integration

| Target | Required Change |
| --- | --- |
| `frontend/src/lib/storage.ts` | Remove direct localStorage ownership or reduce to temporary cache only |
| New `frontend/src/lib/apiClient.ts` | Add fetch wrapper, base URL, credentials/token handling, error handling |
| `LoginForm.tsx`, `SignupForm.tsx`, `/login`, `/signup` | Replace localStorage writes with auth API calls |
| `Header.tsx` | Use `GET /me`, logout API, and server-backed user state |
| `workbook/[country]/page.tsx` | Add workbook fetch, auto-save, and completion API calls |
| `stamp/page.tsx` | Fetch stamp records from backend |
| `travel-info/page.tsx` | Fetch list and create records through API |
| `travel-info/[country]/page.tsx` | Fetch, update, and delete records through API |
| `countries.ts` | Decide whether to keep static data or migrate to server data |
| Route protection | Add authenticated route handling |

### Recommended API Client Layout

```text
frontend/src/lib/api/
├── client.ts
├── auth.ts
├── countries.ts
├── workbooks.ts
├── stamps.ts
├── travelInfo.ts
└── immigration.ts
```

## 13. Merge Conflict and Integration Risk Analysis

The repository already contains a backend area. The user currently has `backend/src/main/resources/application.properties` open, which suggests that backend work may exist locally beyond what the frontend currently consumes.

| Area | Risk | Recommendation |
| --- | --- | --- |
| Root `.gitignore` | Java/Gradle/Spring ignore rules may be incomplete | Add `build/`, `.gradle/`, `*.class`, and local application config patterns |
| Root README | Initial plan differs from current implementation | Update README or treat docs as the source of truth |
| Auth model | Frontend `User` and backend entity may not match | Define DTOs before implementation |
| Country identifier | Frontend uses Korean country name as key | Prefer backend `countryId` or ISO/country code |
| Workbook fields | Frontend `WorkbookRecord` needs server DTO mapping | Align required/optional fields with backend validation |
| Travel-info identifier | Frontend uses `countryName` as object key | Use backend primary key for records |
| Completion/stamps | Frontend relies on ordered `workbookCompleted: string[]` | Store completion timestamp/order on backend |
| Static images | Stamp/map assets live in frontend public folder | Backend should return country codes or asset keys, not binary images |

## 14. Final Summary

| Item | Evaluation |
| --- | --- |
| Frontend completeness | High for UI prototype; major user flows are implemented |
| API readiness | Good structure for migration, but data logic is tightly coupled to localStorage |
| localStorage dependency | Very high; auth, workbook, stamps, and travel info all depend on it |
| Backend integration difficulty | Medium; UI is stable, but storage logic must be split into API services |
| Estimated effort | Auth 1-2 days, workbook/stamps 2-4 days, travel info 1-2 days, country data/immigration 2+ days |

### Key Conclusion

The current frontend is a polished backend-less prototype. To integrate it with Spring Boot + PostgreSQL, the team should first wrap or replace `storage.ts` with an API service layer, then move user-owned data to backend DTOs and database tables.

Recommended implementation order:

1. Connect backend authentication APIs.
2. Split `PassportState` into feature-specific DTOs.
3. Integrate workbook save and completion APIs.
4. Integrate stamp retrieval APIs.
5. Integrate travel-info CRUD APIs.
6. Decide whether country and continent data remain static or move to backend APIs.
