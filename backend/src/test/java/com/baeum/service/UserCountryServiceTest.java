package com.baeum.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import com.baeum.dto.UserCountryDto;
import com.baeum.dto.UserCountryResponseDto;
import com.baeum.entity.Continent;
import com.baeum.entity.Country;
import com.baeum.entity.UserCountry;
import com.baeum.exception.ForbiddenException;
import com.baeum.repository.ContinentRepository;
import com.baeum.repository.CountryRepository;
import com.baeum.repository.UserCountryRepository;
import com.baeum.util.AuthUtil;

@ExtendWith(MockitoExtension.class)
class UserCountryServiceTest {

    @Mock
    private UserCountryRepository userCountryRepository;

    @Mock
    private CountryRepository countryRepository;

    @Mock
    private ContinentRepository continentRepository;

    @Mock
    private AuthUtil authUtil;

    private UserCountryService userCountryService;

    @BeforeEach
    void setUp() {
        userCountryService = new UserCountryService(
                userCountryRepository,
                countryRepository,
                continentRepository,
                authUtil);
    }

    @Test
    void getsOnlyCurrentUsersCountriesWithCountryDetails() {
        UserCountry userCountry = userCountry(20L, 10L, 3L);
        Country country = new Country();
        ReflectionTestUtils.setField(country, "id", 3L);
        ReflectionTestUtils.setField(country, "name", "대한민국");
        ReflectionTestUtils.setField(country, "flagImageUrl", "/flags/kr.png");
        ReflectionTestUtils.setField(country, "capital", "서울");
        ReflectionTestUtils.setField(country, "continentId", 5L);
        Continent continent = new Continent();
        ReflectionTestUtils.setField(continent, "id", 5L);
        ReflectionTestUtils.setField(continent, "name", "아시아");

        when(authUtil.getCurrentUserId()).thenReturn(10L);
        when(userCountryRepository.findByUserId(10L)).thenReturn(List.of(userCountry));
        when(countryRepository.findById(3L)).thenReturn(Optional.of(country));
        when(continentRepository.findById(5L)).thenReturn(Optional.of(continent));

        List<UserCountryDto> result = userCountryService.getAllUserCountries();

        assertEquals(1, result.size());
        assertEquals("대한민국", result.get(0).getName());
        assertEquals("아시아", result.get(0).getContinentName());
        assertFalse(result.get(0).isImmigrationPassed());
        verify(userCountryRepository).findByUserId(10L);
    }

    @Test
    void addsCountryForCurrentUser() {
        Country country = new Country();
        ReflectionTestUtils.setField(country, "id", 3L);
        when(authUtil.getCurrentUserId()).thenReturn(10L);
        when(countryRepository.findById(3L)).thenReturn(Optional.of(country));
        when(userCountryRepository.existsByUserIdAndCountryId(10L, 3L)).thenReturn(false);
        when(userCountryRepository.save(org.mockito.ArgumentMatchers.any(UserCountry.class)))
                .thenAnswer(invocation -> {
                    UserCountry saved = invocation.getArgument(0);
                    saved.setId(20L);
                    return saved;
                });

        UserCountryResponseDto result = userCountryService.addUserCountry(3L);

        ArgumentCaptor<UserCountry> captor = ArgumentCaptor.forClass(UserCountry.class);
        verify(userCountryRepository).save(captor.capture());
        assertEquals(10L, captor.getValue().getUserId());
        assertEquals(3L, captor.getValue().getCountryId());
        assertEquals(0, captor.getValue().getImmigrationPassed());
        assertNotNull(Instant.parse(captor.getValue().getAddedAt()));
        assertEquals(20L, result.getId());
    }

    @Test
    void blocksDeletingAnotherUsersCountry() {
        UserCountry userCountry = userCountry(20L, 11L, 3L);
        when(authUtil.getCurrentUserId()).thenReturn(10L);
        when(userCountryRepository.findById(20L)).thenReturn(Optional.of(userCountry));

        ForbiddenException exception = assertThrows(
                ForbiddenException.class,
                () -> userCountryService.deleteUserCountry(20L));

        assertEquals("권한이 없습니다.", exception.getMessage());
        verify(userCountryRepository, never()).delete(userCountry);
    }

    @Test
    void passesImmigrationForCurrentUsersCountry() {
        UserCountry userCountry = userCountry(20L, 10L, 3L);
        when(authUtil.getCurrentUserId()).thenReturn(10L);
        when(userCountryRepository.findById(20L)).thenReturn(Optional.of(userCountry));
        when(userCountryRepository.save(userCountry)).thenReturn(userCountry);

        UserCountryResponseDto result = userCountryService.passImmigration(20L);

        assertTrue(result.isImmigrationPassed());
        assertNotNull(Instant.parse(result.getImmigrationPassedAt()));
        verify(userCountryRepository).save(userCountry);
    }

    private UserCountry userCountry(Long id, Long userId, Long countryId) {
        UserCountry userCountry = new UserCountry();
        userCountry.setId(id);
        userCountry.setUserId(userId);
        userCountry.setCountryId(countryId);
        userCountry.setImmigrationPassed(0);
        userCountry.setAddedAt("2026-06-25T00:00:00Z");
        return userCountry;
    }
}
