package com.baeum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StampDto {

    private Long id;

    @JsonProperty("country_id")
    private Long countryId;

    @JsonProperty("country_name")
    private String countryName;

    @JsonProperty("flag_image_url")
    private String flagImageUrl;

    @JsonProperty("continent_name")
    private String continentName;

    @JsonProperty("created_at")
    private String createdAt;
}
