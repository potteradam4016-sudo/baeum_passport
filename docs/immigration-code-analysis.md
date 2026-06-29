# 입국심사 코드 분석 보고서

## 1. 기능 위치

입국심사 기능은 `UserCountry` 도메인 안에 구현되어 있다.

주요 파일:

- `src/main/java/com/baeum/controller/UserCountryController.java`
- `src/main/java/com/baeum/service/UserCountryService.java`
- `src/main/java/com/baeum/entity/UserCountry.java`
- `src/main/java/com/baeum/repository/UserCountryRepository.java`
- `src/main/java/com/baeum/dto/UserCountryDto.java`
- `src/main/java/com/baeum/dto/UserCountryResponseDto.java`

## 2. 관련 API

입국심사 통과 API는 다음 엔드포인트이다.

```http
PATCH /api/user-countries/{id}/immigration
```

여기서 `{id}`는 `countries.id`가 아니라 `user_countries.id`이다. 즉, 사용자가 자신의 여권에 추가한 국가 항목의 고유 ID를 사용한다.

응답 예시:

```json
{
  "id": 1,
  "country_id": 3,
  "immigration_passed": true,
  "immigration_passed_at": "2026-06-29T12:00:00Z",
  "added_at": "2026-06-29T11:30:00Z"
}
```

## 3. 인증 및 사용자 분리 흐름

모든 `/api/**` 요청은 JWT 인증을 요구한다.

처리 흐름:

1. `JwtAuthenticationFilter`가 `Authorization: Bearer ...` 헤더를 읽는다.
2. 토큰이 유효하면 JWT 안의 `userId`를 principal로 저장한다.
3. `AuthUtil.getCurrentUserId()`가 현재 로그인한 사용자의 ID를 반환한다.
4. `UserCountryService`는 이 `userId`를 기준으로 데이터 소유권을 검사한다.

따라서 입국심사 처리는 로그인한 학생 본인의 데이터에만 적용된다.

## 4. 입국심사 처리 로직

핵심 메서드는 `UserCountryService.passImmigration(Long id)`이다.

처리 순서:

1. `AuthUtil.getCurrentUserId()`로 현재 로그인 사용자 ID를 가져온다.
2. `userCountryRepository.findById(id)`로 `user_countries` 항목을 조회한다.
3. 항목이 없으면 `ResourceNotFoundException`을 발생시킨다.
4. 조회된 항목의 `userId`와 현재 로그인 사용자 ID를 비교한다.
5. 다르면 `ForbiddenException`을 발생시킨다.
6. 같으면 `immigrationPassed`를 `1`로 변경한다.
7. `immigrationPassedAt`에 현재 시각을 ISO 8601 문자열로 저장한다.
8. 저장 후 `UserCountryResponseDto`로 응답한다.

관련 코드 흐름:

```java
@Transactional
public UserCountryResponseDto passImmigration(Long id) {
    Long userId = authUtil.getCurrentUserId();
    UserCountry userCountry = getOwnedUserCountry(id, userId);
    userCountry.setImmigrationPassed(1);
    userCountry.setImmigrationPassedAt(Instant.now().toString());

    return toResponseDto(userCountryRepository.save(userCountry));
}
```

소유권 검사는 `getOwnedUserCountry()`에서 수행된다.

```java
private UserCountry getOwnedUserCountry(Long id, Long userId) {
    UserCountry userCountry = userCountryRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException(...));

    if (!userId.equals(userCountry.getUserId())) {
        throw new ForbiddenException(...);
    }

    return userCountry;
}
```

## 5. DB 구조

입국심사 상태는 `user_countries` 테이블에 저장된다.

```sql
CREATE TABLE IF NOT EXISTS user_countries (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  country_id BIGINT REFERENCES countries(id),
  added_at TEXT DEFAULT (CURRENT_TIMESTAMP::TEXT),
  immigration_passed INTEGER DEFAULT 0,
  immigration_passed_at TEXT
);
```

컬럼 의미:

- `immigration_passed`: 입국심사 통과 여부
  - `0`: 미통과
  - `1`: 통과
