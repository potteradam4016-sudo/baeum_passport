package com.baeum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserCountryDto {

    private Long id;

    @JsonProperty("country_id")
    private Long countryId;

    private String name;

    @JsonProperty("flag_image_url")
    private String flagImageUrl;

    private String capital;

    @JsonProperty("continent_name")
    private String continentName;

    @JsonProperty("immigration_passed")
    private boolean immigrationPassed;

    @JsonProperty("immigration_passed_at")
    private String immigrationPassedAt;

    @JsonProperty("immigration_score")
    private Integer immigrationScore;

    @JsonProperty("immigration_completed_at")
    private String immigrationCompletedAt;

    @JsonProperty("added_at")
    private String addedAt;
}
