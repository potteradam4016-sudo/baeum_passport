# GitHub 업로드 전 안전 점검 보고서

## 1. 점검 요약

현재 프로젝트를 GitHub에 올리기 전 확인한 결과, 가장 중요한 보안 이슈는 백엔드 설정 파일의 JWT 서명 키 하드코딩이다.

그 외 `node_modules`, `.next`, `backend/build`, `.gradle`, `backend/uploads`, 로그 파일 등은 `.gitignore`에 포함되어 있어 일반적인 빌드 산출물과 업로드 파일은 커밋 대상에서 제외된다.

최종 판단:

```text
JWT secret 환경변수화 후 GitHub 업로드 권장
```

---

## 2. 반드시 수정해야 하는 보안 이슈

### 2.1 JWT secret 하드코딩

파일:

```text
backend/src/main/resources/application.properties
```

현재 설정:

```properties
jwt.secret=baeumyeokwonSecretKey1234567890abcdef
```

문제:

- JWT 서명 키가 소스 코드에 직접 포함되어 있다.
- GitHub에 공개되면 토큰 위조 위험이 생긴다.
- 실제 운영 환경에서는 절대 커밋되면 안 되는 값이다.

권장 수정:

```properties
jwt.secret=${JWT_SECRET:dev-only-change-me}
```

운영 또는 실제 배포 환경에서는 반드시 환경변수로 설정한다.

```text
JWT_SECRET=<충분히 긴 랜덤 문자열>
```

---

## 3. 주의가 필요한 설정

### 3.1 DB password fallback

파일:

```text
backend/src/main/resources/application.properties
```

현재 설정:

```properties
spring.datasource.password=${DATABASE_PASSWORD:password}
```

판단:

- 실제 비밀번호가 아니라 fallback 값이므로 즉시 치명적인 secret 유출은 아니다.
- 다만 공개 저장소라면 `password` 같은 흔한 기본값은 피하는 것이 좋다.

권장 수정:

```properties
spring.datasource.password=${DATABASE_PASSWORD:change-me}
```

또는 로컬 개발용 값은 `application-local.properties`로 분리하고 `.gitignore`에 유지한다.

---

## 4. 파일 크기 점검

Git 추적 대상 중 5MB를 초과하는 파일은 발견되지 않았다.

1MB 이상 이미지 파일은 존재하지만 GitHub 업로드에는 큰 문제가 없는 수준이다.

확인된 주요 대형 이미지:

```text
frontend/public/images/immi/angry.png      약 1.93MB
frontend/public/images/immi/bad.png        약 1.85MB
frontend/public/images/immi/happy.png      약 1.74MB
frontend/public/images/world_map.png       약 1.42MB
frontend/public/images/stamp/chn_stamp.png 약 1.40MB
frontend/public/images/stamp/jap_stamp.png 약 1.15MB
```

판단:

```text
파일 크기 이슈 없음
```

---

## 5. 커밋되면 안 되는 파일 및 폴더

현재 `.gitignore`에 포함되어 있는 주요 제외 대상:

```text
node_modules/
.next/
frontend/node_modules/
frontend/.next/
frontend/out/
backend/.gradle/
backend/build/
backend/uploads/
.gradle/
build/
*.db
*.log
application-local.properties
.idea/
.vscode/
*.out.log
*.err.log
```

실제 확인 결과 다음 항목들은 ignore 처리되어 있다.

```text
backend/uploads/
frontend/.next/
backend/build/
*.log
node_modules/
```

특히 `backend/uploads/`에는 테스트 업로드 이미지가 존재하지만 `.gitignore`에 의해 커밋 대상에서 제외된다.

---

## 6. 현재 작업 디렉터리에서 발견된 ignore 대상 파일

다음 파일들은 로컬에 존재하지만 GitHub에 올리면 안 되는 산출물이며, 현재 ignore 처리되어 있다.

```text
backend-boot.err.log
backend-boot.out.log
backend-jar.err.log
backend-jar.out.log
backend-verify.err.log
backend-verify.out.log
frontend-3001.err.log
frontend-3001.out.log
frontend-verify.err.log
frontend-verify.out.log
backend/.gradle/
backend/build/
backend/uploads/
frontend/.next/
frontend/node_modules/
```

---

## 7. 프론트 인증 저장 방식 관련 주의

파일:

```text
frontend/src/lib/api/authToken.ts
```

현재 구조:

```text
JWT를 localStorage에 저장
```

판단:

- GitHub 업로드 자체의 차단 사유는 아니다.
- 다만 XSS 공격에 취약할 수 있으므로 장기적으로는 httpOnly Cookie 방식 전환을 권장한다.
- 현재 구조는 이전 구현 방향에 따라 auth token 모듈이 분리되어 있어 추후 전환이 가능하다.

---

## 8. 권장 조치 체크리스트

GitHub 업로드 전 필수:

```text
[ ] jwt.secret을 JWT_SECRET 환경변수 기반으로 변경
[ ] 실제 DB 비밀번호, 개인 토큰, API 키가 추가로 없는지 최종 확인
```

권장:

```text
[ ] DATABASE_PASSWORD fallback을 password에서 change-me로 변경
[ ] 로컬 전용 설정은 application-local.properties에 두고 커밋하지 않기
[ ] backend/uploads/는 계속 커밋 제외 유지
[ ] 로그 파일은 계속 커밋 제외 유지
```

---

## 9. 최종 판정

현재 상태에서 가장 중요한 수정 대상은 다음 한 줄이다.

```properties
jwt.secret=baeumyeokwonSecretKey1234567890abcdef
```

이 값을 환경변수 기반 설정으로 바꾸면, 현재 확인 범위에서는 GitHub 업로드가 가능한 상태로 판단된다.

