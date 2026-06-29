package com.baeum.service;

import java.time.Instant;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baeum.dto.ImmigrationStatusDto;
import com.baeum.entity.UserCountry;
import com.baeum.exception.ResourceNotFoundException;
import com.baeum.repository.CountryRepository;
import com.baeum.repository.UserCountryRepository;
import com.baeum.util.AuthUtil;

@Service
@Transactional(readOnly = true)
public class ImmigrationService {

    private static final int PASSING_SCORE = 2;

    private final UserCountryRepository userCountryRepository;
    private final CountryRepository countryRepository;
    private final AuthUtil authUtil;

    public ImmigrationService(
            UserCountryRepository userCountryRepository,
            CountryRepository countryRepository,
            AuthUtil authUtil) {
        this.userCountryRepository = userCountryRepository;
        this.countryRepository = countryRepository;
        this.authUtil = authUtil;
    }

    public ImmigrationStatusDto getImmigrationStatus(Long countryId) {
        ensureCountryExists(countryId);
        Long userId = authUtil.getCurrentUserId();

        return userCountryRepository.findByUserIdAndCountryId(userId, countryId)
                .map(userCountry -> toStatusDto(
                        userCountry,
                        isImmigrationPassed(userCountry)
                                ? "이미 입국심사를 통과한 국가입니다."
                                : "입국심사를 진행할 수 있습니다.",
                        isImmigrationPassed(userCountry)))
                .orElseGet(() -> new ImmigrationStatusDto(
                        countryId,
                        null,
                        false,
                        null,
                        null,
                        false,
                        "입국심사를 진행할 수 있습니다."));
    }

    @Transactional
    public ImmigrationStatusDto submitImmigration(Long countryId, Integer score) {
        ensureCountryExists(countryId);
        Long userId = authUtil.getCurrentUserId();
        UserCountry userCountry = getOrCreateUserCountry(userId, countryId);

        if (isImmigrationPassed(userCountry)) {
            return toStatusDto(userCountry, "이미 입국심사를 통과한 국가입니다.", true);
        }

        userCountry.setImmigrationScore(score);

        if (score >= PASSING_SCORE) {
            markPassed(userCountry, score);
            return toStatusDto(userCountryRepository.save(userCountry), "입국심사를 통과했습니다.", false);
        }

        userCountryRepository.save(userCountry);
        return toStatusDto(userCountry, "입국심사에 실패했습니다. 다시 도전해주세요.", false);
    }

    @Transactional
    public ImmigrationStatusDto retryImmigration(Long countryId) {
        ensureCountryExists(countryId);
        Long userId = authUtil.getCurrentUserId();
        UserCountry userCountry = getOrCreateUserCountry(userId, countryId);

        if (isImmigrationPassed(userCountry)) {
            return toStatusDto(userCountry, "이미 입국심사를 통과한 국가입니다.", true);
        }

        userCountry.setImmigrationScore(null);
        userCountry.setImmigrationPassed(0);
        userCountry.setImmigrationPassedAt(null);
        userCountry.setImmigrationCompletedAt(null);

        return toStatusDto(userCountryRepository.save(userCountry), "입국심사를 다시 시작합니다.", false);
    }

    private void ensureCountryExists(Long countryId) {
        countryRepository.findById(countryId)
                .orElseThrow(() -> new ResourceNotFoundException("해당 국가를 찾을 수 없습니다."));
    }

    private UserCountry getOrCreateUserCountry(Long userId, Long countryId) {
        return userCountryRepository.findByUserIdAndCountryId(userId, countryId)
                .orElseGet(() -> {
                    UserCountry userCountry = new UserCountry();
                    userCountry.setUserId(userId);
                    userCountry.setCountryId(countryId);
                    userCountry.setImmigrationPassed(0);
                    userCountry.setAddedAt(Instant.now().toString());
                    return userCountryRepository.save(userCountry);
                });
    }

    private void markPassed(UserCountry userCountry, Integer score) {
        if (isImmigrationPassed(userCountry)) return;

        String completedAt = Instant.now().toString();
        userCountry.setImmigrationPassed(1);
        userCountry.setImmigrationScore(score);
        userCountry.setImmigrationPassedAt(completedAt);
        userCountry.setImmigrationCompletedAt(completedAt);
    }

    private ImmigrationStatusDto toStatusDto(UserCountry userCountry, String message, boolean alreadyPassed) {
        return new ImmigrationStatusDto(
                userCountry.getCountryId(),
                userCountry.getId(),
                isImmigrationPassed(userCountry),
                userCountry.getImmigrationScore(),
                userCountry.getImmigrationCompletedAt(),
                alreadyPassed,
                message);
    }

    private boolean isImmigrationPassed(UserCountry userCountry) {
        return Integer.valueOf(1).equals(userCountry.getImmigrationPassed());
    }
}
