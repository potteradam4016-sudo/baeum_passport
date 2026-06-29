package com.baeum.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "countries")
@Getter
@Setter
@NoArgsConstructor
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "continent_id")
    private Long continentId;

    @Column(name = "flag_image_url")
    private String flagImageUrl;

    @Column(name = "map_image_url")
    private String mapImageUrl;

    private String capital;
    private Long population;

    @Column(name = "area_km2")
    private Long areaKm2;

    private String language;
    private String description;

    @Column(name = "is_featured")
    private Integer isFeatured;

    private String currency;

    @Column(name = "area_comparison")
    private String areaComparison;

    @Column(name = "population_comparison")
    private String populationComparison;

    private String greeting;
    private String overview;

    @Column(name = "map_note")
    private String mapNote;

    private String clothing;
    private String food;
    private String house;
    private String color;
}
