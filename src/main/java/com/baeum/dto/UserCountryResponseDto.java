package com.baeum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserCountryResponseDto {

    private Long id;

    @JsonProperty("country_id")
    private Long countryId;

    @JsonProperty("immigration_passed")
    private boolean immigrationPassed;

    @JsonProperty("immigration_passed_at")
    private String immigrationPassedAt;

    @JsonProperty("added_at")
    private String addedAt;
}
