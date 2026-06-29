package com.baeum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CountryDto {

    private Long id;
    private String name;

    @JsonProperty("continent_id")
    private Long continentId;

    @JsonProperty("continent_name")
    private String continentName;

    @JsonProperty("flag_image_url")
    private String flagImageUrl;

    @JsonProperty("map_image_url")
    private String mapImageUrl;

    private String capital;
    private Long population;

    @JsonProperty("area_km2")
    private Long areaKm2;

    private String language;
    private String description;

    @JsonProperty("is_featured")
    private Integer isFeatured;

    private String currency;

    @JsonProperty("area_comparison")
    private String areaComparison;

    @JsonProperty("population_comparison")
    private String populationComparison;

    private String greeting;
    private String overview;

    @JsonProperty("map_note")
    private String mapNote;

    private String clothing;
    private String food;
    private String house;
    private String color;
}
