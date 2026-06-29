package com.baeum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ContinentDto {

    private Long id;
    private String name;
    private String color;
    private Long population;

    @JsonProperty("area_km2")
    private Long areaKm2;

    @JsonProperty("country_count")
    private Integer countryCount;
}
