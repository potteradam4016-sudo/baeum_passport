package com.baeum.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.baeum.entity.UserCountry;

public interface UserCountryRepository extends JpaRepository<UserCountry, Long> {

    List<UserCountry> findByUserId(Long userId);

    Optional<UserCountry> findByUserIdAndCountryId(Long userId, Long countryId);

    boolean existsByUserIdAndCountryId(Long userId, Long countryId);
}
