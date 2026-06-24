package com.baeum.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.baeum.entity.Stamp;

public interface StampRepository extends JpaRepository<Stamp, Long> {

    List<Stamp> findByUserId(Long userId);

    Optional<Stamp> findByUserIdAndCountryId(Long userId, Long countryId);

    boolean existsByUserIdAndCountryId(Long userId, Long countryId);
}
