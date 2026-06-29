package com.baeum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ImmigrationStatusDto {

    @JsonProperty("country_id")
    private Long countryId;

    @JsonProperty("user_country_id")
    private Long userCountryId;

    @JsonProperty("immigration_passed")
    private boolean immigrationPassed;

    @JsonProperty("immigration_score")
    private Integer immigrationScore;

    @JsonProperty("immigration_completed_at")
    private String immigrationCompletedAt;

    @JsonProperty("already_passed")
    private boolean alreadyPassed;

    private String message;
}