- `immigration_passed_at`: 입국심사를 통과한 시각

Java 엔티티에서는 다음 필드와 매핑된다.

```java
@Column(name = "immigration_passed")
private Integer immigrationPassed;

@Column(name = "immigration_passed_at")
private String immigrationPassedAt;
```

DTO 응답에서는 `Integer` 값을 boolean으로 변환한다.

```java
private boolean isImmigrationPassed(UserCountry userCountry) {
    return Integer.valueOf(1).equals(userCountry.getImmigrationPassed());
}
```

이 방식은 `immigrationPassed`가 `null`이어도 안전하다.

## 6. 관련 DTO

### UserCountryDto

`GET /api/user-countries` 응답용 DTO이다.

포함 정보:

- 사용자 국가 항목 ID
- 국가 ID
- 국가명
- 국기 이미지 URL
- 수도
- 대륙명
- 입국심사 통과 여부
- 입국심사 통과 시각
- 추가 시각

### UserCountryResponseDto

국가 추가 및 입국심사 처리 응답용 DTO이다.

포함 정보:

- 사용자 국가 항목 ID
- 국가 ID
- 입국심사 통과 여부
- 입국심사 통과 시각
- 추가 시각

## 7. 잘 구현된 점

- JWT 기반으로 현재 로그인 사용자를 식별한다.
- 입국심사 처리 전에 소유권 검사를 수행한다.
- 다른 사용자의 `user_countries.id`로 요청해도 `ForbiddenException`이 발생한다.
- 입국심사 상태와 통과 시각이 DB에 저장된다.
- 응답에서는 `immigration_passed`를 boolean으로 제공해 프론트엔드에서 사용하기 편하다.
- 서비스 메서드에 `@Transactional`이 적용되어 변경 작업이 트랜잭션 안에서 처리된다.

## 8. 개선 포인트

### 8.1 이미 통과한 입국심사 시간 덮어쓰기

현재는 `PATCH /api/user-countries/{id}/immigration`를 여러 번 호출하면 `immigration_passed_at`이 매번 최신 시간으로 덮어써진다.

최초 통과 시각을 보존해야 한다면 다음과 같은 방어 로직이 필요하다.

```java
if (!Integer.valueOf(1).equals(userCountry.getImmigrationPassed())) {
    userCountry.setImmigrationPassed(1);
    userCountry.setImmigrationPassedAt(Instant.now().toString());
}
```

### 8.2 DB unique constraint 부족

서비스에서는 `existsByUserIdAndCountryId()`로 중복 국가 추가를 막고 있다.

하지만 동시에 같은 요청이 들어오는 경우 DB 레벨에서는 중복을 완전히 막지 못한다.

권장 제약:

```sql
ALTER TABLE user_countries
ADD CONSTRAINT uk_user_countries_user_country UNIQUE (user_id, country_id);
```

### 8.3 N+1 조회 가능성

`getAllUserCountries()`는 각 `UserCountry`마다 `Country`, `Continent`를 별도로 조회한다.

사용자 국가 수가 많아지면 쿼리 수가 늘어날 수 있다.

현재 규모에서는 큰 문제가 아닐 수 있으나, 데이터가 늘어나면 fetch join 또는 전용 조회 쿼리를 고려할 수 있다.

### 8.4 한글 메시지 인코딩 확인 필요

터미널 출력 기준으로 일부 한글 예외 메시지가 깨져 보인다.

실제 파일 인코딩 문제인지 PowerShell 출력 문제인지 IDE에서 확인이 필요하다. 파일 자체가 깨져 있다면 UTF-8로 복구하는 것이 좋다.

## 9. 결론

현재 입국심사 기능은 기본 요구사항을 충족한다.

로그인한 사용자만 자신의 국가 항목에 대해 입국심사를 통과 처리할 수 있으며, 통과 여부와 통과 시각이 `user_countries` 테이블에 저장된다.

우선 개선 대상으로는 다음 두 가지가 적합하다.

1. 이미 통과한 입국심사의 통과 시각을 덮어쓰지 않도록 처리한다.
2. `user_countries(user_id, country_id)`에 DB unique constraint를 추가한다.
