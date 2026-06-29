package com.baeum.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.baeum.entity.TravelInfo;

public interface TravelInfoRepository extends JpaRepository<TravelInfo, Long> {

    Optional<TravelInfo> findByUserIdAndCountryId(Long userId, Long countryId);
}
