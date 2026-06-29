package com.baeum.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.baeum.entity.Continent;

public interface ContinentRepository extends JpaRepository<Continent, Long> {
}
