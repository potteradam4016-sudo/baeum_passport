package com.baeum.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.baeum.entity.Country;

public interface CountryRepository extends JpaRepository<Country, Long> {

    List<Country> findByContinentId(Long continentId);

    List<Country> findByIsFeatured(Integer isFeatured);

    Optional<Country> findByName(String name);
}
