package com.baeum.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "continents")
@Getter
@NoArgsConstructor
public class Continent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String color;
    private Long population;

    @Column(name = "area_km2")
    private Long areaKm2;

    @Column(name = "country_count")
    private Integer countryCount;
}
